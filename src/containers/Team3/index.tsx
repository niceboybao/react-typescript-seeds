import React from "react";
import { Breadcrumb, Button, Icon, Timeline } from 'antd';

import { connect } from 'react-redux';
import { requestData } from './actions';
import { RouteComponentProps } from 'react-router-dom';

interface Team3OwnProps extends RouteComponentProps<any> { }  // properties directed pass in throw react tag

interface Team3StateProps  { dispatch?: any, httpData?: Array<any>}  // properties from redux store

interface Team3DispatchProps { getHttpData?: Function }  // dispatch functions from redux store

interface Team3State { }  // component own properties

@(connect<Team3StateProps, Team3DispatchProps & Team3OwnProps, Team3State>  (
    (state: any) => (
        {
            httpData: state.httpQuery.httpData
        }
    ),
    (dispatch: any) => (
        {
            getHttpData: () => {
                dispatch(requestData());
            }
        }
    )
) as any)
export default class Team3 extends React.Component<Team3StateProps & Team3DispatchProps & Team3OwnProps, Team3State> {

    constructor() {
        super();
        this.loadData = this.loadData.bind(this);
    }

    componentDidMount() {
        document.getElementById('content_display_area').style.height = ((document.getElementsByClassName('ant-layout-content')[0] as HTMLElement).offsetHeight - 42).toString() + "px";
    }

    loadData() {
        this.props.getHttpData();
    }

    render() {
        const { httpData } = this.props;
        const timelineItems = httpData.map((data, index) => <li key={index}>{data}</li>);
        return (
            <div>
                <Breadcrumb style={{ margin: '12px 0' }}>
                    <Breadcrumb.Item>Team</Breadcrumb.Item>
                    <Breadcrumb.Item>Team 3</Breadcrumb.Item>
                </Breadcrumb>
                <div id="content_display_area" style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    <Button type="primary" icon="reload" onClick={this.loadData}>Load Data</Button>
                    <ul style={{ paddingTop: '10px'}}>
                        {timelineItems}
                    </ul>
                </div>
            </div>

        );
    }
}
