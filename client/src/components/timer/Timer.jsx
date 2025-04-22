import { useEffect, useRef, useState } from "react";
import './timer.css';
import PropTypes from "prop-types";


function MyTimer(props){
    const Ref = useRef(null);

    const startTimer = (e) => {
        if(props.stopTimer){
            clearInterval(Ref.current);
        }else{
            if(props.seconds === 1){
                //Used to prevent  click and time up generate 2 calls
                props.setDisableBtn(true);
            }
            if(props.seconds > 0){
                props.setSeconds(props.seconds - 1);
            }else{
                clearInterval(Ref.current);
                props.endTimeFunc();
            }
        }
    };

    const clearTimer = (e) => {
        if(Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000);
        Ref.current = id;
    };

    useEffect(() => {
        clearTimer();
    }, [props.seconds]);

    return(
        <div className="timer-box pixel-corners--wrapper">
            {props.seconds < 10 ? "0"+props.seconds : props.seconds}
        </div>
    )
}


export default MyTimer;