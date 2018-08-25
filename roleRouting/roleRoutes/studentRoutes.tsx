import * as React from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import KnowledgeBaseStudent from '../KnowledgeBase/KnowledgeBaseStudentPage';
import ScholarshipPage from '../scholarship/scholarshipPage';

interface IStudentRoleRoutes {
    children: any;
};

export const StudentRoleRoutes = (props) => {
    return (
        <Switch>
            <Route exact path="/student/faq" component={KnowledgeBaseStudent} />
            <Route path="/student" component={StudentLandingPage} />
            {props.children}
        </Switch>
    );
}

const StudentLandingPage = () => (
    <div>
        <h1>Student Landing Page</h1>
        <Link to="/student/faq" className="sidenav-link">Student FAQ</Link>
    </div>
);