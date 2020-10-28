const routes = require('express')();
const firebase = require('firebase')
require('dotenv').config({ path: '../.env' });
firebase.initializeApp({
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId
})
import Routes from '../shared/routes';
import QuizMaker from './quizMaker';
import QuizTaker from './quizTaker';

routes.post(Routes.makeQuiz, QuizMaker.createQuiz);
routes.put(Routes.updateQuiz, validateId, validateQuiz, QuizMaker.updateQuiz);
routes.get(Routes.quiz, validateId, validateQuiz, QuizMaker.getQuiz);
routes.get(Routes.validate, validateQuiz, QuizMaker.validateUser);
routes.put(Routes.registerQuiz, validateId, validateQuiz, QuizTaker.registerForQuiz);
routes.put(Routes.submitQuiz, validateId, validateQuiz, QuizTaker.submitQuiz);
export default routes;
export { firebase };

//middlewares
function validateId(request: any, response, next) {
    if (!request.params.id) {
        response.status(400).send({ error: 'Invalid Id' });
        return;
    }
    next();
}
async function validateQuiz(request: any, response, next) {
    try {
        let quizData = (await firebase.database().ref(request.params.id).once('value')).toJSON()
        if (!quizData) {
            response.status(404).send({ error: 'Quiz not found' });
            return;
        }
        request.quizData = quizData;
        next();
    }
    catch (e) {
        response.status(500).send(e)
    }
}