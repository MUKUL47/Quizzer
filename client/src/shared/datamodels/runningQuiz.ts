import { runningQuizQuestions } from './models';
export default class RunningQuizData {
    private totalQuestions: number;
    private activeQuestion: number = 0;
    private skippedQuestions: number[] = [];
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
    public getSkippedQuestions(): number[] {
        return this.skippedQuestions;
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
        this.activeQuestion = activeQuestion;
        return this;
    }
    public setSkippedQuestions(index: number) {
        if (this.skippedQuestions.includes(index)) {
            return this;
        }
        this.skippedQuestions.push(index);
        return this;
    }
}