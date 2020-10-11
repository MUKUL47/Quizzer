import React from 'react';
import './questionlayout.scss'
import {
    Button, AddIcon
} from '../../../../../../../shared/material-ui-modules';
export default function QuestionLayout() {
    return (
        <div>
            <div className="header-name-struct">Form Questions</div>
            <div className="form-field no-question">No questions added</div>
            <div className="submit">
                <div className="pos-relative">
                    <AddIcon className="add-icon-ques" />
                    <Button variant="contained" color="primary">ADD</Button>
                </div>
            </div>
        </div>
    )
}