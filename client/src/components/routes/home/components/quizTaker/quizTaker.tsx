import React from 'react';
import QuizInstructions from './ui/quizInstructions/quizInstructions';
import Quiz from './ui/quiz/quiz';
import { QuizContextDataService } from './ui/quiz/quizContextService';
import { apiLoader, toast, toastPopup } from '../../../../../shared/utils';
import Api from '../../../../../shared/server/server';
export default class QuizTaker extends React.Component {
    state = { type: 'quizInstructions', data: (null as any), form: (null as any) }
    componentDidMount() { setTimeout(() => this.fetchQuiz()) }
    async fetchQuiz() {
        const props = (this.props as any);
        toast.next({ message: 'Loading Quiz...', type: '' })
        try {
            apiLoader.next(true);
            const resp = await Api.getQuiz(props.match.params.id, false);
            apiLoader.next(false);
            toast.next({ message: '', type: '' });
            const quiz = resp.data;
            this.setState({ ...this.state, data: { quizData: { ...quiz.owner, ...quiz.data, ...{ questions: this.formatQuestions(quiz.data.questions) } } } })
        } catch (e) {
            apiLoader.next(false)
            props.history.push('/');
            toast.next({ message: e.response.data.error, type: 'error' })
        }
    }
    formatQuestions(questions: any) {
        let formattedQuestions: any[] = [];
        for (let qIdx in questions) {
            const choices = Object.values(questions[qIdx].choices).map((c: any) => { return { choice: c.choice, selected: false } });
            formattedQuestions.push({ question: questions[qIdx].question, choices: choices })
        }
        return formattedQuestions;
    }
    startQuiz(form: any): void {
        const goFullScreen: any = document.querySelector('#goFullScreen');
        goFullScreen.click();
        this.setState({ type: 'quiz', form: form.q });
    }

    async submitQuiz(allFormData: any, manualSubmit?: boolean) {
        apiLoader.next(true);
        const exitFullScreen: any = document.querySelector('#exitFullScreen');
        exitFullScreen.click();
        const submittQuizData = {
            name: allFormData.form.name,
            email: allFormData.form.email,
            questions: allFormData.questions.map((question: any) => {
                return {
                    choices: question.choices.map((v: any, i: number) => {
                        if (v.selected === true) {
                            return i + 1;
                        }
                    }).filter((l: number) => l > -1)
                }
            })
        }
        const props = (this.props as any);
        await Api.submitQuiz(props.match.params.id, allFormData.form.rollNumber, submittQuizData)
        apiLoader.next(false);
        toastPopup.next({ message: manualSubmit ? 'Your quiz is submitted succesfully!' : 'Quiz over!', label: 'Quiz' });
        props.history.push('/');
        try {
        } catch (e) {
            apiLoader.next(false);
        }
    }
    render() {
        return (
            this.state.data ?
                <>
                    {
                        this.state.type === 'quizInstructions' ?
                            <QuizInstructions
                                onQuiz={this.startQuiz.bind(this)}
                                quizData={this.state.data.quizData}
                            />
                            :
                            <QuizContextDataService quizData={this.state.data.quizData} >
                                <Quiz
                                    quizData={this.state.data.quizData}
                                    form={this.state.form}
                                    submitQuizOver={this.submitQuiz.bind(this)}
                                />
                            </QuizContextDataService>
                    }
                </>
                : null
        )
    }
}