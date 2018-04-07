import React from "react";
import { Breadcrumb } from 'antd';
import { RouteComponentProps } from 'react-router-dom';

export interface NoMatchProps extends RouteComponentProps<any> { }

export interface NoMatchState { }

export class NoMatch extends React.Component<NoMatchProps, NoMatchState> {

    // componentDidMount() {
    //     document.getElementById('content_display_area').style.height = ((document.getElementsByClassName('ant-layout-content')[0] as HTMLElement).offsetHeight - 42).toString() + "px";
    // }

    render() {
        return (
            <div>
                <Breadcrumb style={{ margin: '12px 0' }}>
                    <Breadcrumb.Item>NoMatch</Breadcrumb.Item>
                </Breadcrumb>
                <div id="content_display_area" style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    <h1>Page not found for <code>{ location.pathname }</code></h1>
                </div>
            </div>

        );
    }
}
