export default class Routes {
    public static makeQuiz = '/makequiz' //post, update NEW
    public static quiz = '/quiz/:id' // get quiz for student or teacher to ACTIVE
    public static takeQuiz = '/takequiz' //post student NEW
    public static validate = '/validate/:id' //post student NEW
}