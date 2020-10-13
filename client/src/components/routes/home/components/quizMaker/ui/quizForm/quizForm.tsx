import React, { useState } from 'react';
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
export default function QuizForm() {

    const [quizStartTime, setQuizTime] = useState(Utils.getDateMaterialFormat())
    const [quizEndTime, setQuizEndTime] = useState(Utils.getDateMaterialFormat(new Date(new Date().getTime() + (60 * 60 * 1000))))
    console.log('2017-05-24T10:30', quizStartTime)
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
                        <Checkbox color="primary" />
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
                            onChange={e => setQuizTime(e.target.value)}
                            label="Quiz start time *"
                            type="datetime-local"
                            defaultValue={quizStartTime}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                </div>
                <div className="name form-field start-end-time">
                    <div className="end end-time">
                        <TextField
                            onChange={e => setQuizEndTime(e.target.value)}
                            label="Quiz expiry time"
                            type="datetime-local"
                            defaultValue={quizEndTime}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                </div>
            </div>


            <div className="submit">
                <Button variant="contained" color="primary">Prepare Questions</Button>
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