import * as React from "react";

export interface CounterDisplayProps { counter?: number }

export interface CounterDisplayState { }

export class CounterDisplay extends React.Component<CounterDisplayProps, CounterDisplayState> {
    counter: number;

    constructor(props: CounterDisplayProps) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Current Count is {this.props.counter}</h1>
            </div>
        );
    }
}
