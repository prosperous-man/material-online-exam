import Header from './components/header';
import Content from "./components/content";
import Sidebar from "./components/sidebar";
import {problem} from "./components/problem";
import {useEffect, useState} from "react";
import produce from "immer";

function App() {
    const [curQuesPos, setCurQuesPos] = useState(0);
    const [answer, setAnswer] = useState([]);
    useEffect(() => {
        var answerObj = [];
        for (var item of problem) {
            answerObj.push({
                answer: "",
                status: 0,
            });
        }
        answerObj[0].status = 1;
        setAnswer(answerObj);
    }, []);

    const updateStatus = (idx, status) => {
        setAnswer(produce(answer, (draft) => {
            draft[idx].status == 0 && (draft[idx].status = status);
            draft[idx].answer = draft[idx].answer;
        }));
        setCurQuesPos(idx);
    }

    const clickedMark_Save = (idx, strAnswer) => {
        console.log("set answer ",strAnswer);
        setAnswer(produce(answer, (draft) => {
            draft[idx] && (draft[idx].answer = strAnswer)
            draft[idx] && (draft[idx].status = strAnswer.length > 0 ? 2 : 1);
            idx < answer.length - 1 && draft[idx + 1] && (draft[idx + 1].status = 1);
        }));
        idx < answer.length - 1 && setCurQuesPos(idx + 1);
    }

    const clickedMark_For_Answer = (idx, strAnswer) => {
        setAnswer(produce(answer, (draft) => {
            draft[idx] && (draft[idx].answer = strAnswer)
            draft[idx] && (draft[idx].status = strAnswer.length > 0 ? 4 : 3);
            idx < answer.length - 1 && draft[idx + 1] && (draft[idx + 1].status = 1);
        }));
        idx < answer.length - 1 && setCurQuesPos(idx + 1);
    }


    return (
        <div className="App">
            <Header/>
            <div style={{
                position: "relative",
                height: "calc(100vh - 80px)"
            }}>
                <Content problems={problem} answer={answer} curPos={curQuesPos} updateCurPos={(idx) => setCurQuesPos(idx)}
                         onMark_Save={clickedMark_Save} onMarkForAnswer={clickedMark_For_Answer}
                         onTimeEnd={(flag) => alert("submit answer!!!")}/>
                <Sidebar answer={answer}
                         onClickButton={(idx) => {
                             updateStatus(idx, 1)
                         }}
                         submitAnswer={() => {
                             alert('submit answer!!!');
                            console.log(answer);
                         }}
                />
            </div>
        </div>
    );
}

export default App;
