import { Quiz, Owner, Data } from '../shared/dataModels';
import { firebase } from './routeController';
import Utils from '../shared/utils';
export default class QuizTaker {
    public static async takeQuiz(request: any, response) {
        try {
            const id: string = request.params.id;
            const rollNo: string = request.params.rollno;
            const quizStudentData = request.body;
            let quizData = request.quizData;
            if (quizData.applicants && quizData.applicants[rollNo]) {
                response.status(400).send({ error: 'Quiz already taken', quiz: quizData.applicants[rollNo] });
                return;
            }
            quizData['applicants'] = { ...quizData['applicants'] };
            quizData['applicants'][rollNo] = QuizTaker.validateQuiz(quizData.data.questions, quizStudentData.questions);
            const obj = {};
            const quizId = id;
            obj[quizId] = quizData;
            await firebase.database().ref().update(obj);
            response.send({ message: "Quiz submitted", quiz: quizData['applicants'][rollNo] });
        } catch (e) {
            response.status(500).send(e)
        }
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
                    isCorrect: correct,
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