import * as React from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import ScholarshipDataFieldPage from '../scholarship/scholarshipDataFieldPage';
import ScholarshipOutcomePage from '../scholarshipOutcome/scholarshipOutcomePage';
import ScholarshipPage from '../scholarship/scholarshipPage';
import FormResults from '../formBuilder/FormResults';
import ScholarshipChartPage from '../scholarshipChart/scholarshipChartPage';
import OrgAssignPage from '../organization/OrgAssignPage';
import OrgMemRegPage from '../organization/OrgMemRegPage';
import FormBuilderPage from '../formBuilder/formBuilderPage';
import AdminForm from '../formBuilder/AdminFormView';

import FundingOrgPage from '../organization/FundingOrgDashboard';
import OrganizationInformationPage from '../organization/organizationInformation';
import OrgGroupsPage from '../organizationGroups/orgGroupsPage';

interface IFundingOrgRoleRoutes {
    children?: any;
};

export const FundingOrgRoleRoutes = (props) => {

    return (
        <Switch>
            <Route exact path="/funding/groups" component={OrgGroupsPage} />
            <Route exact path="/funding/scholarships/DataField" component={ScholarshipDataFieldPage} />
            <Route exact path="/funding/scholarships/outcomes/:id?" component={ScholarshipOutcomePage} />
            <Route exact path="/funding/scholarships/charts/:id?" component={ScholarshipChartPage} />
            <Route exact path="/funding/scholarships/results/:id" component={FormResults} />
            <Route exact path="/funding/scholarships" component={ScholarshipPage} />
            <Route exact path="/funding/fundingdashboard" component={FundingOrgPage} />
            <Route exact path="/funding/assignscholarship" component={OrgAssignPage} />
            <Route exact path="/funding/members/registration/:id?" component={OrgMemRegPage} />
            <Route exact path="/funding/OrganizationInformation" component={OrganizationInformationPage} />
            <Route exact path="/funding/formBuilder/:id" component={FormBuilderPage} />
            <Route exact path="/funding/forms/:id/:userId?" component={AdminForm} />

            <Route path="/funding" component={FundingOrgLandingPage} />
            {props.children}
        </Switch>
    );
}

const FundingOrgLandingPage = () => (
    <div>
        <h1>Funding Landing Page</h1>
        <Link to="/funding/scholarships" className="sidenav-link">Main Scholarship Page</Link>
        <br />
        <Link to="/funding/scholarships/DataField" className="sidenav-link">Scholarship Data Field</Link>
        <br />
    </div>
);