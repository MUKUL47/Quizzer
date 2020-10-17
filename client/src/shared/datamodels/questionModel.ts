import { choice } from './models';
export default class QuestionModelData {
    private question: string = '';
    public id: number | null = null;
    private choices: choice[] = [];
    private activeChoice: string = '';

    constructor(question?: string | any, id?: number | null | any, choices?: choice[] | any, activeChoice?: String | any) {
        this.question = question || '';
        this.id = id || null;
        this.choices = choices || [];
        this.activeChoice = activeChoice || '';
    }

    public setQuestion(question: string) {
        this.question = question;
        return this;
    }

    public addChoice(choice: choice) {
        if (this.choices.findIndex((c: choice) => c.c === choice.c) > -1) return this;
        this.choices.push(choice);
        return this;
    }

    public removeChoice(index: number) {
        this.choices.splice(index, 1);
        return this;
    }

    public toggleCorrectChoice(index: number) {
        this.choices[index].correct = !this.choices[index].correct;
        return this;
    }

    public onEditChange(index: number, value: string, isSubmit?: boolean, isEnter?: boolean) {
        if (isSubmit && !isEnter) return this;
        let prevC = this.choices[index];
        if (!isSubmit) {
            prevC.editedValue = value;
        } else {
            prevC.c = prevC.editedValue && prevC.editedValue.trim().length > 0 ? prevC.editedValue.trim() : prevC.c;
            prevC.edit = false;
        }
        return this;
    }

    public enableEdit(index: number) {
        this.choices[index].edit = true;
        return this;
    }

    public setActiveChoice(choice: string) {
        this.activeChoice = choice;
        return this;
    }

    public setId(id: number | null) {
        this.id = id;
        return this;
    }

    public onChoiceEnter(e: any) {
        const cChoice = this.activeChoice.trim();
        if (e.keyCode !== 13 || (e.keyCode === 13 && cChoice.length === 0) || this.choices.find(c => c['c'] === cChoice)) return this;
        this.choices.push({ c: cChoice, correct: false, edit: false, editedValue: cChoice });
        this.activeChoice = ''
        let doc: any = document;
        setTimeout(() => doc.querySelector('.choices').scrollTop = doc.querySelector('.choices').scrollHeight, 100)
        return this;
    }

    //getters
    public getActiveChoice(): string {
        return this.activeChoice;
    }

    public getQuestion(): string {
        return this.question;
    }

    public getChoices(): choice[] {
        return this.choices;
    }

    public getId(): number | null {
        return this.id;
    }

    public validateQuestionModel() {
        return this.question.trim().length > 2 &&
            this.choices.length > 1 &&
            this.choices.find((c: choice) => c.correct === true);
    }

    public isDataAvailable() {
        return this.question.trim().length > 2 ||
            this.choices.length > 0 ||
            this.choices.find((c: choice) => c.correct === true);
    }

}