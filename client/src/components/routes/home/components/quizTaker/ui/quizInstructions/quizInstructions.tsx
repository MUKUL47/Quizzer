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
    const { quizData } = props;
    const currentMS = new Date(Utils.getDateMaterialFormat()).valueOf();
    const ss = new Date(quizData.quizStartTime).valueOf();
    const ee = new Date(quizData.quizEndTime).valueOf();
    const startsInT: number | any = ss - currentMS <= 0 ? 'Started' : (ss - currentMS) / 1000;
    const expiresInT: number | any = ee - currentMS <= 0 ? 'Expired' : (ee - currentMS) / 1000;
    const quizInstructionsModel = new QuizInstructionsModel('', '', quizData.quizTitle, quizData.name, quizData.quizDuration);
    const [form, setForm] = useState({ q: quizInstructionsModel });
    const [tnc, setTnc] = useState(false);
    const [startsIn, setStartsIn] = useState(((startsInT) as number | string));
    const [expiresIn, setExpiresIn] = useState(((expiresInT) as number | string));
    useEffect(() => {
        const s = setTimeout(() => {
            if (startsIn > 0 || startsIn !== 'Started') {
                setStartsIn(Number(startsIn) - 1)
            }
        }, 1000);
        return (() => clearTimeout(s))
    }, [startsIn])
    useEffect(() => {
        const s = setTimeout(() => {
            if (expiresIn > 0 || expiresIn !== 'Expired') {
                setExpiresIn(Number(expiresIn) - 1)
            }
        }, 1000);
        return (() => clearTimeout(s))
    }, [expiresIn])
    const startsI = Utils.formatSeconds(startsIn);
    const endsI = Utils.formatSeconds(expiresIn);
    return (
        <div className="quizInstructions-bg">
            <div className="q-inst">
                <div id='quiz-t'>Quiz Instructions</div>
                <div className="instructions">
                    <div className="dis-ins">
                        <CInput label="Title" value={form.q.title} disabled={true} />
                        <div className="ins-icon">
                            <TitleIcon className="instruction-icon" />
                        </div>
                    </div>
                    <div className="inst-form">
                        <div className="dis-ins">
                            <CInput label="Author" value={form.q.author} disabled={true} />
                            <div className="ins-icon">
                                <PersonIcon className="instruction-icon" />
                            </div>
                        </div>

                        <div className="dis-ins">
                            <CInput label="Quiz Duration" value={form.q.duration} disabled={true} />
                            <div className="ins-icon">
                                <QueryBuilderIcon className="instruction-icon" />
                            </div>
                        </div>

                        <div className="dis-ins">
                            <CInput label={startsIn === 'Started' ? "Quiz Status" : "Quiz Starts In"} value={startsI} disabled={true} style={{ color: 'green' }} />
                            <div className="ins-icon">
                                <HourglassFullIcon className="instruction-icon" />
                            </div>
                        </div>

                        <div className="dis-ins">
                            <CInput label="Quiz Expires In" value={endsI} disabled={true} />
                            <div className="ins-icon">
                                <HourglassEmptyIcon className="instruction-icon" />
                            </div>
                        </div>

                        <div className="dis-ins">
                            <CInput
                                label="Your Name *"
                                value={form.q.name}
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
                                value={form.q.rollNumber}
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
                                value={form.q.emailResults}
                            ></Checkbox>
                            <span style={{ fontSize: '14px' }}
                            >Email quiz results.</span>
                        </div>
                        <div className="dis-ins" hidden={!form.q.emailResults}>
                            <CInput
                                label="Email *"
                                value={form.q.email}
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
            <QuizRules open={tnc} close={() => setTnc(false)} onApprove={() => props.onQuiz(form)} />
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