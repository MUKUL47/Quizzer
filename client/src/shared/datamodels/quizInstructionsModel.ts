import validator from 'validator';
export default class QuizInstructionsModel {
    name: string;
    rollNumber: number | string;
    email: string = '';
    emailResults: boolean = false;
    //
    title: string;
    author: string;
    duration: string;
    quizStartsIn: string = '';
    quizEndsIn: string = '';
    constructor(name: string, rollNumber: number | string, title: string, author: string, duration: string) {
        this.name = name;
        this.rollNumber = rollNumber;
        //
        this.title = title;
        this.author = author;
        this.duration = duration;
    }
    //setters
    public setName(name: string) {
        this.name = name;
        return this;
    }
    public setRollNumber(rollNumber: string | number) {
        this.rollNumber = rollNumber;
        return this;
    }
    public setEmail(email: string) {
        this.email = email;
        return this;
    }
    public setEmailResults(emailResults: boolean) {
        this.emailResults = emailResults;
        return this;
    }

    //gettes
    public getName() {
        return this.name;
    }
    public getRollNumber() {
        return this.rollNumber;
    }
    public getEmail() {
        return this.email;
    }
    public getEmailResults() {
        return this.emailResults;
    }

    //misc
    public validate(): boolean {
        const def = this.name.trim().length > 0 && `${this.rollNumber}`.length > 3;
        return def && (this.emailResults ? validator.isEmail(this.email) : true);
    }

}