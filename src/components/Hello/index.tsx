import * as React from "react";
import { Clock } from "../Clock";

export interface HelloProps { compiler: string; framework: string; }

export interface HelloState { date: Date; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export class Hello extends React.Component<HelloProps, HelloState> {
    constructor(props: HelloProps) {
        super(props);
        this.state = {date: new Date()};
      }

    render() {
        return (
            <div>
                <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>
                <Clock/>
            </div>
        );
    }
}
