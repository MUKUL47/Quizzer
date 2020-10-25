import { Backdrop, CircularProgress, Snackbar, CancelIcon } from '../shared/material-ui-modules';
import React from 'react';
import { apiLoader, toast, toastPopup } from '../shared/utils';
import RouteController from './routes/routeController';
import './main.scss';
import { ToastPopupModal } from '../shared/components';
export default class Main extends React.Component {
    state = {
        loading: false,
        apiSub: (null as any),
        toast: { type: 'error', message: '' },
        toastSub: (null as any),
        toastPopup: {
            open: false,
            sub: (null as any),
            message: ('' as any),
            label: ('' as any)
        }
    }

    componentDidMount() {
        const sub = apiLoader.subscribe({ next: (bool: boolean) => this.setState({ loading: bool }) });
        const toastSub = toast.subscribe({ next: (toastData: any) => this.setState({ toast: { message: toastData.message, type: toastData.type } }) });
        const toastPopupSub = toastPopup.subscribe({ next: (msg: any) => this.setState({ toastPopup: { ...this.state.toastPopup, message: msg.message, label: msg.label, open: true } }) })
        this.setState({ apiSub: sub, toastSub: toastSub, toastPopup: { ...this.state.toastPopup, sub: toastPopupSub } });
    }
    componentWillUnmount() {
        if (this.state.apiSub) {
            this.state.apiSub.unsubscribe();
        }
        if (this.state.toastSub) {
            this.state.toastSub.unsubscribe();
        }
        if (this.state.toastPopup.sub) {
            this.state.toastPopup.sub.unsubscribe();
        }
    }
    onToastClose() {
        this.setState({ toastPopup: { ...this.state.toastPopup, open: false } })
    }
    render() {
        return (
            <>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={this.state.toast.message.length > 0}
                    autoHideDuration={6000}
                    onClose={e => this.setState({ ...this.state, toast: { message: '', type: '' } })}
                >
                    <div className={`snack-message ${this.state.toast.type === 'error' ? 'snack-m-error' : 'snack-m-success'}`}>
                        <div className="snack-m">{this.state.toast.message}</div>
                        <CancelIcon className="cancel-snack" onClick={e => this.setState({ ...this.state, toast: { message: '', type: '' } })} />
                    </div>
                </Snackbar>
                <Backdrop open={this.state.loading} style={{ zIndex: 100 }}>
                    <CircularProgress style={{ color: '#fff' }} />
                </Backdrop>
                <ToastPopupModal
                    open={this.state.toastPopup.open}
                    onclose={this.onToastClose.bind(this)}
                    label={this.state.toastPopup.label}
                    message={this.state.toastPopup.message}
                ></ToastPopupModal>
                <RouteController></RouteController>
            </>
        )
    }
}