import React, { useState } from 'react';
import { Button, Checkbox } from '../../../../../../../../shared/material-ui-modules'
import './question.scss'
const ques = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'
const choices = Array(4).fill(1).map((v, i) => `is simply text of t Ipsum is simply dummy text of t ${i}`)
export default function Question() {
    return (
        <div className="Question-lay">
            <div className="question-no-head">
                <div className="question-no">
                    Question 1.
                </div>
            </div>
            <div className="question-text">
                {ques}
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
                <Button className="quiz-done quiz-ds-btn">Next</Button>
                <Button className="quiz-skip quiz-ds-btn">Skip</Button>
            </div>
        </div>
    )
}
function RenderChoices() {
    let cc = [];
    for (let i = 0; i < choices.length && choices[i]; i++) {
        if (i % 2 === 0) {
            const onlyOne: boolean = choices[i + 1] ? true : false;
            cc.push(
                <div className="question-choices-mcq q-m-t">
                    <div className='question-choices-left choice-tab' style={!onlyOne ? { width: '47%' } : {}}>
                        <span className="correct-c">
                            <Checkbox />
                        </span>
                        <span className="correct-cc">
                            {choices[i]}
                        </span>
                    </div>
                    {
                        onlyOne ?
                            <div className="question-choices-right choice-tab">
                                <span className="correct-c">
                                    <Checkbox />
                                </span>
                                <span className="correct-cc">
                                    {choices[i + 1]}
                                </span>
                            </div> :
                            null
                    }

                </div>)
        }
    }
    return (<div>{cc}</div>)
}