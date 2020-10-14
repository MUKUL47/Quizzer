import React, { useState, useEffect, useContext } from 'react';
import './questionlayout.scss'
import {
    Button, AddIcon, DeleteIcon, ArrowBackIcon
} from '../../../../../../../shared/material-ui-modules';
import { QuestionDataContextValue, questionModel } from '../../../../../../../shared/oop/models';
import Question from './question/questionDialog'
import { QuestionContext } from './questionContextService';
export default function QuestionLayout(props: any) {
    const questionsArr: questionModel[] = []
    const [question, setQuestion] = useState(questionsArr)
    const [dragHover, setDragHover] = useState(-1);
    const [dropDone, setDropDone] = useState(-1);
    const [questionReady, setQuestionReady] = useState(false);
    const questionContext: QuestionDataContextValue | any = useContext(QuestionContext);
    const allowDrop = (): void => {
        if (dragHover === dropDone) return;
        const d: any = document.querySelector(`.ondrag-b-${dragHover}`);
        if (d) setTimeout(() => d['style']['border'] = 'none', 500);
        const v1 = { ...question[dragHover] };
        const v2 = { ...question[dropDone] };
        question[dropDone] = v1;
        question[dragHover] = v2;
        setQuestion([...question])
    }
    const addData = (questionObj?: questionModel): void => {
        setQuestionReady(false)
        if (questionObj && questionObj.id) questionContext.mcq.set(questionObj)
    }
    useEffect(() => setQuestion(questionContext.mcq.get), [questionContext.mcq.get])
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
                question.length > 1 ?
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
                            <span id='t' onDoubleClick={e => {
                                questionContext.question.reloadQuestion({ ...question[i] });
                                setQuestionReady(true)
                            }}>{q.question}</span>
                        </div>
                        <div className="q-info" >
                            <DeleteIcon onClick={e => questionContext.mcq.delete(i)} />
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
                close={addData} />
        </div>
    )
}