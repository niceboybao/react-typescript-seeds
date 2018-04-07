import React from "react";
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import {Switch} from 'react-router';
import {BrowserRouter, Route, Link, withRouter, RouteComponentProps} from 'react-router-dom';
import {connect, MapStateToProps} from 'react-redux';

import {NoMatch} from '../NoMatch';

import createRoutes from '../../routes';

const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;

export interface RootContainerOwnProps {}

export interface RootContainerStateProps {}

export interface RootContainerState {collapsed: boolean, mode: any}

export class RootContainer extends React.Component<RootContainerStateProps & RootContainerOwnProps, RootContainerState> {

    allRoutes: Array<{path: string, component?: any, exact?: Boolean, render?: (props: RouteComponentProps<any>) => React.ReactNode}>;

    constructor(props: RootContainerStateProps & RootContainerOwnProps) {
        super(props);
        this.state = {collapsed: false, mode: 'inline'};
        // this.toggle = this.toggle.bind(this);
        // this.generateRoutes = this.generateRoutes.bind(this);
        this.allRoutes = [];

        this.allRoutes = createRoutes();
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
            mode: !this.state.collapsed ? 'vertical' : 'inline',
        });
    }

    generateRoutes = () => {
        return this.allRoutes.map((route, index) => {
            if (typeof route.component !== 'undefined') {
                if (route.exact) {
                    return <Route key={'ru_' + index} exact path={route.path} component={route.component} />;
                } else {
                    return <Route key={'ru_' + index} path={route.path} component={route.component} />;
                }
            }

            else if (typeof route.render !== 'undefined') {
                if (route.exact) {
                    return <Route key={'ru_' + index} exact path={route.path} render={route.render} />;
                } else {
                    return <Route key={'ru_' + index} path={route.path} render={route.render} />;
                }
            }
        })
    }

    render() {
        const routes = this.generateRoutes();
        return (
            <Layout>
                <Sider collapsible trigger={null} collapsed={this.state.collapsed} >
                    <div className="logo" />
                    <Menu theme="dark" mode={this.state.mode} defaultSelectedKeys={['home']}>
                        <Menu.Item key="home">
                            <Link to="/"><Icon type="home" /><span className="nav-text">Home</span></Link>
                        </Menu.Item>
                        <SubMenu key="sub1" title={<span><Icon type="user" /><span className="nav-text">User</span></span>} >
                            <Menu.Item key="1"><Link to="/user/tom">Tom</Link></Menu.Item>
                            <Menu.Item key="2"><Link to="/user/bill">Bill</Link></Menu.Item>
                            <Menu.Item key="3"><Link to="/user/alex">Alex</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title={<span><Icon type="team" /><span className="nav-text">Team</span></span>} >
                            <Menu.Item key="4"><Link to="/team/team1">Team 1</Link></Menu.Item>
                            <Menu.Item key="5"><Link to="/team/team2">Team 2</Link></Menu.Item>
                            <Menu.Item key="6"><Link to="/team/team3">Team 3</Link></Menu.Item>
                            <Menu.Item key="7"><Link to="/team/team4">Team 4</Link></Menu.Item>
                            <Menu.Item key="8"><Link to="/team/team5">Team 5</Link></Menu.Item>
                        </SubMenu>

                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{background: '#fff', padding: 0}} >
                        <Icon className="trigger" type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle} />
                    </Header>

                    <Content style={{margin: '0 16px'}}>
                        {React.createElement(Switch, null, [...routes, <Route key='ru_nomatch' component={NoMatch} />])}

                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        Zhishinet Management Console Powered by Ant Design ©2017
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}
