import React, { useState, useContext } from 'react';
import { Button, Checkbox } from '../../../../../../../../shared/material-ui-modules'
import './question.scss';
import { QuizContext } from '../quizContextService';
import { QuizContextModel } from '../../../../../../../../shared/datamodels/models';
const ques = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'
const choices = Array(4).fill(1).map((v, i) => `is simply text of t Ipsum is simply dummy text of t ${i}`)
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
                <div>
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
                    onClick={e => formS({ f: formG.setflaggedQuestion(formG.activeQuestion) })}
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
    let cc = [];
    for (let i = 0; i < choices.length; i++) {
        if (i % 2 === 0) {
            const onlyOne: boolean = choices[i + 1] ? true : false;
            cc.push(
                <div className="question-choices-mcq q-m-t" key={Math.random()}>
                    <div className='question-choices-left choice-tab' style={!onlyOne ? { width: '47%' } : {}}>
                        <span className="correct-c">
                            <Checkbox
                                checked={choices[i].selected}
                                onChange={e => formS({ f: formG.toggleQuestionChoice(i) })} />
                        </span>
                        <span className="correct-cc" >
                            {choices[i].choice}
                        </span>
                    </div>
                    {
                        onlyOne ?
                            <div className="question-choices-right choice-tab">
                                <span className="correct-c">
                                    <Checkbox
                                        checked={choices[i + 1].selected}
                                        onChange={e => formS({ f: formG.toggleQuestionChoice(i + 1) })}
                                    />
                                </span>
                                <span className="correct-cc" >
                                    {choices[i + 1].choice}
                                </span>
                            </div> :
                            null
                    }

                </div>)
        }
    }
    return (<div>{cc}</div>)
}