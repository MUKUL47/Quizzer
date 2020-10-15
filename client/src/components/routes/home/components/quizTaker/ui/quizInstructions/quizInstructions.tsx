import React, { useState } from 'react';
// import { QuizInstructions } from '../../../../../../../shared/datamodels/models';
import './quizInstructions.scss'
import {
    TextField, TitleIcon, PersonIcon, QueryBuilderIcon, PlayArrowIcon,
    HourglassFullIcon, HourglassEmptyIcon, FingerprintIcon, Button
}
    from '../../../../../../../shared/material-ui-modules';
import QuizInstructionsModel from '../../../../../../../shared/datamodels/quizInstructionsModel';
export default function QuizInstructions() {
    const quizInstructionsModel = new QuizInstructionsModel('', '');
    const [form, setForm] = useState({ q: quizInstructionsModel })
    return (
        <div className="quizInstructions-bg">
            <div className="q-inst">
                <div id='quiz-t'>Quiz Instructions</div>
                <div className="instructions">
                    <div className="dis-ins">
                        <CInput label="Title" value="General Knowledge Quiz" disabled={true} />
                        <div className="ins-icon">
                            <TitleIcon className="instruction-icon" />
                        </div>
                    </div>
                    <div className="inst-form">
                        <div className="dis-ins">
                            <CInput label="Author" value="Mukul" disabled={true} />
                            <div className="ins-icon">
                                <PersonIcon className="instruction-icon" />
                            </div>
                        </div>

                        <div className="dis-ins">
                            <CInput label="Quiz Duration" value="50 minutes" disabled={true} />
                            <div className="ins-icon">
                                <QueryBuilderIcon className="instruction-icon" />
                            </div>
                        </div>

                        <div className="dis-ins">
                            <CInput label="Quiz Starts In" value="8 Minutes" disabled={true} />
                            <div className="ins-icon">
                                <HourglassFullIcon className="instruction-icon" />
                            </div>
                        </div>

                        <div className="dis-ins">
                            <CInput label="Quiz Expires In" value="56 Minutes" disabled={true} />
                            <div className="ins-icon">
                                <HourglassEmptyIcon className="instruction-icon" />
                            </div>
                        </div>

                        <div className="dis-ins">
                            <CInput
                                label="Your Name *"
                                value={form.q.getName()}
                                required={true}
                                onChang={(v: any) => setForm({ q: form.q.setName(v) })}
                            />
                            <div className="ins-icon">
                                <PersonIcon className="instruction-icon" />
                            </div>
                        </div>

                        <div className="dis-ins">
                            <CInput
                                label="Roll Number *"
                                value={form.q.getRollNumber()}
                                required={true}
                                onChang={(v: any) => setForm({ q: form.q.setRollNumber(v) })}
                            />
                            <div className="ins-icon">
                                <FingerprintIcon className="instruction-icon" />
                            </div>
                        </div>
                    </div>
                    <div className="inst-submit">
                        <Button>Start Quiz</Button>
                        <div className="start-quiz-icon">
                            <PlayArrowIcon />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function CInput(props: any) {
    return (
        <TextField
            id="filled-search"
            label={props.label}
            type="Title"
            variant="filled"
            disabled={props.disabled}
            onChange={(e: any) => {
                if (props.onChang) {
                    props.onChang(e.target.value)
                }
            }}
            value={props.value}
        />
    )
}