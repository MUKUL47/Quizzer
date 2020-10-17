import React, { useState, useContext, useEffect, useRef, useCallback } from 'react';
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
                return (
                    <div className="mobile-tab-q"
                        key={i}
                        style={formG.activeQuestion == i ? { background: '#3369bd', color: '#fff' } : {}}
                        ref={formG.activeQuestion == i ? activeDiv : null}
                        onClick={e => formS({ f: formG.setActiveQuestion(i) })}>
                        {i + 1}
                    </div>
                )
            })}
        </>)
}