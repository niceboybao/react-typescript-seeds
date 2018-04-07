import React from "react";
import { Breadcrumb, Button, Icon, Timeline, Switch } from 'antd';

import { connect } from 'react-redux';
import { requestData, showAllData, showEvenData, showOddData, changeSwitchStatus } from './actions';
import { RouteComponentProps } from 'react-router-dom';

import { getShownHttpData } from './selectors';

interface Team4OwnProps extends RouteComponentProps<any> { }  // properties directed pass in throw react tag

interface Team4StateProps  { dispatch?: any, httpData?: Array<any>, httpDataForODD?: Array<any>, httpDataFilter?: String, switchStatus?: boolean}  // properties from redux store

interface Team4DispatchProps { getHttpData?: Function, showAllData?: Function, showEvenData?: Function, showOddData?: Function, changeSwitchStatus?: Function }  // dispatch functions from redux store

interface Team4State { }  // component own properties

@(connect<Team4StateProps, Team4DispatchProps & Team4OwnProps, Team4State>  (
    (state: any) => (
        {
            httpData: getShownHttpData(state),
            httpDataForODD: (state.team4HttpQuery.httpData as Array<any>).filter((data, index) => {
                console.log("[odd in connect] judge will display");
                return index % 2 == 1;
            }),
            httpDataFilter: state.team4HttpQuery.httpDataFilter,
            switchStatus: state.team4HttpQuery.switchStatus
        }
    ),
    (dispatch: any) => (
        {
            getHttpData: () => {
                dispatch(requestData());
            },
            showAllData: () => {
                dispatch(showAllData());
            },
            showEvenData: () => {
                dispatch(showEvenData());
            },
            showOddData: () => {
                dispatch(showOddData());
            },
            changeSwitchStatus: () => {
                dispatch(changeSwitchStatus());
            }
        }
    )
) as any)
export default class Team4 extends React.Component<Team4StateProps & Team4DispatchProps & Team4OwnProps, Team4State> {

    constructor() {
        super();
        this.loadData = this.loadData.bind(this);
        this.showEvenData = this.showEvenData.bind(this);
        this.showOddData = this.showOddData.bind(this);
        this.onSwitchChange = this.onSwitchChange.bind(this);
    }

    componentDidMount() {
        document.getElementById('content_display_area').style.height = ((document.getElementsByClassName('ant-layout-content')[0] as HTMLElement).offsetHeight - 42).toString() + "px";
    }

    loadData() {
        this.props.showAllData();
        this.props.getHttpData();
    }

    showEvenData() {
        this.props.showEvenData();
    }

    showOddData() {
        this.props.showOddData();
    }

    onSwitchChange() {
        this.props.changeSwitchStatus();
    }

    generateDataList() {
        if(this.props.httpDataFilter === 'ODD') {
            return this.props.httpDataForODD.map((data, index) => {
                return <li key={index}>{index * 2 + 1}. {data}</li>;
            });
        } else {
            return this.props.httpData.map((data, index) => {
                switch(this.props.httpDataFilter) {
                    case "ALL" :
                        return <li key={index}>{index}. {data}</li>;
                    case "EVEN" :
                        return <li key={index}>{index * 2}. {data}</li>;
                    // case "ODD" :
                    //     return <li key={index}>{index * 2 + 1}. {data}</li>;
                }
            });
        }
    }

    render() {
        const { httpData, httpDataForODD, httpDataFilter } = this.props;
        const timelineItems = this.generateDataList();
        return (
            <div>
                <Breadcrumb style={{ margin: '12px 0' }}>
                    <Breadcrumb.Item>Team</Breadcrumb.Item>
                    <Breadcrumb.Item>Team 4</Breadcrumb.Item>
                </Breadcrumb>
                <div id="content_display_area" style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    <Button type="primary" icon="reload" style={{ margin: 5}} onClick={this.loadData}>Load Data</Button>
                    <Button type="primary" icon="reload" style={{ margin: 5}} onClick={this.showEvenData}>Even index</Button>
                    <Button type="primary" icon="reload" style={{ margin: 5}} onClick={this.showOddData}>Odd index</Button>
                    <Switch defaultChecked={this.props.switchStatus} onChange={this.onSwitchChange} />,
                    <ul style={{ paddingTop: '10px'}}>
                        {timelineItems}
                    </ul>
                </div>
            </div>

        );
    }
}
