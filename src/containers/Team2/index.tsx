import React from "react";
import { Breadcrumb } from 'antd';

import { CounterDisplay } from '../../components/CounterDisplay/';
import { CounterControl } from '../../components/CounterControl/';

import { connect, MapStateToProps, ComponentDecorator, MapDispatchToProps, MapDispatchToPropsFunction, MapDispatchToPropsObject } from 'react-redux';
import { increment, decrement } from './actions';
import { RouteComponentProps } from 'react-router-dom';

interface Team2OwnProps extends RouteComponentProps<any> { }  // properties directed pass in throw react tag

interface Team2StateProps  { dispatch?: any, counter?: number}  // properties from redux store

interface Team2DispatchProps { counterPlusOne?: Function, counterMinusOne?: Function }  // dispatch functions from redux store

interface Team2State { }  // component own properties

class Team2 extends React.Component<Team2StateProps & Team2DispatchProps & Team2OwnProps, Team2State> {

    constructor() {
        super();
    }

    componentDidMount() {
        document.getElementById('content_display_area').style.height = ((document.getElementsByClassName('ant-layout-content')[0] as HTMLElement).offsetHeight - 42).toString() + "px";
    }

    render() {
        const { dispatch, counter, counterPlusOne, counterMinusOne } = this.props;
        return (
            <div>
                <Breadcrumb style={{ margin: '12px 0' }}>
                    <Breadcrumb.Item>Team</Breadcrumb.Item>
                    <Breadcrumb.Item>Team 2</Breadcrumb.Item>
                </Breadcrumb>
                <div id="content_display_area" style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    <CounterDisplay counter={counter}/>
                    <CounterControl onPlusClick={counterPlusOne} onMinusClick={counterMinusOne}/>
                </div>
            </div>

        );
    }
}

const mapStateToProps: MapStateToProps<Team2StateProps, Team2OwnProps> = (state: any) => {
    return {
        counter: state.team2Counter.count
    };
}

const mapDispatchToProps: MapDispatchToProps<Team2DispatchProps, Team2OwnProps> = (dispatch: any) => {
    return {
        counterPlusOne: () => {
            console.log("call from 'mapDispatchToProps'");
            dispatch(increment(1));
        },
        counterMinusOne: () => {
            console.log("call from 'mapDispatchToProps'");
            dispatch(decrement(1));
        }
    }
}

export default connect<Team2StateProps, Team2DispatchProps, Team2OwnProps>(
    mapStateToProps,
    mapDispatchToProps
)(Team2);
