import React, { useState, useContext } from 'react';
import { Button } from '../../../../../../../../shared/material-ui-modules';
import { QuizContextModel } from '../../../../../../../../shared/datamodels/models';
import './questionsTab.scss';
import { QuizContext } from '../quizContextService';
export default function QuestionsTab(props: any) {
    const quizContext: QuizContextModel | any = useContext(QuizContext);
    const contextTab = quizContext.questionTab;
    const formG = quizContext.quizForm.get.f;
    const [activeQuestion, setActiveQuestion] = useState(1);
    return (
        <div className="ques-tab-lay">
            <div className="tab-head">
                {contextTab.get ? 'Total Questions' : 'Flagged Questions'}
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
    const formFlag = quizContext.questionTab.get;
    let questionArr: any = formFlag ? [...Array(formG.totalQuestions).fill(1).map((v, i) => i)] : [...formG.flaggedQuestion]
    return questionArr.map((q: number, i: any) => {
        const qq = q + 1;
        return (
            <div className="rem-q-row" key={i}>
                <div
                    className={GetC(qq)}
                    onClick={e => formS({ f: formG.setActiveQuestion(q) })}
                    style={{ fontSize: `${20 - `${qq}`.length * 2 + 2}px` }}
                >
                    {qq}
                </div>
            </div>
        )
    })
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
        if (formG.checkIfQuestionAttempt(n - 1)) {
            c += ' question-attempt';
        }
        return c;
    }
    return c + ' op-n';
}