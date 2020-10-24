import React from 'react';
import { Button } from '../../../../../../../../shared/material-ui-modules'
import './header.scss'
export default function Header(props: any) {
    return (
        <div className="quiz-header">
            <div className="quiz-remaining-time">
                <span id='rem-time'>Remaining Time : </span>
                <span id='rem-min'>{props.remainingTime}</span>
            </div>
            <div className="quiz-submit-abandon">
                <span className="quiz-submit quiz-btn">
                    <Button onClick={props.submitQuiz()}>Submit</Button>
                </span>
            </div>
        </div>
    )
}