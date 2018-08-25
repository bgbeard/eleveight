import * as React from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import LogsPage from "../logs/logsPage";
import RefTypeAdmin from '../refTypeAdmin';
import KnowledgeBaseAdmin from '../KnowledgeBase/KnowledgeBaseAdminPage';
import PricePlanUser from '../PricingPlans/PricePlanUser';
import PricePlanUserCheckout from '../PricingPlans/PricePlanUserCheckout';
import OrgGroupsPage from '../organizationGroups/orgGroupsPage';
import OrgMemRegPage from '../organization/OrgMemRegPage';
import UserManagementPage from '../userManagement/userManagementPage';
import { Component } from 'react-redux';
import { ComponentElement } from 'react';
import FormBuilderPage from '../formBuilder/formBuilderPage';
import AdminForm from '../formBuilder/AdminFormView';
import UploadCSVData from '../UploadCSVData/UploadCSVDataPage';
import Form from '../formBuilder/Form';
import PaymentPage from '../PricingPlans/PaymentPage';
import ContentFlagAdminPage from '../contentFlag/contentFlagAdminPage';
import OrgAssignPage from '../organization/OrgAssignPage';
import UserSubscriptionPage from '../subscriptionPlan/userSubscriptionPage';

import FormResults from '../formBuilder/FormResults';

import OrganizationInformationPage from '../organization/organizationInformation';




interface IAdminRoleRoutes {
    children?: any;
}

export const AdminRoleRoutes = (props) => {

    return (
        <Switch>
            {/* /account */}
            <Route exact path="/admin/account/pricingplans" component={PricePlanUser} />
            <Route exact path="/admin/account/checkout/:planId/:durationId" component={PricePlanUserCheckout} />
            <Route exact path="/admin/account/subscriptioninfo" component={UserSubscriptionPage} />
            <Route exact path="/admin/logs" component={LogsPage} />
            <Route exact path="/admin/refTypeAdmin" component={RefTypeAdmin} />
            <Route exact path="/admin/faq" component={KnowledgeBaseAdmin} />
            <Route exact path="/admin/formBuilder/:id" component={FormBuilderPage} />
            <Route exact path="/admin/csvMapper" component={UploadCSVData} />
            <Route exact path="/admin/forms/:id/:userId?" component={AdminForm} />
            <Route exact path="/admin/account/payment" component={PaymentPage} />
            <Route exact path="/admin/scholarships/results/:id" component={FormResults} />
            <Route exact path="/admin/assignscholarship" component={OrgAssignPage} />
            <Route exact path="/admin/contentflag" component={ContentFlagAdminPage} />
            <Route exact path="/admin/assignscholarship/:id?" component={OrgAssignPage} />
            <Route exact path="/admin/OrganizationInformation" component={OrganizationInformationPage} />
            <Route path="/admin" component={AdminLandingPage} />
            {props.children}
        </Switch>
    );
}

const AdminLandingPage = () => (
    <div>
        <h1>Admin Landing Page</h1>
        <Link to="/admin/csvMapper" className="sidenav-link">CSV Mapper</Link>
        <br />
        <Link to="/admin/account/pricingplans" className="sidenav-link">Pricing Plan User</Link>
        <br />
        <Link to="/admin/account/subscriptioninfo" className="sidenav-link">Current Subscription</Link>
        <br />
        <Link to="/admin/logs" className="sidenav-link">Logs</Link>
        <br />
        <Link to="/admin/contentflag" className="sidenav-link">Flagged Content</Link>
        <br />
    </div>
);