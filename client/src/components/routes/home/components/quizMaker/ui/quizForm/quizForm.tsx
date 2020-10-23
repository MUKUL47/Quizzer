import React, { useState, useEffect } from 'react';
import './quizForm.scss'
import {
    TextField,
    HelpOutlineIcon,
    PersonIcon,
    Tooltip,
    InputAdornment,
    TitleIcon,
    EmailIcon,
    Checkbox,
    AccessAlarmIcon,
    Button
} from '../../../../../../../shared/material-ui-modules';
import Utils from '../../../../../../../shared/utils';
import QuizStructure from '../../../../../../../shared/datamodels/quizStucture';
export default function QuizForm(props: any) {
    document.title = 'Quiz Structure'
    const { dataChanged, resetToggle, update } = props;
    console.log(props.name)
    const quizStructure = new QuizStructure(2, Utils.getDateMaterialFormat(), Utils.getDateMaterialFormat(new Date(new Date().getTime() + (60 * 60 * 1000))))
    const [form, setForm] = useState({ q: quizStructure });
    const [formValidated, setFormValidated] = useState(false);
    useEffect(() => {
        setFormValidated(form.q.validateForm());
        console.log('->>')
    }, [form])
    useEffect(() => {
        if (update && update.form) {
            setForm({ q: form.q.nameGS(update.form.name) })
            setForm({ q: form.q.quizTitleGS(update.form.quizTitle) })
            setForm({ q: form.q.subscribeGS(update.form.subcribe) })
            setForm({ q: form.q.durationGS(update.form.quizDuration) })
            setForm({ q: form.q.quizStartTimeGS(update.form.quizStartTime) })
            setForm({ q: form.q.quizEndTimeGS(update.form.quizEndTime) })
            setForm({ q: form.q.emailGS(update.form.email) })
        }
    }, [update])
    useEffect(() => { setForm({ q: quizStructure }); }, [resetToggle])
    return (
        <div>
            <div className="header-name-struct">Form Structure</div>
            <div className="name form-field">
                <div className="form-text">
                    <span className="text text-color">Name {required()}</span>
                    {help('Creator of this quiz.')}
                </div>
                <TextField
                    id="standard-basic"
                    className="input-width-100"
                    placeholder="John Doe"
                    onChange={e => setForm({ q: form.q.nameGS(e.target.value) })}
                    value={form.q.nameGS()}
                    InputProps={{
                        startAdornment: (
                            < InputAdornment position="start" >
                                <PersonIcon className="text-icon" />
                            </InputAdornment>
                        )
                    }}
                />
            </div>
            <div className="name form-field">
                <div className="form-text">
                    <span className="text text-color">Quiz Title {required()}</span>
                    {help('Quiz title')}
                </div>
                <TextField
                    id="standard-basic"
                    className="input-width-100"
                    onChange={e => setForm({ q: form.q.quizTitleGS(e.target.value) })}
                    value={form.q.quizTitleGS()}
                    placeholder="General knowledge quiz..."
                    InputProps={{
                        startAdornment: (
                            < InputAdornment position="start" >
                                <TitleIcon className="text-icon" />
                            </InputAdornment>
                        )
                    }}
                />
            </div>
            <div className="name form-field">
                <div className="form-text">
                    <span className="text text-color">Email {required()}</span>
                    {help('Email is required for later modification(s) during authentication')}
                </div>
                <TextField
                    id="standard-basic"
                    onChange={e => setForm({ q: form.q.emailGS(e.target.value) })}
                    value={form.q.emailGS()}
                    className="input-width-100"
                    placeholder="johndoe@gmail.com"
                    InputProps={{
                        startAdornment: (
                            < InputAdornment position="start" >
                                <EmailIcon className="text-icon" />
                            </InputAdornment>
                        )
                    }}
                />
            </div>

            <div className="sub-dur">
                <div className="name form-field sub">
                    <div className="form-text subscribe">
                        <Checkbox color="primary" checked={form.q.subscribeGS()} onChange={e => { setForm({ q: form.q.subscribeGS(true, !form.q.subscribeGS()) }) }} />
                        <span className="text-color">Subscribe to students results.</span>
                        {help("You will recieve notifications on your email")}
                    </div>
                </div>

                <div className="name form-field">
                    <div className="form-text">
                        <span className="text text-color">Quiz Duration {required()}</span>
                        {help('Total duration of the quiz')}
                    </div>
                    <TextField
                        id="standard-basic"
                        type="number"
                        onChange={e => setForm({ q: form.q.durationGS(e.target.value) })}
                        value={form.q.durationGS()}
                        className="input-width-100"
                        placeholder="5 (Minutes)"
                        InputProps={{
                            startAdornment: (
                                < InputAdornment position="start" >
                                    <AccessAlarmIcon className="text-icon" />
                                </InputAdornment>
                            )
                        }}
                    />
                </div>
            </div>

            <div className="sub-dur">
                <div className="name form-field start-end-time sub">
                    <div className="start">
                        <TextField
                            onChange={e => setForm({ q: form.q.quizStartTimeGS(e.target.value) })}
                            label="Quiz start time *"
                            type="datetime-local"
                            defaultValue={form.q.quizStartTimeGS()}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                </div>
                <div className="name form-field start-end-time">
                    <div className="end end-time">
                        <TextField
                            onChange={e => setForm({ q: form.q.quizEndTimeGS(e.target.value) })}
                            label="Quiz expiry time"
                            type="datetime-local"
                            defaultValue={form.q.quizEndTimeGS()}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                </div>
            </div>


            <div className="submit">
                <Button
                    variant="contained"
                    color="primary"
                    disabled={!formValidated}
                    onClick={e => {
                        props.goToQuestion(form.q.getForm())
                        dataChanged(form.q)
                    }}
                >Prepare Questions
                </Button>
            </div>

        </div>
    )
}
function help(message: string) {
    return (
        <span className="help">
            <Tooltip title={message} placement="left" arrow>
                <HelpOutlineIcon />
            </Tooltip>
        </span>)
}

function required() {
    return <span className="required">*</span>
}