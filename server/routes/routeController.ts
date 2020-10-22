const routes = require('express')();
const firebase = require('firebase')
require('dotenv').config({path: '../.env'});
firebase.initializeApp({
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId
})
import Routes from '../shared/routes';
import QuizMaker from './quizMaker/quizMakerController';

routes.post(Routes.makeQuiz, QuizMaker.createQuiz);
routes.get(Routes.quiz, QuizMaker.getQuiz);
export default routes;
export { firebase };