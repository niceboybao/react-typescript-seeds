import * as React from "react";
import { Store } from 'redux';
import { Button, Icon } from 'antd';

export interface CounterControlProps { onPlusClick?: Function, onMinusClick?: Function }

export interface CounterControlState { }

export class CounterControl extends React.Component<CounterControlProps, CounterControlState> {
    counter: number;

    constructor(props: CounterControlProps) {
        super(props);
        // this.counter = props.counter;
        this.increase = this.increase.bind(this);
        this.decrease = this.decrease.bind(this);
    }

    increase() {
        console.log("will call 'onPlusClick' props function.");
        // (window as GlobalDefinitions).store.dispatch(INCREMENT(1));
        this.props.onPlusClick();
    }

    decrease() {
        console.log("will call 'onMinusClick' props function.");
        // (window as GlobalDefinitions).store.dispatch(DECREMENT(1));
        this.props.onMinusClick();
    }

    render() {
        return (
            <Button.Group>
                <Button type="primary" icon="plus" onClick={this.increase} />
                <Button type="primary" icon="minus" onClick={this.decrease} />
            </Button.Group>
        );
    }
}
