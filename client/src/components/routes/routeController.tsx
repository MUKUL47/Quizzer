import React from 'react'
import {
    BrowserRouter,
    Redirect,
    Route,
    Switch
} from "react-router-dom";
import QuizzerRoutes from '../../shared/routes';
import Home from './home/home'
import QuizTaker from './home/components/quizTaker/quizTaker'
import QuizMaker from './home/components/quizMaker/quizMaker'
export default class RouteController extends React.Component {
    render() {
        let route =
            <BrowserRouter>
                <Switch>
                    <Route exact path={QuizzerRoutes.home} component={Home}></Route>
                    <Route exact path={QuizzerRoutes.quizMaker} component={QuizMaker}></Route>
                    <Route exact path={`${QuizzerRoutes.quizMaker}/:id`} component={QuizMaker}></Route>
                    <Route exact path={`${QuizzerRoutes.quizTaker}/:id`} component={QuizTaker}></Route>
                    <Route path={QuizzerRoutes.unknown}><Redirect to="/" /></Route>
                </Switch>
            </BrowserRouter>
        return (route);
    }
}