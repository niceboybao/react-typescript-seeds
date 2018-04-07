import * as React from "react";

export interface ClockProps {}

export interface ClockState {date: Date;}

export class Clock extends React.Component<ClockProps, ClockState> {
    timerID: number;

    constructor(props: ClockProps) {
        super(props);
        this.state = {date: new Date()};
    }

    render() {
        return <h1>It is {this.state.date.toLocaleTimeString()} now.</h1>;
    }

    componentDidMount() {
        this.timerID = window.setInterval(
            () => this.tick(),
            1000
        );
    }
    //Clock组件,将要卸载时调用，一些事件监听和定时器需要在此时清除。
    componentWillUnmount() {
        console.log("Clock component componentWillUnmount");
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }
}
