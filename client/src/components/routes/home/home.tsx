import React from 'react';
import { useHistory } from "react-router-dom";
import HomeRender from './ui/homeRender';
import QuizzerRoutes from '../../../shared/routes'
export default function Home() {
    const history = useHistory();
    function submitModify(quizId: String): void {
        history.push(`${QuizzerRoutes.quizMaker}/${quizId.trim()}`);
    }
    function createNew(): void {
        history.push(`${QuizzerRoutes.quizMaker}`);
    }
    function submitQuiz(quizId: String): void {
        history.push(`${QuizzerRoutes.quizTaker}/${quizId.trim()}`);
    }
    return <HomeRender
        submitModify={submitModify}
        createNew={createNew}
        submitQuiz={submitQuiz}
    />
}