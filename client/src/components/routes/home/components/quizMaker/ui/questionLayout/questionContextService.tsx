import { QuestionDataContextValue, questionModel } from '../../../../../../../shared/oop/models';
import React, { useState, createContext } from "react";
export const QuestionContext = createContext({});
export const QuestionDataContext = (props: any) => {
    const mcqObj: questionModel[] | any = []
    const [mcq, setMcq]: any = useState(mcqObj)
    const sMcq = (mcqObj: questionModel): void => setMcq([...mcq, mcqObj])
    const value: QuestionDataContextValue = { mcq: { set: sMcq, get: mcq } };
    return (
        <QuestionContext.Provider value={value}>
            {props.children}
        </QuestionContext.Provider>
    )
}