import validator from 'validator';
export default class QuizInstructionsModel {
    private name: string;
    private rollNumber: number | string;
    private email: string = '';
    private emailResults: boolean = false;
    constructor(name: string, rollNumber: number | string) {
        this.name = name;
        this.rollNumber = rollNumber;
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