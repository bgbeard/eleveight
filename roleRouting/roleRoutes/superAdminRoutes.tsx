import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SubscriptionRelation from '../PricingPlansAdminView/subscriptionRelation';
import RegisteredOrganizationPage from '../organization/RegisteredOrganizationPage';
import Hello from '../helloWorld/hello';
import { DragulaSample } from '../helloWorld/dragulaSample';
import PricingPlansAdminPage from '../pricingPlansAdminView/pricingPlansAdminPage';
import DurationTypesAdminPage from '../pricingPlansAdminView/durationTypesAdminPage';
import RefTypeAdmin from '../refTypeAdmin';
import LogsPage from "../logs/logsPage";
import KnowledgeBaseAdmin from '../KnowledgeBase/KnowledgeBaseAdminPage';
import ContentFlagAdminPage from '../contentFlag/contentFlagAdminPage';
import PrivacyPolicyPage from '../privacyPolicies/privacyPolicyPage';
import AboutUsAdminPage from '../Utilities/AboutUsAdminPage';
import AppSettingsPage from '../superAdmin/appSettingsPage';
import IssueRespondPageForAdmin from '../Utilities/IssueRespondForAdminPage';
import IssueLogAdminPage from '../Utilities/IssueLogAdminPage';
import SubscriptionPage from '../pricingPlansAdminView/subscriptionPage';
import PageShell from '../PageShell';
import AllSubscriptionsAdminPage from '../pricingPlansAdminView/allSubscriptionsAdminPage';
import ActualsPage from '../pricingPlansAdminView/actualsPage';
import ForecastPage from '../pricingPlansAdminView/forecastPage';
import UserManagementPage from '../userManagement/userManagementPage';
import ForecastPg from '../pricingPlansAdminView/forecastPg';

interface ISuperAdminRoleRoutes {
    children?: any;
};

export const SuperAdminRoleRoutes = (props) => {
    return (
        <Switch>
            {//<Route exact path="/super/subscriptionpage" component={PageShell(PricingPlansAdminPage)} />
            }
            <Route exact path="/super/actuals" component={ActualsPage} />
            <Route exact path="/super/forecasts" component={ForecastPg} />
            <Route exact path="/super/registeredOrganizations" component={RegisteredOrganizationPage} />
            <Route exact path="/super/subscriptionlengths" component={DurationTypesAdminPage} />
            <Route exact path="/super/subscriptiondiscounts" component={SubscriptionRelation} />
            <Route exact path="/super/subscriptions" component={PricingPlansAdminPage} />
            <Route exact path="/super/refTypeAdmin" component={RefTypeAdmin} />
            <Route exact path="/super/logs" component={LogsPage} />
            <Route exact path="/super/faq" component={KnowledgeBaseAdmin} />
            <Route exact path="/super/contentflag" component={ContentFlagAdminPage} />
            <Route exact path="/super/privacyPolicy" component={PrivacyPolicyPage} />
            <Route exact path="/super/aboutus" component={AboutUsAdminPage} />
            <Route exact path="/super/usermanagement" component={UserManagementPage} />
            <Route path="/super/subscriptions" component={PricingPlansAdminPage} />
            <Route path="/super/activesubscriptions" component={AllSubscriptionsAdminPage} />


            <Route exact path="/super/usermanagement" component={UserManagementPage} />
            <Route exact path="/dev/hello" component={Hello} />
            <Route exact path="/dev/dragula" component={DragulaSample} />
            <Route exact path="/super/appSettings" component={AppSettingsPage} />
            <Route path="/super/subscriptions" component={PricingPlansAdminPage} />
            <Route path="/super/issueLogsForAdmin" component={IssueLogAdminPage} />
            <Route path="/super/issueLogResponse/:id?/:id?" component={IssueRespondPageForAdmin} />


            {props.children}
        </Switch>
    );
}