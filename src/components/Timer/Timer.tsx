import React, {useEffect, useState} from "react";
import {PROTECTED_SESSION_TIME} from "@utils/constants";

//type MyProps = { onZero: () => void };
//type MyState = { time: { h: number, m: number, s: number }, seconds: number };

const secondsToTime = (s: number) => {
    const h = Math.trunc(s / 3600);
    const m = Math.trunc(s / 60 - 60 * h);
    s = s - 3600 * h - 60 * m
    return {
        "h": h,
        "m": m,
        "s": s
    };
}

type Props = {
    id?: string,
    onZero?: any,
}

const Timer: React.FC<Props> = ({id, onZero}) => {

    const [time, changeTime] = useState({time: secondsToTime(PROTECTED_SESSION_TIME), seconds: PROTECTED_SESSION_TIME});
    const [isActive, setActive] = useState(true);

    useEffect(() => {
        let timer: null | ReturnType<typeof setInterval> | number = 0;
        // if (!timer && time.seconds > 0) {
        if (isActive) {
            timer = setInterval(countDown, 1000);
        } else if (!isActive && time.seconds !== 0) {
            clearInterval(timer);
        }
        return () => clearInterval(timer as NodeJS.Timeout);
        //}
    }, [isActive, time.seconds]);

    const StopTimer = () => {
        if (isActive) {
            setActive(!isActive);
        }
    }

    const countDown = () => {
        let seconds = time.seconds - 1;
        changeTime({
            time: secondsToTime(seconds),
            seconds: seconds,
        });
        if (seconds === 0) {
            StopTimer();
            onZero();
        }
    }

    return (
        <div key={id} className="d-flex">
            <div>
                {time.time.h}:{time.time.m}:{time.time.s}
            </div>
        </div>
    );

}

export default Timer;

