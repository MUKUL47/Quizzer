export default class Routes {
    public static makeQuiz = '/makequiz' //post, update NEW
    public static quiz = '/quiz/:id' // get quiz for student or teacher to ACTIVE
    public static validate = '/validate/:id' //post student NEW
    public static takeQuiz = '/takequiz/:id/:rollno' //post student NEW
    public static updateQuiz = '/makequiz/:id' //post student NEW
    //
    public static registerQuiz = '/reqisterquiz/:id/:rollno'
    public static submitQuiz = '/submitquiz/:id/:rollno'
}