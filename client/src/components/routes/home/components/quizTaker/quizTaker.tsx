import React from 'react';
import QuizInstructions from './ui/quizInstructions/quizInstructions';
import Quiz from './ui/quiz/quiz';
import { QuizContextDataService } from './ui/quiz/quizContextService';
export default class QuizTaker extends React.Component {
    state = { type: 'quizInstructions' }
    constructor(props: any) {
        super(props)
    }
    startQuiz(): void {
        const goFullScreen: any = document.querySelector('#goFullScreen');
        goFullScreen.click();
        this.setState({ type: 'quiz' });
    }
    render() {
        return (
            this.state.type === 'quizInstructions' ?
                <QuizInstructions onQuiz={this.startQuiz.bind(this)} />
                :
                <QuizContextDataService>
                    <Quiz />
                </QuizContextDataService>

        )
    }
}