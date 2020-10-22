import { Quiz, Owner, Data } from '../../shared/dataModels';
import { firebase } from '../routeController';
import Utils from '../../shared/utils';
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
    public static async getQuiz(request: any, response) {
        try {
            const id: string = request.params.id;
            const answer: boolean | string = request.headers.answer;
            const otp: string = request.headers.otp;
            if (!id) {
                response.status(400).send({ error: 'Invalid Id' });
                return;
            }
            let quizData = (await firebase.database().ref(id).once('value')).toJSON()
            if (!quizData) {
                response.status(404).send({ error: 'Quiz not found' });
                return;
            }
            delete quizData.applicants;
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
            let quizData = (await firebase.database().ref(id).once('value')).toJSON()
            if (!quizData) {
                response.status(404).send({ error: 'Quiz not found' });
                return;
            }
            const secret = Utils.getRand(100000, 999999);
            quizData['authentication'] = { secret: secret, date: new Date().toISOString() }
            const obj = {};
            const quizId = id;
            obj[quizId] = quizData;
            await firebase.database().ref().update(obj);
            response.status(200).send({ message: 'OTP sent' });
        } catch (e) {
            response.status(500).send(e)
        }
    }
}