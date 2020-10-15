export default class QuizInstructionsModel {
    private name: string;
    private rollNumber: number | string;
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

    //gettes
    public getName() {
        return this.name;
    }

    public getRollNumber() {
        return this.rollNumber;
    }

    //misc
    public validate(): boolean {
        return this.name.trim().length > 0 && `${this.rollNumber}`.length > 3
    }

}