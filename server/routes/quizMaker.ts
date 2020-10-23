import { Quiz, Owner, Data } from '../shared/dataModels';
import { firebase } from './routeController';
import Utils from '../shared/utils';
export default class QuizMaker {
    public static async createQuiz(request: any, response) {
        try {
            const quizBody: Quiz = request.body;
            const obj = {};
            const quizId = new Date().valueOf();
            obj[quizId] = quizBody;
            await firebase.database().ref().update(obj);
            response.status(201).send({ id: quizId })
        } catch (e) {
            response.status(500).send(e)
        }
    }
    public static async getQuiz(request: any, response, next) {
        try {
            const id: string = request.params.id;
            const answer: boolean | string = request.headers.answer;
            const otp: string = request.headers.otp;
            let quizData = request.quizData;
            delete quizData.applicants;
            console.log(otp, quizData.authentication, answer)
            if (answer == 'true') {
                console.log(otp, quizData.authentication)
                if (!otp || !Utils.validateOtp(quizData.authentication, otp)) {
                    response.status(403).send({ error: 'Access Denied' });
                    return;
                }
                const obj = {};
                const quizId = id;
                obj[quizId] = quizData;
                delete quizData.authentication;
                await firebase.database().ref().update(obj);
                response.send(quizData);
            } else {
                delete quizData.authentication;
                let questions = quizData.data.questions;
                for (let qIdx in questions) {
                    for (let cIdx in questions[qIdx].choices) {
                        delete questions[qIdx].choices[cIdx].isCorrect
                    }
                }
                delete quizData.owner.email;
                response.send(quizData);
            }
        } catch (e) {
            response.status(500).send(e)
        }
    }

    public static async validateUser(request: any, response) {
        try {
            const id: string = request.params.id;
            let quizData = request.quizData;
            const secret = Utils.getRand(100000, 999999);
            const email = quizData.owner.email;
            await Utils.mail(email, secret);
            quizData['authentication'] = { secret: secret, date: new Date().toISOString() }
            const obj = {};
            const quizId = id;
            obj[quizId] = quizData;
            await firebase.database().ref().update(obj);
            let hiddenEmail = email.split('').map((v, i) => {
                if (i <= 3 || i >= email.length - 3) {
                    return v;
                }
                return '*'
            }).join('')
            response.status(200).send({ message: `OTP sent to ${hiddenEmail}` });
        } catch (e) {
            response.status(500).send(e)
        }
    }

    public static async updateQuiz(request: any, response) {
        try {
            const id: string = request.params.id;
            const otp: string = request.headers.otp;
            let quizData = request.quizData;
            if (!otp || !Utils.validateOtp(quizData.authentication, otp)) {
                response.status(403).send({ error: 'Access Denied' });
            } else {
                if (quizData.applicants) {
                    response.status(400).send({ error: 'Few students have already taken this quiz' });
                    return;
                }
                const obj = {};
                obj[id] = request.body;
                await firebase.database().ref().update(obj);
                response.status(200).send(obj)

            }
        } catch (e) {
            response.status(500).send(e)
        }
    }
}