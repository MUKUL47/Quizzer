import React, { useState, useEffect } from 'react';
import './quizMakerRenderer.scss'
import QuizForm from './quizForm/quizForm';
import QuestionLayout from './questionLayout/questionlayout';
import { HomeIcon } from '../../../../../../shared/material-ui-modules';
import { QuestionDataContext } from './questionLayout/questionContextService';
import { useHistory } from "react-router-dom";
import { resetData } from '../quizMaker';
export default function QuizMakerLayout(props: any) {
    const history = useHistory();
    const { dataChanged, update } = props;
    const [toggleFormQuiz, setToggleFormQuiz] = useState({ type: 'form' });
    const [resetToggle, setResetToggle] = useState((null as any));
    const goToHome = (): void => {
        if (window.confirm('Are you sure, your changes will be lost.')) {
            history.push('/');
        }
    }
    const setToggle = (type: any): void => setToggleFormQuiz({ type: type })
    useEffect(() => {
        const sub = resetData.subscribe({
            next: () => {
                setResetToggle(Math.random())
                setToggleFormQuiz({ type: 'form' })
            }
        });
        return (() => {
            sub.unsubscribe()
        })
    }, [])
    const layout = (
        <div>
            <div className="quizMakerBg"></div>
            <div className="layout-header">
                <div className="home-btn" onClick={(e: any) => goToHome()}>
                    <HomeIcon />
                </div>
                <div className="title">Quiz Maker</div>
            </div>
            <div className="quiz-maker quiz-m-p-100">
                <div className="layout" hidden={toggleFormQuiz.type === 'questions' ? true : false}>
                    <QuizForm
                        goToQuestion={() => setToggle('questions')}
                        dataChanged={dataChanged}
                        update={update}
                    />
                </div>
                <div className="layout" hidden={toggleFormQuiz.type === 'form' ? true : false}>
                    <QuestionDataContext
                        resetToggle={resetToggle}
                        update={update}
                    >
                        <QuestionLayout
                            goToForm={() => setToggle('form')}
                            dataChanged={dataChanged}
                        />
                    </QuestionDataContext>
                </div>
            </div>
        </div>
    )
    return layout;
}