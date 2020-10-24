import React, { useContext } from 'react';
import { Button, Checkbox } from '../../../../../../../../shared/material-ui-modules'
import './question.scss';
import { QuizContext } from '../quizContextService';
import { QuizContextModel } from '../../../../../../../../shared/datamodels/models';
export default function Question(props: any) {
    const quizContext: QuizContextModel | any = useContext(QuizContext);
    const formG = quizContext.quizForm.get.f;
    const formS = quizContext.quizForm.set;
    const contextTab = quizContext.questionTab;
    return (
        <div className="Question-lay">
            <div className="question-no-head">
                <div className="question-no">
                    Question {formG.activeQuestion + 1}.
                </div>
                <div style={{ fontSize: "16px" }}>
                    {formG.getTotalAttempt()} Attempted / {formG.questions.length}
                </div>
            </div>
            <div className="question-text">
                {formG.questions[formG.activeQuestion].question}
            </div>

            <div className="question-no-head">
                <div className="question-no" style={{ padding: '17px 0px' }}>
                    Choices
                </div>
            </div>

            <div className="question-tab-choices">
                <RenderChoices />
            </div>

            <div className="quiz-done-skip">
                <Button
                    className="quiz-done quiz-ds-btn"
                    onClick={e => {
                        formS({ f: formG.setActiveQuestion(formG.activeQuestion + 1) });
                        contextTab.set(true)
                    }}
                >Next</Button>
                <Button
                    className="quiz-skip quiz-ds-btn"
                    onClick={e => {
                        if (formG.flaggedQuestion.length === 1) {
                            contextTab.set(true)
                        }
                        formS({ f: formG.setflaggedQuestion(formG.activeQuestion) });
                    }}
                >{formG.flaggedQuestion.includes(formG.activeQuestion) ? 'Unflag' : 'Flag'}</Button>
            </div>
        </div>
    )
}
function RenderChoices() {
    const quizContext: QuizContextModel | any = useContext(QuizContext);
    const formG = quizContext.quizForm.get.f;
    const formS = quizContext.quizForm.set;
    const choices = formG.questions[formG.activeQuestion].choices;
    return (
        <div id='flex-2-option'>
            {choices.map((c: any, i: number) => {
                return (
                    <div className='question-choices-mcq q-m-t' key={i}
                        style={i === choices.length - 1 && i % 2 === 0 ? { flex: '0 100%' } : {}}
                    >
                        <div className='question-choices-left choice-tab'
                            onClick={e => formS({ f: formG.toggleQuestionChoice(i) })}
                        >
                            <span className="correct-c">
                                <Checkbox
                                    checked={c.selected}
                                />
                            </span>
                            <span className="correct-cc" >
                                {c.choice}
                            </span>
                        </div>

                    </div>
                )
            })}
        </div>
    )
}