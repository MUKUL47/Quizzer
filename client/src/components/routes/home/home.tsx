import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import HomeRender from './ui/homeRender';
import QuizzerRoutes from '../../../shared/routes'
import { apiLoader, toast } from '../../../shared/utils'
import Api from '../../../shared/server/server'
import Otp from './ui/otp/otp';
export default function Home() {
    const history = useHistory();
    const [otpReady, setOtpReady] = useState(false);
    const [quizId, setQuizId] = useState((null as any));
    async function submitModify(quizid: string) {
        quizid = quizId || quizid;
        if (!quizid) return;
        try {
            apiLoader.next(true);
            const response = await Api.validate(quizid);
            apiLoader.next(false);
            setQuizId(quizid);
            toast.next({ message: response.data.message, type: '' });
            setOtpReady(true);
        } catch (error) {
            console.log(error)
            apiLoader.next(false);
            toast.next({ message: error, type: 'error' })
        }
    }
    async function verifyOtp(otp: string) {
        setOtpReady(false);
        try {
            apiLoader.next(true);
            const response = await Api.getQuiz(quizId, true, otp);
            apiLoader.next(false);
            history.push(`${QuizzerRoutes.quizMaker}/${quizId.trim()}`, { data: response.data, otp: otp });
        } catch (error) {
            apiLoader.next(false);
            toast.next({ message: error, type: 'error' })
        }
    }
    function createNew(): void {
        history.push(`${QuizzerRoutes.quizMaker}`);
    }
    function submitQuiz(quizId: String): void {
        history.push(`${QuizzerRoutes.quizTaker}/${quizId.trim()}`);
    }
    return <>
        {   otpReady ?
            <Otp
                cancelOtp={() => setOtpReady(false)}
                verifyOtp={verifyOtp}
                resend={() => {
                    setOtpReady(false);
                    submitModify(quizId);
                }}
            /> :
            null
        }
        <HomeRender
            submitModify={submitModify}
            createNew={createNew}
            submitQuiz={submitQuiz}
        /></>
}