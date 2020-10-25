
import React from 'react';
import { Dialog, Button } from './material-ui-modules';
import './components.scss'
function ToastPopupModal(props: any) {
    const { onclose, label, message, open } = props;
    return (
        <>
            <Dialog open={open}>
                <div className="ToastPopupModal-label">
                    {label}
                </div>
                <div className="ToastPopupModal">
                    <div className="ToastPopupModal-text">
                        {message}
                    </div>
                    <div className="ToastPopupModal-btn">
                        <Button onClick={() => onclose()}>OK</Button>
                    </div>
                </div>
            </Dialog>
        </>
    )
}
export { ToastPopupModal }