import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import OrgGroupsPage from '../organizationGroups/orgGroupsPage';
import OrgMemRegPage from '../organization/OrgMemRegPage';
import UserManagementPage from '../userManagement/userManagementPage';

interface IDirectorRoleRoutes {
    children?: any;
};

export const DirectorRoleRoutes = (props) => {

    return (
        <Switch>
            <Route exact path="/org/groups/:id?" component={OrgGroupsPage} />
            <Route exact path="/org/members/registration/:id?" component={OrgMemRegPage} />
            <Route exact path="/org/members/management" component={UserManagementPage} />
            <Route path="/org" component={DirectorLandingPage} />
            {props.children}
        </Switch>
    );
}

const DirectorLandingPage = () => (
    <h1>Director Landing Page</h1>
);