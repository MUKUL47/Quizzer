
import { QuestionContext } from '../questionContextService';
import { choice, validateQuestion, QuestionDataContextValue, questionModel } from '../../../../../../../../shared/datamodels/models';
import React, { useState, useEffect, useContext } from 'react';
import QuestionModelData from '../../../../../../../../shared/datamodels/questionModel';
import '../questionlayout.scss'
import {
    Button, AddIcon, Dialog, TextField, HelpIcon,
    CheckCircleIcon, CancelIcon, Tooltip
} from '../../../../../../../../shared/material-ui-modules';;
export default function Question(props: any) {
    const questionContext: QuestionDataContextValue | any = useContext(QuestionContext);
    const questionModelData = new QuestionModelData();
    const [form, setForm] = useState({ q: questionModelData });
    const returnData = (isClose?: boolean): void => {
        //what a mess :-3
        if (isClose) {
            if (form.q.isDataAvailable()) {
                if (window.confirm('Are you sure, all changes will be lost')) {
                    props.close();
                    setForm({ q: new QuestionModelData() })
                }
                return;
            }
            props.close();
            return;
        }
        if (!form.q.isDataAvailable() || !form.q.getId()) {
            setForm({ q: form.q.setId(new Date().valueOf()) })
        }
        props.close({ ...form.q });
        setForm({ q: new QuestionModelData() })
    }
    useEffect(() => {
        const ref: questionModel = questionContext.question.get;
        const initForm = new QuestionModelData(ref.question, ref.id, ref.choices, '');
        setForm({ q: initForm });
    }, [questionContext.question.get])
    return (
        <Dialog style={{ width: '100%' }} open={props.open}>
            <div className="question-dialog">
                <div className="mcq">Multiple Choice Question</div>
                <div className="cancel-icon"
                    onClick={e => returnData(true)}
                ><CancelIcon /></div>
                <div className="form-field main-question">
                    <TextField
                        id="standard-basic"
                        className="input-width-100"
                        placeholder="What is the capital of India ?"
                        label="Enter Question *"
                        onChange={e => setForm({ q: form.q.setQuestion(e.target.value) })}
                        value={form.q.getQuestion()}
                    />
                    <HelpIcon className="text-icon question-icon" />
                </div>
                <div className="choices">
                    {
                        form.q.getChoices().map((choice: choice, cI: number) => {
                            return (
                                <div className="tab" key={cI}>
                                    <div className={choice['correct'] ? 'form-field correct-tab-color' : 'form-field'}>
                                        {
                                            !choice.edit ?
                                                <div onDoubleClick={e => setForm({ q: form.q.enableEdit(cI) })}>
                                                    <span className="choice-index">
                                                        {cI + 1}.
                                                    </span>
                                                    <span className={choice.correct ? 'correct-text-bold' : ''}>
                                                        {choice.c}
                                                    </span>
                                                </div>
                                                :
                                                <input
                                                    value={choice['editedValue']}
                                                    className="choice-edit"
                                                    placeholder={choice['c']}
                                                    onKeyDown={e => setForm({ q: form.q.onEditChange(cI, '', true, e.keyCode === 13) })}
                                                    onChange={e => setForm({ q: form.q.onEditChange(cI, e.target.value) })}
                                                    onDoubleClick={e => setForm({ q: form.q.onEditChange(cI, '', true, true) })}
                                                />
                                        }
                                    </div>
                                    {
                                        !choice.edit ?
                                            <Tooltip title="Correct choice" placement="left" arrow>
                                                <CheckCircleIcon className="choice correct" onClick={e => setForm({ q: form.q.toggleCorrectChoice(cI) })} />
                                            </Tooltip> :
                                            null
                                    }
                                    <Tooltip title="Remove choice" placement="left" arrow>
                                        <CancelIcon className="choice cancel" onClick={e => setForm({ q: form.q.removeChoice(cI) })} />
                                    </Tooltip>
                                </div>
                            )
                        }
                        )
                    }
                </div>
                <div className={form.q.getChoices().length > 0 ? 'choices-tab-inp' : 'choices-tab-inp margin-top-10'}>
                    <div className="choice-text">
                        <div className="form-field">
                            <TextField
                                id="standard-basic"
                                className="input-width-100"
                                placeholder="Choice"
                                label="Enter Choice"
                                onChange={e => setForm({ q: form.q.setActiveChoice(e.target.value) })}
                                value={form.q.getActiveChoice()}
                                onKeyDown={e => setForm({ q: form.q.onChoiceEnter(e) })}
                            />
                        </div>
                    </div>

                </div>
                <div className="submit">
                    <div className="pos-relative">
                        <AddIcon className="add-icon-ques" />
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={!form.q.validateQuestionModel()}
                            onClick={e => returnData()}
                        >Add</Button>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}
