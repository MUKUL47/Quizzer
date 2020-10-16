import React, { useState } from 'react';
import { Button, HelpIcon } from '../../../../../../../../shared/material-ui-modules'
import './questionsTab.scss'
const q = Array(22).fill(1);
const activeQ = 1;
const questionDone = [12, 13, 16];
export default function QuestionsTab(props: any) {
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
                <Button className="ques-b-all">Show All</Button>
                <Button className="ques-b-skip">Show Remaining</Button>
            </div>
        </div>
    )
}

function RenderQuestionRow(props: any) {
    const rows = [];
    for (let i = 1; i < q.length; i++) {
        if (i % 5 === 1) {
            rows.push(
                <div className="rem-q-row">
                    <div className={getC(i, props.activeQuestion)} onClick={e => props.setActiveQuestion(i)}>
                        <b>{i}</b>
                    </div>
                    {[1, 2, 3, 4].map(v => <div className={getC(i + v, props.activeQuestion)} onClick={e => props.setActiveQuestion(i + v)}>
                        <b>{i + v}</b>
                    </div>)}
                </div>
            )
        }
    }
    return (<div>{rows}</div>)
}

function getC(n: number, activeQu: number) {
    let c = 'rem-q-no';
    if (q[n]) {
        if (n === activeQu) {
            c += ' current-active-question'
        }
        else if (questionDone.includes(n)) {
            c += ' question-done'
        }
        return c;
    }
    return c + ' op-n';
}