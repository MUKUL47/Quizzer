import React, { useState, useEffect } from 'react';
import './questionlayout.scss'
import {
    Button, AddIcon, DeleteIcon, ArrowBackIcon
} from '../../../../../../../shared/material-ui-modules';
import Question from './question/questionDialog'
export default function QuestionLayout(props: any) {
    const arr: any[] = []
    const [question, setQuestion] = useState(arr)
    const [dragHover, setDragHover] = useState(-1);
    const [dropDone, setDropDone] = useState(-1);
    const [questionReady, setQuestionReady] = useState(false);
    const allowDrop = () => {
        if (dragHover === dropDone) return;
        const d: any = document.querySelector(`.ondrag-b-${dragHover}`);
        if (d) setTimeout(() => d['style']['border'] = 'none', 500);
        const v1 = `${question[dragHover]}`;
        const v2 = `${question[dropDone]}`;
        question[dropDone] = v1;
        question[dragHover] = v2;
        setQuestion([...question])
    }
    useEffect(() => {
        const d: any = document.querySelector(`.ondrag-b-${dragHover}`);
        if (d) {
            for (let i = 0; i < question.length; i++) {
                const d: any = document.querySelector(`.ondrag-b-${i}`);
                if (d) {
                    d['style']['border'] = 'none';
                }
            }
            if (dropDone !== dragHover) {
                d['style']['border'] = '2px solid #739fb9';
            }
        }
    }, [dragHover])
    return (
        <div>
            <div className="header-name-struct">Form Questions</div>
            {
                question.length > 0 ?
                    <div className='info-drag'>Drag questions to change order</div>
                    : null
            }
            {
                question.length === 0 ?
                    <div className="no-question">No questions added</div>
                    : null
            }
            <div className='no-questions'>
                {question.map((q, i) => (
                    <div className={`form-field border-b ondrag-b-${i}`}
                        key={i}
                        draggable={question.length > 1}
                        onDragStart={e => setDropDone(i)}
                        onDragEnd={e => {
                            setDropDone(i);
                            allowDrop();
                        }}
                        onDragOver={e => setDragHover(i)}
                    >
                        <div className="question-t">
                            <span id='sl-no'>{i + 1}.  </span>
                            <span id='t'>{q}</span>
                        </div>
                        <div className="q-info" >
                            <DeleteIcon />
                        </div>
                    </div>
                ))}
            </div>

            <div className="submit">
                <div className="pos-relative padding-down-10p">
                    <AddIcon className="add-icon-ques" />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={e => setQuestionReady(true)}>
                        Add Question
                    </Button>
                </div>
                <div className="pos-relative quiz-btn">
                    <ArrowBackIcon className="add-icon-ques" />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={e => props.goToForm()}
                    >
                        Quiz Stucture
                    </Button>
                </div>
            </div>
            <Question
                open={questionReady}
                close={(mcqData?: any) => {
                    // console.log(mcqData);
                    setQuestionReady(false)
                }} />
        </div>
    )
}