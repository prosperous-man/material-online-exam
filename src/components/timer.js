import React, {useRef, useState} from 'react';
import Typography from "@material-ui/core/Typography";
import GreenButton from './greenButton';
import TimerIcon from '@material-ui/icons/Timer';

var isEndedTime=false;
var timerHandle=null;
export default function Timer(props) {
    const [duration, setDuration] = useState("");
    // const timerHandle = useRef(null);

    useState(() => {

        var endTime = new Date(Date.parse(new Date()) + props.deadline * 60 * 1000);
        updateClock(endTime);
        console.log("initialize timer called...");
        timerHandle = setInterval(updateClock, 1000, endTime);
    });


    function getTimeRemaining(endtime) {
        const total = Date.parse(endtime) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        const days = Math.floor(total / (1000 * 60 * 60 * 24));

        return {
            total,
            days,
            hours,
            minutes,
            seconds
        };
    }

    function updateClock(endtime) {
        const t = getTimeRemaining(endtime);

        if (t.total < 0 && !isEndedTime) {
            //
            clearInterval(timerHandle);
            console.log("ontimeend event....");
            isEndedTime=true;
            props.onTimeEnd(false);
            return;
        }
        var timeString =
            ('0' + t.hours).slice(-2) + " : " +
            ('0' + t.minutes).slice(-2) + " : " +
            ('0' + t.seconds).slice(-2)
        setDuration(timeString);
    }


    return (
        <GreenButton variant={"contained"} style={{minWidth:140,marginTop:6}}>
        {/*<Typography variant={'h6'}>*/}
           <TimerIcon/> &nbsp;{duration}
        {/*</Typography>*/}
        </GreenButton>
    )
}

