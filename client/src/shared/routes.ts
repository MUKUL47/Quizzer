export default class QuizzerRoutes {
    public static home = '/';
    public static quizMaker = '/quizmaker';
    public static quizTaker = '/quiztaker';
    public static unknown = '**';
}

class QuizzerApi {
    public static base = 'http://localhost:3030'
    public static createUpdateQuiz = '/makequiz' //makequiz/:id;
    public static validate = '/validate' //makequiz/:id;
    public static quiz = '/quiz' //makequiz/:id;              
    public static takeQuiz = '/takequiz' //makequiz/:id;              
}
export { QuizzerApi }