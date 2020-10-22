import { firebase } from '../routeController';
export default class QuizMaker {
    public static createQuiz(request, response) {
        response.send(`createQuiz working ${firebase}`)
    }
}