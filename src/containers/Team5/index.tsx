import React from "react";
import {Breadcrumb, Button, Icon, Timeline} from 'antd';

import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router-dom';
import {push} from 'react-router-redux';

interface Team3OwnProps extends RouteComponentProps<any> {}  // properties directed pass in throw react tag

interface Team3StateProps {dispatch?: any}  // properties from redux store

interface Team3DispatchProps {pushPageToTeam4?: Function}  // dispatch functions from redux store

interface Team3State {}  // component own properties

@(connect<Team3StateProps, Team3DispatchProps & Team3OwnProps, Team3State>(
    (state: any) => (
        {}
    ),
    (dispatch: any) => (
        {
            pushPageToTeam4: () => {
                dispatch(push('/team/team4'));
            }
        }
    )
) as any)
export default class Team3 extends React.Component<Team3StateProps & Team3DispatchProps & Team3OwnProps, Team3State> {

    constructor() {
        super();
        this.pushPageToTeam4 = this.pushPageToTeam4.bind(this);
    }

    componentDidMount() {
        document.getElementById('content_display_area').style.height = ((document.getElementsByClassName('ant-layout-content')[0] as HTMLElement).offsetHeight - 42).toString() + "px";
    }

    pushPageToTeam4() {
        this.props.pushPageToTeam4();
    }

    testAsyncLoad() {
        _import('../Alex/').then((module) => {
            console.log('load success: ' + module);
        }).catch((err) => {
            console.log('load error: ' + err);
        });
    }

    render() {
        return (
            <div>
                <Breadcrumb style={{margin: '12px 0'}}>
                    <Breadcrumb.Item>Team</Breadcrumb.Item>
                    <Breadcrumb.Item>Team 5</Breadcrumb.Item>
                </Breadcrumb>
                <div id="content_display_area" style={{padding: 24, background: '#fff', minHeight: 360}}>
                    <Button type="primary" icon="reload" style={{margin: 5}} onClick={this.pushPageToTeam4}>To Team4</Button>
                    <Button type="primary" icon="reload" style={{margin: 5}} onClick={this.testAsyncLoad}>Async Load</Button>
                </div>
            </div>

        );
    }
}
