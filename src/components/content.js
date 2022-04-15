import React, {useEffect} from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import GreenButton from './greenButton';
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Timer from "./timer";

const useStyle = makeStyles(theme => ({
    root: {},
    question_group: {
        '& > *': {
            margin: theme.spacing(1),
        },
        "& .MuiFormControlLabel-label": {
            fontSize: 23
        }
    },
    main_area: {
        position: "absolute",
        width: "calc(100% - 300px)",
        height: "calc(100% - 60px)",
        overflow: "auto"
    }
}));

export default function Content(props) {
    const classes = useStyle();
    const [selection, setSelection] = React.useState('');

    useEffect(() => {
        if (props.answer[props.curPos])
            setSelection(props.answer[props.curPos].answer);
    }, [props.curPos]);

    const handleChange = (event) => {
        setSelection(event.target.value);
    };

    const testFunc = () => {
        console.log(1);
        console.log(2);
        console.log(3);
        console.log(4);
    }

    return (
        <div>
            <div className={classes.main_area}>

                <Box pl={3} pr={3} pt={2} pb={2} display={"flex"} justifyContent={"space-between"}
                     alignItems={"flex-start"}>
                    <Typography variant={"h5"}>
                        <Box display={'flex'}>
                            <span style={{minWidth: 140}}> Question {props.curPos + 1} :</span>
                            <span>{props.problems[props.curPos].title}</span>
                        </Box>
                    </Typography>
                    <Timer deadline={10} {...props}/>
                </Box>
                <Divider/>
                <div style={{position: "relative"}}>
                    <Box p={3} pl={5} style={{overflow: "auto",}}>
                        <RadioGroup value={selection} onChange={handleChange} className={classes.question_group}>
                            {props.problems[props.curPos].questions.map((item, idx) =>
                                <FormControlLabel value={"" + idx} key={idx} control={<Radio color="primary"/>}
                                                  label={item}/>
                            )}
                        </RadioGroup>
                    </Box>
                </div>
            </div>
            <div style={{position: 'absolute', bottom: 0, width: "calc(100% - 300px)"}}>
                <Divider/>
                <Box pl={2} pr={2} pt={1} pb={1} display={"flex"} justifyContent={"space-between"}>
                    <div>
                        <GreenButton variant={'contained'}
                                     onClick={() => props.onMarkForAnswer(props.curPos, selection)}>Mark for Answer &
                            Next</GreenButton>
                        <Button style={{marginLeft: 15}} color={"secondary"} variant={'contained'}
                                onClick={() => setSelection("")}>Clear Answer</Button>
                    </div>
                    <Button color={"primary"} variant={'contained'}
                            onClick={() => props.onMark_Save(props.curPos, selection)}>Mark & Save</Button>
                </Box>
            </div>
        </div>
    )
}