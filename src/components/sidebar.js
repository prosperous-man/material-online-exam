import React, {useState} from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import clsx from "clsx";
import Button from "@material-ui/core/Button";

const useStyle = makeStyles(theme => ({
    root: {
        position: "absolute",
        right: 0,
        top: 0,
        width: 300,
        height: "100%",
        borderLeft: "1px solid grey"
    },

    avatarLarge: {
        width: 50,
        height: 50,
    },

    btnAnsGuide: {
        position: "relative",
        cursor: "pointer",
        textAlign: "center",
        display: "inline-block",
        height: 28,
        width: 28,
        borderRadius: 9999999
    },
    btnAnswer: {
        position: "relative",
        cursor: "pointer",
        display: "inline-block",
        height: 39,
        width: 39,
        borderRadius: 99999,
        textAlign: "center"
    },
    answerBoard: {
        position: 'absolute',
        overflow: "auto",
        top: 100,
        bottom: 170,
        '& > *': {
            margin: 6,
        },
    },
    answerSideBottom: {
        position: "absolute",
        bottom: 0,
        height: 170,
        width: "100%"
    },
    notAnswered: {background: "#c0392b !important", color: "white", border: "1px solid #c0392b"},
    notVisited: {background: "#white !important", color: "black", border: "1px solid #444343"},
    Answered: {background: "#27ae60 !important", color: "white", border: "1px solid #27ae60"},
    Marked: {background: "#9b59b6 !important", color: "white", border: "1px solid #9b59b6"},
    Mark_Answered: {
        background: "#9b59b6 !important", color: "white", border: "1px solid #9b59b6",
        "&::after": {
            "top": "-0.375em",
            "right": 0,
            "width": 5,
            "height": 11,
            "content": "''",
            "position": "absolute",
            "transform": "rotate(45deg)",
            "borderColor": "#27ae60",
            "borderStyle": "solid",
            "borderWidth": "0 5px 5px 0",
        }
    },
    span_Answer_num: {
        display: "inline-block",
        paddingTop: 9
    },
    span_Guide_num: {
        display: "inline-block",
        paddingTop: 3
    },
    span_guide_label: {
        fontSize: 14,
        color: "#535353"
    }

}))

export default function Sidebar(props) {
    const classes = useStyle();
    const [count_notVisited, setCount_notVisited] = useState(0);
    const [count_notAnswered, setCount_notAnswered] = useState(0);
    const [count_Answered, setCount_Answered] = useState(0);
    const [count_Marked, setCount_Marked] = useState(0);
    const [count_Mark_Answered, setCount_Mark_Answered] = useState(0);

    const getCount = (category) => {
        var count=0;
        for(var item of props.answer){
            if (item.status == category)
                count++;
        }
        return count;
    }

    return (
        <div className={classes.root}>
            <Box p={2} display={"flex"} alignItems={"center"}>
                <Avatar alt="Remy Sharp"
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
                        className={classes.avatarLarge}/>
                <Box pl={2}>Candidate 1 </Box>
            </Box>
            <Divider/>
            <Box p={2}>
                <div className={classes.answerBoard}>
                    {props.answer.map((item, idx) => {
                        var classStatus = "";
                        switch (item.status) {
                            case 0:
                                classStatus = classes.notVisited;
                                // setCount_notVisited(count_notVisited + 1);
                                break;
                            case 1:
                                classStatus = classes.notAnswered;
                                // setCount_notAnswered(count_notAnswered + 1);
                                break;
                            case 2:
                                classStatus = classes.Answered;
                                // setCount_Answered(count_Answered + 1);
                                break;
                            case 3:
                                classStatus = classes.Marked;
                                // setCount_Marked(count_Marked + 1);
                                break;
                            case 4:
                                classStatus = classes.Mark_Answered;
                                // setCount_Mark_Answered(count_Mark_Answered + 1);
                                break;
                        }
                        return (
                            <div onClick={() => props.onClickButton(idx)} key={idx}
                                 className={clsx(classes.btnAnswer, classStatus)}><span
                                className={classes.span_Answer_num}>{idx + 1}</span></div>
                        )
                    })}
                </div>
            </Box>

            <div className={classes.answerSideBottom}>
                <Divider/>

                <Box pl={1} pt={1}>
                    <table>
                        <tr>
                            <td>
                                <div className={clsx(classes.btnAnsGuide, classes.Answered)}><span
                                    className={classes.span_Guide_num}>{getCount(2)}</span></div>
                                &nbsp;&nbsp;<span className={classes.span_guide_label}>Answered</span>
                            </td>
                            <td>
                                <div className={clsx(classes.btnAnsGuide, classes.Marked)}><span
                                    className={classes.span_Guide_num}>{getCount(3)}</span></div>
                                &nbsp;&nbsp;<span className={classes.span_guide_label}>Marked</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className={clsx(classes.btnAnsGuide, classes.notVisited)}><span
                                    className={classes.span_Guide_num}>{getCount(0)}</span></div>
                                &nbsp;&nbsp;<span className={classes.span_guide_label}>Not Visited</span>
                            </td>
                            <td>
                                <div className={clsx(classes.btnAnsGuide, classes.notAnswered)}><span
                                    className={classes.span_Guide_num}>{getCount(1)}</span></div>
                                &nbsp;&nbsp;<span className={classes.span_guide_label}>Not Answered</span>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <div className={clsx(classes.btnAnsGuide, classes.Mark_Answered)}><span
                                    className={classes.span_Guide_num}>{getCount(4)}</span></div>
                                &nbsp;&nbsp;<span className={classes.span_guide_label}>Marked and answered</span>
                            </td>
                        </tr>
                    </table>
                </Box>
                <Box mt={1} pl={5} pr={5}>
                    <Button variant={"contained"} fullWidth color={"primary"} onClick={() => {
                        props.submitAnswer(true)
                    }}>Submit</Button>
                </Box>
            </div>

        </div>
    )
}