import React, { useContext, useEffect, useRef } from 'react';
import './questionsMobileTab.scss';
import { QuizContext } from '../quizContextService';
import './questionsMobileTab.scss'
export default function QuestionsMobileTab() {
    const quizContext: any = useContext(QuizContext);
    const formG: any = quizContext.quizForm.get.f;
    const formS = quizContext.quizForm.set;
    const activeDiv = useRef(null);
    useEffect(() => {
        let a: any = activeDiv;
        a.current.scrollIntoView();
    }, [formG.activeQuestion])
    return (
        <>
            {Array(formG.totalQuestions).fill(1).map((v: number, i: any) => {
                const I = i + 1;
                const fS = { fontSize: `${20 - `${I}`.length * 3 + 2}px` };
                return (
                    <div className={`mobile-tab-q${GetC(i)}`}
                        key={i}
                        style={formG.activeQuestion === i ? { background: '#3369bd', color: '#fff', ...fS } : fS}
                        ref={formG.activeQuestion === i ? activeDiv : null}
                        onClick={e => formS({ f: formG.setActiveQuestion(i) })}>
                        {I}
                    </div>
                )
            })}
        </>)
}

function GetC(n: number) {
    const quizContext: any = useContext(QuizContext);
    const formG = quizContext.quizForm.get.f;
    let c = ''
    if (formG.flaggedQuestion.includes(n)) {
        c += ' question-done'
    }
    if (formG.checkIfQuestionAttempt(n)) {
        c += ' question-attempt';
    }
    return c;
}