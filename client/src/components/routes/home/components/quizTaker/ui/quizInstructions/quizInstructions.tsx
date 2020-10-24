import React, { useState, useEffect } from 'react';
import './quizInstructions.scss'
import {
    TextField, TitleIcon, PersonIcon, QueryBuilderIcon, PlayArrowIcon, EmailIcon,
    HourglassFullIcon, HourglassEmptyIcon, FingerprintIcon, Button, Checkbox
}
    from '../../../../../../../shared/material-ui-modules';
import Utils from '../../../../../../../shared/utils'
import QuizInstructionsModel from '../../../../../../../shared/datamodels/quizInstructionsModel';
import QuizRules from './quizRules/quizRules';
export default function QuizInstructions(props: any) {
    document.title = 'Quiz Instructions';
    const quizInstructionsModel = new QuizInstructionsModel('', '');
    const [form, setForm] = useState({ q: quizInstructionsModel });
    const [tnc, setTnc] = useState(false);
    const [startsIn, setStartsIn] = useState(4001);
    const [expiresIn, setExpiresIn] = useState(3660001);
    useEffect(() => {
        const s = setTimeout(() => setStartsIn(startsIn - 1), 1000);
        return (() => clearTimeout(s))
    }, [startsIn])
    useEffect(() => {
        const s = setTimeout(() => setExpiresIn(expiresIn - 1), 1000);
        return (() => clearTimeout(s))
    }, [expiresIn])
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
                            <CInput label="Quiz Starts In" value={Utils.formatSeconds(startsIn)} disabled={true} />
                            <div className="ins-icon">
                                <HourglassFullIcon className="instruction-icon" />
                            </div>
                        </div>

                        <div className="dis-ins">
                            <CInput label="Quiz Expires In" value={Utils.formatSeconds(expiresIn)} disabled={true} />
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
                                placeholder="John Doe"
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
                        <div >
                            <Checkbox
                                color="primary"
                                onChange={e => setForm({ q: form.q.setEmailResults(!form.q.getEmailResults()) })}
                                value={form.q.getEmailResults()}
                            ></Checkbox>
                            <span style={{ fontSize: '14px' }}
                            >Email quiz results.</span>
                        </div>
                        <div className="dis-ins" hidden={!form.q.getEmailResults()}>
                            <CInput
                                label="Email *"
                                value={form.q.getEmail()}
                                required={true}
                                onChang={(v: any) => setForm({ q: form.q.setEmail(v) })}
                            />
                            <div className="ins-icon">
                                <EmailIcon className="instruction-icon" />
                            </div>
                        </div>
                    </div>
                    <div className="inst-submit">
                        <Button disabled={!form.q.validate()}
                            className={!form.q.validate() ? 'inst-dis' : ''}
                            onClick={e => setTnc(true)}
                        >
                            Start Quiz
                        </Button>
                        <div className="start-quiz-icon">
                            <PlayArrowIcon />
                        </div>
                    </div>
                </div>
            </div>
            <QuizRules open={tnc} close={() => setTnc(false)} onApprove={() => props.onQuiz()} />
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
            placeholder={props.placeholder}
            value={props.value}
        />
    )
}