import axios from 'axios'
import { resolve } from 'dns';
import { QuizzerApi } from '../routes'
export default class Api {
    public static updateQuiz(quizId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const finalUrl = QuizzerApi.base + QuizzerApi.createUpdateQuiz + `/${quizId}`;
            axios
                .post(finalUrl)
                .then((response) => resolve(response))
                .catch((err) => reject(err));
        })
    }
    public static getQuiz(quizId: string, answers?: boolean, otp?: string): Promise<any> {
        return new Promise((resolve, reject) => {
            let headers: any = {};
            headers['answer'] = answers;
            if (otp) {
                headers['otp'] = otp;
            }
            const finalUrl = QuizzerApi.base + QuizzerApi.quiz + `/${quizId}`;
            axios.get(finalUrl, { headers: headers }).then((response) => resolve(response)).catch((err) => reject(err));
        })
    }
    public static validate(quizId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const finalUrl = QuizzerApi.base + QuizzerApi.validate + `/${quizId}`;
            axios.get(finalUrl).then((response) => resolve(response)).catch((err) => reject(err));
        })
    }
}