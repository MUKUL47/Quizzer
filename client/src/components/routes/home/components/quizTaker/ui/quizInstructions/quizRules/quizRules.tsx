import React, { useState } from 'react';
import './quizRules.scss'
import { Dialog, Checkbox, Button, PlayArrowIcon, CancelIcon } from '../../../../../../../../shared/material-ui-modules';
export default function QuizRules(props: any) {
    const [tnc, setTnc] = useState(false);
    return (
        <Dialog open={props.open}>
            <div className="TnC">
                <p id='TnC'>Quiz Rules</p>
                <div className="tnc-points">
                    <ul>
                        <li>During quiz your screen will on full screen.</li>
                        <li>You can skip a question.</li>
                        <li>If full screen or tab is changed, you'll be disqualified.</li>
                    </ul>
                    <div>
                        <Checkbox color="primary" value={tnc} onChange={e => setTnc(!tnc)} />
                        <span> I agree</span>
                    </div>
                    <div className="inst-submit">
                        <Button
                            disabled={!tnc}
                            className={tnc ? '' : 'inst-dis'}
                            onClick={e => props.onApprove()}
                        >
                            Start
                        </Button>
                        <div className="start-quiz-icon">
                            <PlayArrowIcon />
                        </div>
                    </div>
                </div>
                <div className='close-tnc'>
                    <CancelIcon onClick={e => props.close()} />
                </div>
            </div>
        </Dialog>)
}