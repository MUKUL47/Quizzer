import React, { useState } from 'react';
import './questionlayout.scss'
import {
    Button, AddIcon, Dialog, TextField, InputAdornment, HelpIcon,
    CheckCircleIcon, CancelIcon, Tooltip
} from '../../../../../../../shared/material-ui-modules';
export default function QuestionLayout() {
    return (
        <div>
            <div className="header-name-struct">Form Questions</div>
            <div className="form-field no-question">No questions added</div>
            <div className="submit">
                <div className="pos-relative">
                    <AddIcon className="add-icon-ques" />
                    <Button variant="contained" color="primary">Add Question</Button>
                </div>
            </div>
            <Question />
        </div>
    )
}

function Question() {
    const [question, setQuestion] = useState('');
    const [choices, setChoices] = useState([]);
    const [choice, setChoice] = useState('');
    const onChoiceEnter = (e: any): void => {
        if (e.keyCode !== 13 || e.keyCode === 13 && choice.trim().length === 0) return;
        if (choices.find(c => c['c'] === choice.trim())) return;
        let prevChoices: any | any[] = [...choices];
        prevChoices.push({ c: choice.trim(), correct: false, edit: false, editedValue: choice.trim() });
        setChoices(prevChoices);
        setChoice('');
        let doc: any = document;
        setTimeout(() => {
            doc.querySelector('.choices').scrollTop = doc.querySelector('.choices').scrollHeight
        }, 100)
    }
    const deleteChoice = (index: number): void => {
        const prevChoices: any | any[] = [...choices];
        prevChoices.splice(index, 1);
        setChoices(prevChoices);
    }
    const correctChoice = (index: number): void => {
        const prevChoices: any | any[] = [...choices];
        prevChoices.forEach((p: { correct: boolean }, i: number) => {
            p['correct'] = false;
            p['correct'] = i === index;
        })
        setChoices(prevChoices);
    }
    const onEditChange = (index: number, value: string, isSubmit?: boolean, isEnter?: boolean): void => {
        if (isSubmit && !isEnter) return;
        const prevChoices: any | any[] = [...choices];
        let prevC = prevChoices[index];
        if (!isSubmit) {
            prevC['editedValue'] = value;
        } else {
            prevC['c'] = prevC['editedValue'].trim().length > 0 ? prevC['editedValue'].trim() : prevC['c'];
            prevC['edit'] = false;
        }
        setChoices(prevChoices);
    }

    const onEnableEdit = (index: number): void => {
        const prevChoices: any | any[] = [...choices];
        prevChoices[index]['edit'] = true;
        setChoices(prevChoices);
    }
    return (
        <Dialog style={{ width: '100%' }} open={true}>
            <div className="question-dialog">
                <div className="form-field main-question">
                    <TextField
                        id="standard-basic"
                        className="input-width-100"
                        placeholder="What is the capital of India ?"
                        label="Enter Question"
                        value={question}
                        onChange={e => setQuestion(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                < InputAdornment position="start" >
                                    <HelpIcon className="text-icon question-icon" />
                                </InputAdornment>
                            )
                        }}
                    />
                </div>
                <div className="choices">
                    {
                        choices.map((choice, cI) => {
                            return (
                                <div className="tab" key={cI}>
                                    <div className={choice['correct'] ? 'form-field correct-tab-color' : 'form-field'}>
                                        {
                                            !choice['edit'] ?
                                                <div onDoubleClick={e => onEnableEdit(cI)}>
                                                    <span className="choice-index">
                                                        {cI + 1}.
                                                    </span>
                                                    <span className={choice['correct'] ? 'correct-text-bold' : ''}>
                                                        {` ${choice['c']}`}
                                                    </span>
                                                </div>
                                                :
                                                <input
                                                    value={choice['editedValue']}
                                                    className="choice-edit"
                                                    placeholder={choice['c']}
                                                    onKeyDown={e => onEditChange(cI, '', true, e.keyCode === 13)}
                                                    onChange={e => onEditChange(cI, e.target.value)}
                                                    onDoubleClick={e => onEditChange(cI, '', true, true)}
                                                />
                                        }
                                    </div>
                                    {
                                        !choice['edit'] ?
                                            <Tooltip title="Correct choice" placement="left" arrow>
                                                <CheckCircleIcon className="choice correct" onClick={e => correctChoice(cI)} />
                                            </Tooltip> :
                                            null
                                    }
                                    <Tooltip title="Remove choice" placement="left" arrow>
                                        <CancelIcon className="choice cancel" onClick={e => deleteChoice(cI)} />
                                    </Tooltip>
                                </div>
                            )
                        }
                        )
                    }
                </div>
                <div className={choices.length > 0 ? 'choices-tab-inp' : 'choices-tab-inp margin-top-10'}>
                    <div className="choice-text">
                        <div className="form-field">
                            <TextField
                                id="standard-basic"
                                className="input-width-100"
                                placeholder="Choice"
                                label="Enter Choice"
                                onChange={e => setChoice(e.target.value)}
                                value={choice}
                                onKeyDown={onChoiceEnter}
                            />
                        </div>
                    </div>

                </div>
                <div className="submit">
                    <div className="pos-relative">
                        <AddIcon className="add-icon-ques" />
                        <Button variant="contained" color="primary" disabled={true}>Add</Button>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}