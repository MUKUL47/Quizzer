import { Backdrop, CircularProgress, Snackbar, CancelIcon } from '../shared/material-ui-modules';
import React from 'react';
import { apiLoader, toast } from '../shared/utils';
import RouteController from './routes/routeController';
import './main.scss';
export default class Main extends React.Component {
    state = {
        loading: false,
        apiSub: (window as any),
        toast: { type: 'error', message: '' },
        toastSub: (window as any)
    }

    componentDidMount() {
        console.log(this.state)
        const sub = apiLoader.subscribe({ next: (bool: boolean) => this.setState({ ...this.state, loading: bool }) });
        const toastSub = toast.subscribe({ next: (toastData: any) => this.setState({ ...this.state, toast: { message: toastData.message, type: toastData.type } }) });
        this.setState({ ...this.state, apiSub: sub, toastSub: toastSub });
    }
    componentWillUnmount() {
        if (this.state.apiSub) {
            this.state.apiSub.unsubscribe();
        }
        if (this.state.toastSub) {
            this.state.toastSub.unsubscribe();
        }
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
                <Backdrop open={this.state.loading} style={{ zIndex: 10 }}>
                    <CircularProgress style={{ color: '#fff' }} />
                </Backdrop>
                <RouteController></RouteController>
            </>
        )
    }
}