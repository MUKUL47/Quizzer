import React, { useState, useContext } from 'react';
import { Button, HelpIcon } from '../../../../../../../../shared/material-ui-modules';
import { QuizContextModel } from '../../../../../../../../shared/datamodels/models';
import './questionsTab.scss';
import { QuizContext } from '../quizContextService';
const q = Array(22).fill(1);
const activeQ = 1;
const questionDone = [12, 13, 16];
export default function QuestionsTab(props: any) {
    const quizContext: QuizContextModel | any = useContext(QuizContext);
    const contextTab = quizContext.questionTab;
    const formG = quizContext.quizForm.get.f;
    const [activeQuestion, setActiveQuestion] = useState(1);
    return (
        <div className="ques-tab-lay">
            <div className="tab-head">
                Total Questions
                <div className="tab-head-roadIcon">
                    <HelpIcon />
                </div>
            </div>
            <div className="rem-ques">
                <RenderQuestionRow
                    activeQuestion={activeQuestion}
                    setActiveQuestion={(n: number) => setActiveQuestion(n)}
                />
            </div>
            <div className="ques-b-all-skip">
                <Button
                    className={contextTab.get ? 'ques-b-all' : 'ques-b-skip'}
                    onClick={e => contextTab.set(true)}
                >Show All</Button>
                <Button
                    className={contextTab.get ? 'ques-b-skip' : 'ques-b-all'}
                    onClick={e => contextTab.set(formG.flaggedQuestion.length > 0 ? false : true)}
                >Show Flagged {formG.flaggedQuestion.length > 0 ? `(${formG.flaggedQuestion.length})` : ''}</Button>
            </div>
        </div>
    )
}

function RenderQuestionRow(props: any) {
    const quizContext: QuizContextModel | any = useContext(QuizContext);
    const formG = quizContext.quizForm.get.f;
    const formS = quizContext.quizForm.set;
    const rows: any = [];
    GetNestedArr().forEach((qRows, i) => {
        rows.push(
            <div className="rem-q-row" key={i}>
                {
                    qRows.map((q: number, j: number) => (
                        <div key={`${i}-${j}`}
                            className={GetC(q + 1)}
                            onClick={e => formS({ f: formG.setActiveQuestion(q) })}>
                            <b>{q + 1}</b>
                        </div>
                    ))
                }
            </div>
        )
    })
    return (<>{rows}</>)
}

function GetNestedArr() {
    const quizContext: QuizContextModel | any = useContext(QuizContext);
    const formG = quizContext.quizForm.get.f;
    const formFlag = quizContext.questionTab.get;
    const contextTab = quizContext.questionTab;
    const nest = [];
    let questionArr: any = formFlag ? [...Array(formG.totalQuestions).fill(1).map((v, i) => i)] : [...formG.flaggedQuestion];
    while (questionArr.length > 0) {
        nest.push(questionArr.splice(0, 5))
    }
    if (nest[nest.length - 1] && nest[nest.length - 1].length < 5) {
        nest[nest.length - 1] = [...nest[nest.length - 1], ...Array(5 - nest[nest.length - 1].length).fill(-1)]
    } else if (!formFlag && !nest[nest.length - 1]) {
        contextTab.set(true)
    }
    return nest;
}

function GetC(n: number) {
    const quizContext: QuizContextModel | any = useContext(QuizContext);
    const formG = quizContext.quizForm.get.f;
    let c = 'rem-q-no';
    if (formG.questions[n - 1]) {
        if (n === formG.activeQuestion + 1) {
            c += ' current-active-question'
        }
        else if (formG.flaggedQuestion.includes(n - 1)) {
            c += ' question-done'
        }
        return c;
    }
    return c + ' op-n';
}