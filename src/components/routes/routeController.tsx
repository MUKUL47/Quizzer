import React from 'react'
import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom";
import QuizzerRoutes from '../../shared/routes';
import Home from './home/home'
import QuizTaker from './home/quizTaker/quizTaker'
export default class RouteController extends React.Component {
    render() {
        let route =
            <Router>
                <Route exact path={QuizzerRoutes.home} component={() => <Home></Home>}></Route>
                {/* <Route exact path={QuizzerRoutes.quizMaker} component={MainPage}></Route> */}
                <Route exact path={QuizzerRoutes.quizTaker} component={QuizTaker}></Route>
            </Router>
        return (route);
    }
}