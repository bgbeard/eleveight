import * as React from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { NoMatch } from "../LoggedInUserRouter";
import ClientPage from '../client/ClientPage';
import CaseManagerPage from '../clients/caseManagerPage';
import UploadCSVData from '../UploadCSVData/UploadCSVDataPage';
import StudentImports from '../UploadCSVData/UploadCSVDataPage';
import SendSMSPage from '../Utilities/SendSMSPage';


interface ICaseManagerRoleRoutes {
    children?: any;
};

export const CaseManagerRoleRoutes = (props) => (
    <Switch>
        <Route exact path="/caseManager/clientPage" component={ClientPage} />
        <Route exact path="/caseManager/caseManagerPage/:id?" component={CaseManagerPage} />
        <Route exact path="/caseManager/csvMapper" component={UploadCSVData} />
        <Route exact path="/caseManager/studentImports" component={StudentImports} />
        <Route exact path="/casemanager/sendtextpage" component={SendSMSPage} />
        <Route path="/caseManager" component={CaseManagerLandingPage} />
        {props.children}
    </Switch>
);

const CaseManagerLandingPage = () => (
    <div>
        <h1>CM Landing Page</h1>
        <Link to="/caseManager/csvMapper" className="sidenav-link">CSV Mapper</Link>
        <Link to="/caseManager/studentImports" className="sidenav-link">Student Imports</Link>
        <br />
        <Link to="/caseManager/clientPage" className="sidenav-link">Clients</Link>
        <br />
        <Link to="/caseManager/caseManagerPage/:id?" className="sidenav-link">Casemanager Dashboard</Link>
        <br />
    </div>
);