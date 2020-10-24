import React from 'react';
import Api from '../../../../../shared/server/server';
import { toast, apiLoader } from '../../../../../shared/utils';
import QuizMakerLayout from './ui/quizMakerRenderer';
import { Subject } from 'rxjs';
const resetData = new Subject<boolean>();
export { resetData }
export default class QuizMaker extends React.Component {
    state = {
        form: ({} as any),
        data: ({} as any),
        update: ({} as any),
        otp: (null as any)
    }
    constructor(props: any) {
        super(props);
        const preData = props.location.state || {};
        this.state = { ...this.state, update: preData.data, otp: preData.otp };
    }

    componentDidMount() {
        if (this.state.update) {
            this.formatCurrentQuiz(this.state.update);
        }
    }

    public async submitQuiz(quizData: any) {
        try {
            apiLoader.next(true);
            const response = await Api.createQuiz(quizData);
            apiLoader.next(false);
            toast.next({ message: `Quiz created, Id : ${response.data.id}`, type: '' })
            resetData.next(true);
        } catch (e) {
            apiLoader.next(false);
            toast.next({ message: e, type: 'error' })
        }
    }

    public async updateQuiz(quizData: any) {
        try {
            apiLoader.next(true);
            await Api.updateQuiz(quizData, window.location.pathname.split('/')[2], this.state.otp);
            window.location.href = '/'
            apiLoader.next(false);
            toast.next({ message: `Quiz updated successfully`, type: '' })
            resetData.next(true);
        } catch (e) {
            apiLoader.next(false);
            toast.next({ message: e, type: 'error' })
        }
    }

    public dataChanged(data: any, submit?: boolean) {
        if (!submit) {
            this.setState({ ...this.state, form: data })
        } else {
            this.setState({ ...this.state, data: data }, () => {
                const questions = this.state.data.map((question: any) => {
                    const choices = question.choices.map((c: any) => { return { choice: c.c, isCorrect: c.correct } });
                    return { question: question.question, choices: choices }
                });
                const quizData = {
                    data: {
                        quizDuration: this.state.form.duration,
                        quizStartTime: this.state.form.quizStartTime,
                        quizEndTime: this.state.form.quizEndTime,
                        questions: questions
                    },
                    owner: {
                        name: this.state.form.name,
                        email: this.state.form.email,
                        quizTitle: this.state.form.quizTitle
                    }
                };
                if (this.state.otp) {
                    this.updateQuiz(quizData)
                } else {
                    this.submitQuiz(quizData);
                }
            });
        }
    }

    public formatCurrentQuiz(quizData: any) {
        const quizForm = {
            name: quizData.owner.name,
            email: quizData.owner.email,
            quizTitle: quizData.owner.quizTitle,
            quizDuration: quizData.data.quizDuration,
            quizEndTime: quizData.data.quizEndTime,
            quizStartTime: quizData.data.quizStartTime
        };
        const questions = [];
        for (let qIdx in quizData.data.questions) {
            const question = quizData.data.questions[qIdx];
            questions.push({
                question: question.question,
                choices: Object.values(question.choices).map((c: any) => { return { c: c.choice, correct: c.isCorrect, edit: false, editedValue: '' } }),
                id: new Date().valueOf()
            })
        }
        this.setState({ ...this.state, update: { form: quizForm, questions: questions } })
    }

    render() {
        return (
            <>
                <QuizMakerLayout
                    dataChanged={this.dataChanged.bind(this)}
                    update={this.state.update}
                />
            </>
        )
    }
}