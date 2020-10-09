import React, { useState } from 'react';
import './homeRender.scss'
import createQuiz from '../../../../assets/images/create.jpg'
import takeTest from '../../../../assets/images/take_test.jpg'
import {
    TextField, Dialog, Button
    // , Popover,HelpIcon
} from '../../../../shared/material-ui-modules';
export default function HomeRender(props: any) {
    const [createQuizModal, setCreateQuizModal] = useState(false);
    const [takeQuizModal, setTakeQuizModal] = useState(false);
    const setModal: Function = (isCreate: boolean, value: boolean): void => {
        if (isCreate) {
            setCreateQuizModal(value);
            return;
        }
        setTakeQuizModal(value);
    }
    const render = (
        <div className="home-layout">
            <div className="quiz-maker qtm">
                <div className="content">
                    <div className="img-text">
                        <img src={createQuiz} alt="Create Quiz" className="home-images" />
                        <div onClick={e => setCreateQuizModal(true)}>Create or Modify Quiz</div>
                        {/* <HelpIcon className="HelpIcon" /> */}
                        {/* <HelpPopover
                            class="create"
                            message="Create a new quiz or modify existing one."
                            anchOrigin={{ vertical: 'center', horizontal: 'left' }}
                            tranOrigin={{ vertical: 'center', horizontal: 'left' }}
                            open={true}
                        /> */}
                    </div>
                </div>
            </div>
            <div className="quiz-taker qtm">
                <div className="content">
                    <div className="img-text">
                        <img src={takeTest} alt="Take Quiz" className="home-images" />
                        <div onClick={e => setTakeQuizModal(true)} >Take Quiz</div>
                        {/* <HelpIcon className="HelpIcon" /> */}
                    </div>
                </div>
            </div>
            <CreateOrModifyModal
                setModal={setModal}
                createQuizModal={createQuizModal}
                onSubmitModify={props.submitModify}
                onCreateNew={props.createNew}
            />
            <TakeQuiz
                setModal={setModal}
                takeQuizModal={takeQuizModal}
                onSubmitQuiz={props.submitQuiz}
            />
        </div>
    )
    return render;
}

// function HelpPopover(props: any) {
//     const anchorOrg = props.anchOrigin;
//     const transformOrigin = props.tranOrigin;
//     return <Popover
//         className={`help-popover ${props.class}`}
//         open={props.open}
//         anchorOrigin={{
//             vertical: anchorOrg.vertical,
//             horizontal: anchorOrg.horizontal,
//         }}
//         transformOrigin={{
//             vertical: transformOrigin.vertical,
//             horizontal: transformOrigin.horizontal
//         }}
//     >
//         <p>{props.message}</p>
//     </Popover>
// }

function CreateOrModifyModal(props: any) {
    const [quizId, setQuizId] = useState('');
    const closeModal = (): void => {
        props.setModal(1, false);
        setQuizId('');
    }
    const submitModify = (): void => {
        props.onSubmitModify(quizId);
        closeModal();
    }
    return <Dialog
        className="create-modal"
        open={props.createQuizModal}
        onClose={closeModal}
    >
        <div className="modal">
            <div className="modify">
                <p>Modify existing Quiz</p>
                <div className="flex">
                    <TextField
                        id="outlined-basic"
                        label="Quiz Id"
                        variant="outlined"
                        className="quiz-id-text"
                        onChange={(e) => setQuizId(e.target.value)}
                        value={quizId}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={submitModify}
                        disabled={quizId.trim().length === 0}
                    >
                        Modify
                    </Button>
                </div>
            </div>
            <p className="text-center or-text">OR</p>
            <Button
                variant="contained"
                color="primary"
                className="create-new"
                onClick={() => { props.onCreateNew(); props.setModal(1, false); }}
            >
                Create New
            </Button>
        </div>
    </Dialog>
}

function TakeQuiz(props: any) {
    const [quizId, setQuizId] = useState('');
    const submit = (): void => {
        props.onSubmitQuiz(quizId);
        setQuizId('');
        props.setModal(0, false);
    }
    return <Dialog
        className="create-modal"
        open={props.takeQuizModal}
        onClose={e => props.setModal(0, false)}
    >
        <div className="create">
            <p>Enter Quiz Id</p>
            <TextField
                id="outlined-basic"
                label="Quiz Id"
                variant="outlined"
                className="quiz-id-text"
                onChange={(e) => setQuizId(e.target.value)}
                value={quizId}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={submit}
                disabled={quizId.trim().length === 0}
            >
                Submit
            </Button>
        </div>
    </Dialog>
}