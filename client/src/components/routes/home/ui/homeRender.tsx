import React from 'react';
import './homeRender.scss'
import createQuiz from '../../../../assets/images/create.jpg'
import takeTest from '../../../../assets/images/take_test.jpg'
import HelpIcon from '@material-ui/icons/Help';
export const HomeRender = () => {
    const render = (
        <div className="home-layout">
            <div className="quiz-maker qtm">
                <div className="content">
                    <div className="img-text">
                        <img src={createQuiz} alt="Create Quiz" className="home-images" />
                        <div >Prepare Quiz for students!</div>
                        <HelpIcon className="HelpIcon" />
                    </div>
                </div>
            </div>
            <div className="quiz-taker qtm">
                <div className="content">
                    <div className="img-text">
                        <img src={takeTest} alt="Take Quiz" className="home-images" />
                        <div>Take Quiz</div>
                        <HelpIcon className="HelpIcon" />
                    </div>
                </div>
            </div>
        </div>
    )

    return render;
}