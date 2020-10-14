import { QuestionDataContextValue, questionModel } from '../../../../../../../shared/oop/models';
import React, { useState, createContext } from "react";
export const QuestionContext = createContext({});
export const QuestionDataContext = (props: any) => {
    const mcqObj: questionModel[] | any = []
    const questionObj: questionModel | any = {}
    const [mcq, setMcq]: any = useState(mcqObj)//questions tab
    const [question, setQuestion]: any = useState(questionObj)//question
    const sMcq = (mcqObj: questionModel): void => {
        const exist: number = mcq.findIndex((q: questionModel) => q.id === mcqObj.id);
        if (exist > -1) {
            updateMcq(mcqObj, exist)
            return
        }
        setMcq([...mcq, mcqObj])
    }
    const dMcq = (index: number): void => {
        const questionsClone: questionModel[] = mcq;
        questionsClone.splice(index, 1);
        setMcq([...questionsClone]);
    }
    const updateMcq = (mcqObj: questionModel, index: number): void => {
        const questionsClone: questionModel[] = mcq;
        questionsClone[index] = mcqObj;
        setMcq([...questionsClone]);
    }
    const reloadQuestion = (mcqObj: questionModel): void => setQuestion(mcqObj);
    const value: QuestionDataContextValue =
    {
        mcq:
        {
            set: sMcq,
            get: mcq,
            delete: dMcq,
            update: updateMcq
        },
        question:
        {
            get: question,
            reloadQuestion: reloadQuestion
        }
    };
    return (
        <QuestionContext.Provider value={value}>
            {props.children}
        </QuestionContext.Provider>
    )
}