import React from 'react';
import { useHistory } from "react-router-dom";
import HomeRender from './ui/homeRender';
import QuizzerRoutes from '../../../shared/routes'
export default function Home() {
    const history = useHistory();
    const submitModify = (quizId: String) => {
        history.push(`${QuizzerRoutes.quizMaker}/${quizId}`);
    }
    const createNew = () => {
        history.push(`${QuizzerRoutes.quizMaker}`);
    }
    const submitQuiz = (quizId: String) => {
        history.push(`${QuizzerRoutes.quizTaker}/${quizId}`);
    }
    return <HomeRender
        submitModify={submitModify}
        createNew={createNew}
        submitQuiz={submitQuiz}
    />
}