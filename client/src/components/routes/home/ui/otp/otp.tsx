import React, { createRef, useEffect, useState } from 'react';
import './otp.scss'
import {
    TextField, Dialog, Button, ReplayIcon, CloseIcon, CheckCircleOutlineIcon
    // , Popover,HelpIcon
} from '../../../../../shared/material-ui-modules';
export default function Otp(props: any) {
    const { cancelOtp, verifyOtp, resend } = props;
    const [focusOn, setFocusOn] = useState(0)
    const [values, setValues] = useState(({ 0: '', 1: '', 2: '', 3: '', 4: '', 5: '' } as any))
    const [focuses, setFocuses] = useState((Array(6).fill(true).map(_ => createRef()) as any))
    const [otpValid, setOtpValid] = useState(('' as any))
    const [inProgress, setInProgress] = useState(false)
    const onClic = (e: any) => {
        setFocusOn(e)
    }
    useEffect(() => {
        const otp = Object.values(values).map(v => v).join('')
        if (`${otp}`.length === 6) {
            setOtpValid(otp)
            return;
        }
        setOtpValid(null)
    }, [values])

    const resendOtp = (e: any) => {
    }

    const onKeyU = (e: any, i: number) => {
        if (e.key <= 9 || e.key >= 0) {
            if (i < 5) {
                setFocusOn(i + 1)
                focuses[i + 1].current.focus()
            }
        }
    }
    const verify = () => {
        if (!otpValid || inProgress) { return }
        verifyOtp(otpValid);
    }
    const onKeyP = (e: any, i: number) => {
        if (e.keyCode === 13) {
            verify()
            return;
        }
        if (e.keyCode === 8 && (focusOn) > 0) {
            const cV: any = { ...values }
            cV[i] = ''
            setValues(cV)
            if (values[i] === '') {
                setFocusOn(focusOn - 1)
                focuses[focusOn - 1].current.focus()
            }
        }
    }

    const onChang = (e: any, i: number) => {
        const val = `${e.target.value}`;
        if (!isNaN(Number(val))) {
            const cV: any = { ...values }
            cV[i] = val.length === 1 ? val : val.charAt(val.length - 1)
            setValues(cV)
        }
    }
    const isEnabled = otpValid && !inProgress
    return (
        <div className='otp-parent'>
            <Dialog
                open={true}>
                <div className='otp-modal'>
                    <div className='goBack'>
                        {
                            !inProgress ?
                                <CloseIcon className="close-otp" onClick={e => {
                                    if (!inProgress) { props.cancelOtp() }
                                }} /> :
                                null
                        }

                    </div>
                    <div className="otp-title">
                        Enter OTP
                    </div>
                    <div className="otp-input">
                        {Array(6).fill(true).map((v, i) => {
                            return <input
                                className='otp-inp'
                                key={i}
                                ref={focuses[i]}
                                id={`otp-inp-${i}`}
                                // autoFocus={i == focusOn}
                                onClick={e => onClic(i)}
                                onKeyPress={e => onKeyU(e, i)}
                                value={values[i]}
                                onKeyDown={e => onKeyP(e, i)}
                                onChange={e => onChang(e, i)}
                                onFocus={e => e.target.select()}
                                autoFocus={i === 0}
                            />
                        })}
                    </div>
                    <div className="otp-btns">
                        <span className='otp-verify'>
                            <Button
                                variant="contained"
                                className={isEnabled ? 'otp-verify-btn' : 'otp-verify-btn bg-empty-dis'}
                                onClick={verify}
                                disabled={!isEnabled}
                            >
                                Verify
                                <CheckCircleOutlineIcon className="icon" />
                            </Button>
                        </span>
                        <span className='otp-resend'>
                            <Button
                                variant="contained"
                                className={!inProgress ? 'otp-resend-btn' : 'otp-resend-btn bg-empty-dis'}
                                disabled={inProgress}
                                onClick={resend}
                            >
                                Resend
                                <ReplayIcon className="icon" />
                            </Button>
                        </span>
                    </div>
                </div>
            </Dialog>
        </div>)
}