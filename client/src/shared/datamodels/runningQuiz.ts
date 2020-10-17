import { runningQuizQuestions } from './models';
export default class RunningQuizData {
    private totalQuestions: number;
    private activeQuestion: number = 0;
    private flaggedQuestion: number[] = [3, 4, 5, 6, 7, 12, 22, 11];
    private questions: runningQuizQuestions[];

    constructor(questions: runningQuizQuestions[]) {
        this.questions = questions;
        this.totalQuestions = this.questions.length;
    }

    //getters
    public getTotalQuestions(): number {
        return this.totalQuestions;
    }
    public getQuestions(): runningQuizQuestions[] {
        return this.questions;
    }
    public getActiveQuestion(): number {
        return this.activeQuestion;
    }
    public getflaggedQuestion(): number[] {
        return this.flaggedQuestion;
    }
    public checkIfQuestionAttempt(questionIdx: number) {
        return this.questions[questionIdx].choices.find((v) => v.selected === true) ? true : false;
    }
    public getTotalAttempt(): number {
        return this.questions.filter(question => question.choices.find(choice => choice.selected === true)).length;
    }

    //setters

    public setTotalQuestions(number: number) {
        this.totalQuestions = number;
        return this;
    }
    public setQuestions(questions: runningQuizQuestions[]) {
        this.questions = questions;
        return this;
    }
    public setActiveQuestion(activeQuestion: number) {
        if (!this.questions[activeQuestion]) return this;
        this.activeQuestion = activeQuestion;
        return this;
    }
    public setflaggedQuestion(index: number) {
        if (this.flaggedQuestion.includes(index)) {
            const idx = this.flaggedQuestion.findIndex(i => i === index);
            this.flaggedQuestion.splice(idx, 1)
            return this;
        }
        this.flaggedQuestion.push(index)
        return this;
    }
    public toggleQuestionChoice(choiceIndex: number) {
        this.questions[this.activeQuestion].choices[choiceIndex].selected = !this.questions[this.activeQuestion].choices[choiceIndex].selected;
        return this;

    }
}