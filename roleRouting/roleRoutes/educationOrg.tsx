import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import OrgGroupsPage from '../organizationGroups/orgGroupsPage';
import OrgMemRegPage from '../organization/OrgMemRegPage';
import OrganizationInformationPage from '../organization/OrganizationInformation';


interface IEduOrgRoleRoutes {
    children?: any;
};

export const EduOrgRoleRoutes = (props) => {

    return (
        <Switch>
            <Route exact path="/education/members/registration/:id?" component={OrgMemRegPage} />
            <Route exact path="/education/groups" component={OrgGroupsPage} />
            <Route path="/education" component={EduOrgLandingPage} />
            <Route exact path="/funding/OrganizationInformation" component={OrganizationInformationPage} />

            {props.children}
        </Switch>
    );
}

const EduOrgLandingPage = () => (
    <h1>Landing page for education orgs</h1>
);