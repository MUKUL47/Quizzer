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
    const [activeQuestion, setActiveQuestion] = useState(1);
    return (
        <div className="ques-tab-lay">
            <div className="tab-head">
                {/* <div className="tab-bg"></div> */}
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
                    onClick={e => contextTab.set(false)}
                >Show Flagged</Button>
            </div>
        </div>
    )
}

function RenderQuestionRow(props: any) {
    const quizContext: QuizContextModel | any = useContext(QuizContext);
    const formG = quizContext.quizForm.get.f;
    const formS = quizContext.quizForm.set;
    const rows = [];
    for (let i = 1; i <= formG.totalQuestions; i++) {
        if (i % 5 === 1) {
            rows.push(
                <div className="rem-q-row" key={Math.random()}>
                    <div
                        className={GetC(i)}
                        onClick={e => formS({ f: formG.setActiveQuestion(i - 1) })}>
                        <b>{i}</b>
                    </div>
                    {
                        [1, 2, 3, 4].map(v => {
                            return (
                                <div
                                    key={i + v}
                                    className={GetC(i + v)}
                                    onClick={e => formS({ f: formG.setActiveQuestion(i + v - 1) })}>
                                    <b>{i + v}</b>
                                </div>
                            )
                        }
                        )
                    }
                </div>
            )
        }
    }
    return (<>{rows}</>)
}

function GetC(n: number) {
    const quizContext: QuizContextModel | any = useContext(QuizContext);
    const formG = quizContext.quizForm.get.f;
    const formS = quizContext.quizForm.set;
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