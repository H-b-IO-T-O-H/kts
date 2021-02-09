import React from "react";
import {PROTECTED_SESSION_TIME} from "@utils/constants";

type MyProps = { onZero: () => void };
type MyState = { time: { h: number, m: number, s: number }, seconds: number };

class Timer extends React.Component<MyProps, MyState> {
    private timer: any;

    constructor(props: any) {
        super(props);
        if (!props.timeLeft) {
            this.state = {time: {h: 0, m: 0, s: 0}, seconds: PROTECTED_SESSION_TIME};
        } else {
            this.state = {time: {h: 0, m: 0, s: 0}, seconds: props.timeLeft};
        }

        this.timer = 0;

        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);

        this.startTimer();
    }

    secondsToTime(s: number) {
        const h = Math.trunc(s / 3600);
        const m = Math.trunc(s / 60 - 60 * h);
        s = s - 3600 * h - 60 * m
        return {
            "h": h,
            "m": m,
            "s": s
        };
    }

    componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({time: timeLeftVar});
    }

    componentWillUnmount() {
        this.stopTimer();
    }

    startTimer() {
        if (this.timer === 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    stopTimer() {
        clearInterval(this.timer);
    }

    countDown() {
        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });
        if (seconds === 0) {
            clearInterval(this.timer);
            this.props.onZero();
        }
    }

    render() {
        return (
            <div className="d-flex ">
                <div>
                    {this.state.time.h}:{this.state.time.m}:{this.state.time.s}
                </div>
            </div>
        );
    }
}

export default Timer;

