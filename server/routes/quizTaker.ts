import { Quiz, Owner, Data } from '../shared/dataModels';
import { firebase } from './routeController';
import Utils from '../shared/utils';
export default class QuizTaker {
    public static async registerForQuiz(request: any, response) {
        try {
            const id: string = request.params.id;
            const rollNo: string = request.params.rollno;
            const quizStudentData = request.body;
            let quizData = request.quizData;
            if (quizData.applicants && quizData.applicants[rollNo] && quizData.applicants[rollNo].questions) {
                response.status(400).send({ error: 'Quiz already submitted' })
                return;
            }
            else if (new Date(quizData.data.quizEndTime) <= new Date()) {
                response.status(400).send({ error: 'Quiz expired' })
                return;
            }
            if (!quizData.applicants) {
                quizData['applicants'] = {}
            }
            quizData['applicants'][rollNo] = {
                name: quizStudentData.name,
                email: quizStudentData.email
            }
            const obj = {};
            obj[id] = quizData;
            await firebase.database().ref().update(obj);
            response.status(200).send();
            return;
        } catch (e) {
            response.status(500).send({ error: 'Unknown error occured' })
        }
    }
    public static async submitQuiz(request: any, response) {
        try {
            const id: string = request.params.id;
            const rollNo: string = request.params.rollno;
            const quizStudentData = request.body;
            let quizData = request.quizData;
            if (!quizStudentData.questions) {
                response.status(400).send({ error: 'Questions not found' })
                return;
            }
            else if (!quizData.applicants || !quizData.applicants[rollNo]) {
                response.status(400).send({ error: 'Student not registered' })
                return;
            }
            else if (quizData.applicants[rollNo].questions) {
                response.status(400).send({ error: 'Quiz already submitted', quiz: quizData['applicants'][rollNo] })
                return;
            }
            quizData['applicants'][rollNo] = {
                ...quizData['applicants'][rollNo],
                questions: QuizTaker.validateQuiz(quizData.data.questions, quizStudentData.questions)
            }
            const email = quizData['applicants'][rollNo].email;
            if (email) {
                const quizBody = QuizTaker.emailQuizHTML(quizData['applicants'][rollNo]);
                await Utils.mail(email, null, quizBody.body, quizBody.subject)
            }
            const obj = {};
            obj[id] = quizData;
            await firebase.database().ref().update(obj);
            response.status(200).send({ message: `Quiz submitted successfully${email ? ', check your email for results' : ''}` });
            return;
        } catch (e) {
            response.status(500).send({ error: 'Unknown error occured' })
        }
    }

    private static emailQuizHTML(data) {
        const questons = data.questions;
        const attempt = questons.filter((v: any) => v.actualChoices.length > 0)
        const body = `
            <div>
                <div>Total Questions : <b>${questons.length}</b></div>
                </br>
                <div>Attempted : <b>${attempt.length}</b></div>
                </br>
                <div>Skipped : <b>${questons.length - attempt.length}</b></div>
                </br>
                <div>Score : <b>${questons.filter((v: any) => v.isCorrect).length} out of ${questons.length}</b></div>
            <div>
        `;
        return { subject: 'Quizzer Result', body: body }
    }

    private static validateQuiz(actualQuestions, attemptedQuestions) {
        try {
            for (let qIndex in actualQuestions) {
                let activeQ = actualQuestions[qIndex];
                let attempQ = attemptedQuestions[qIndex];
                let correctChoices = Object.values(activeQ.choices).map((choice: any, choiceIndex) => {
                    if (choice.isCorrect == true) {
                        return choiceIndex;
                    }
                }).filter(i => i >= 0);
                const correct = !attempQ.choices.map(c => correctChoices.includes(c)).includes(false);
                attemptedQuestions[qIndex] = {
                    isCorrect: correctChoices.length === attempQ.choices.length ? correct : false,
                    question: activeQ.question,
                    actualChoices: attempQ.choices
                }
            }
            return attemptedQuestions;
        } catch (e) {
            throw Error(e)
        }
    }
}