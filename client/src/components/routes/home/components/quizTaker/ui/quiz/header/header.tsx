import React, { useState } from 'react';
import { Button, QueryBuilderIcon } from '../../../../../../../../shared/material-ui-modules'
import './header.scss'
export default function Header() {
    return (
        <div className="quiz-header">
            <div className="quiz-remaining-time">
                <span id='rem-time'>Remaining Time : </span>
                <span id='rem-min'>23:03 Minutes</span>
                <span id='clock-rem'>
                    <QueryBuilderIcon />
                </span>
            </div>
            <div className="quiz-submit-abandon">
                <span className="quiz-submit quiz-btn">
                    <Button>Submit</Button>
                </span>
                <span className="quiz-abandon quiz-btn">
                    <Button>Quiz</Button>
                </span>
            </div>
        </div>
    )
}