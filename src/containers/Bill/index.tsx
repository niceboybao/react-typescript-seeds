import React from "react";
import { Breadcrumb } from 'antd';
import { RouteComponentProps } from 'react-router-dom';

export interface BillProps extends RouteComponentProps<any> { }

export interface BillState { }

export class Bill extends React.Component<BillProps, BillState> {

    componentDidMount() {
        document.getElementById('content_display_area').style.height = ((document.getElementsByClassName('ant-layout-content')[0] as HTMLElement).offsetHeight - 42).toString() + "px";
    }

    render() {
        return (
            <div>
                <Breadcrumb style={{ margin: '12px 0' }}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>
                <div id="content_display_area" style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    <h1>Bill is a game console.</h1>
                </div>
            </div>
        );
    }
}
