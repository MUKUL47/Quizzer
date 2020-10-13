import validator from 'validator';
export default class QuizStructure {
    private name: string = '';
    private quizTitle: string = '';
    private email: string = '';
    private subscribe: boolean = false;
    private duration: number;
    private quizStartTime: string;
    private quizEndTime: string;
    private validator: any = { quizStartTime: true, quizEndTime: true, duration: true };

    constructor(duration: number, quizStartTime: string, quizEndTime: string) {
        this.duration = duration;
        this.quizStartTime = quizStartTime;
        this.quizEndTime = quizEndTime;
    }

    public subscribeGS(isval?: boolean, value?: boolean | any): any {
        if (isval || value === '') {
            this.subscribe = value;
            this.validator['subscribe'] = this.subscribe;
            return this;
        }
        return this.subscribe;
    }

    public nameGS(value?: string | any): any {
        if (value || value === '') {
            this.name = value;
            this.validator['name'] = this.name.trim().length > 0;
            return this;
        }
        return this.name;
    }

    public quizTitleGS(value?: string | any): any {
        if (value || value === '') {
            this.quizTitle = value;
            this.validator['quizTitle'] = this.quizTitle.trim().length > 0;
            return this;
        }
        return this.quizTitle;
    }

    public emailGS(value?: string | any): any {
        if (value || value === '') {
            this.email = value;
            this.validator['email'] = validator.isEmail(this.email);
            return this;
        }
        return this.email;
    }

    public durationGS(value?: number | any): any {
        if (value || value === '') {
            this.duration = value;
            this.validator['duration'] = this.duration > 0;
            return this;
        }
        return this.duration;
    }

    public quizStartTimeGS(value?: string | any): any {
        if (value || value === '') {
            this.quizStartTime = value;
            return this;
        }
        return this.quizStartTime;
    }

    public quizEndTimeGS(value?: string | any): any {
        if (value || value === '') {
            this.quizEndTime = value;
            return this;
        }
        return this.quizEndTime;
    }

    public getForm() {
        return this;
    }

    public validateForm(): boolean {
        return this.validator['email'] &&
            this.validator['name'] &&
            this.validator['quizEndTime'] &&
            this.validator['quizStartTime'] &&
            this.validator['quizTitle'] &&
            this.validator['duration'] &&
            this.validator['subscribe'];
    }
}