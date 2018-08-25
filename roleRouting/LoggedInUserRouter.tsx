import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { RouteComponentProps } from "react-router"
import { connect } from "react-redux";
import { Layout } from '../components/common/layout/layout';
import { CaseManagerRoleRoutes } from "./roleRouter/caseManagerRoutes";
import { DirectorRoleRoutes } from "./roleRouter/directorRoutes";
import { AdminRoleRoutes } from "./roleRouter/adminRoutes";
import { FundingOrgRoleRoutes } from "./roleRouter/fundingOrgRoutes";
import { EduOrgRoleRoutes } from "./roleRouter/educationOrg";
import { SuperAdminRoleRoutes } from "./roleRouter/superAdminRoutes";
import { StudentRoleRoutes } from './roleRouter/studentRoutes';
import Form from './formBuilder/Form';
import ContactUsPage from './contactUs/ContactUsPage';
import TermsOfService from './Terms/TermsOfService';
import TermsOfServiceAdmin from './Terms/TermsAdmin/TermsOfServiceAdmin';
import UserProfilePage from './userProfile/userProfilePage';
import UserPersonalPage from './userProfile/personal/userPersonalPage';
import UserContactSocialPage from './userProfile/contact/userContactSocialPage';
import ChatPage from './chat/ChatPage';
import { ChatBox } from './chat/ChatBox';
import UserWorkExperience from './userProfile/workExperience/UserWorkExperience';
import UserWorkReference from './userProfile/workReference/UserWorkReference';
import UserProfileContact from './userProfile/contact/UserProfileContact';
import EducationLevelTypePage from './types/educationLevel/educationleveltypepage';
import UserEducationPage from './userEducation/userEducationPage';
import EventsPage from './events/Events';
import EventDetails from './events/EventDetails';
import { ChatWindow } from './signalr/chatWindow';
import ToDoList from './helloWorld/transitionDemo';
import UploadCSVData from './UploadCSVData/UploadCSVDataPage';
import OrgGroupsPage from './organizationGroups/orgGroupsPage';
import LogsPage from "./logs/logsPage";
import PrivacyPolicyPagePublic from './privacyPolicies/privacyPolicyPagePublic';
import PricePlanUser from './PricingPlans/PricePlanUser';
import PricePlanUserCheckout from './PricingPlans/PricePlanUserCheckout';
import OrgMemRegPage from './organization/OrgMemRegPage';
import SubscriptionRelation from './PricingPlansAdminView/SubscriptionRelation';
import UserConnectionsPendings from './settings/userConnectionsPendings';
import ChangePasswordPage from './settings/changePasswordPage'
import ScholarshipPage from './scholarship/scholarshipPage';
import ScholarshipDataFieldPage from './scholarship/scholarshipDataFieldPage';
import RefTypeAdmin from './refTypeAdmin';
import ScholarshipOutcomePage from './scholarshipOutcome/scholarshipOutcomePage';
import UserManagementPage from './userManagement/userManagementPage';
import KnowledgeBaseAdminPage from './KnowledgeBase/KnowledgeBaseAdminPage';
import KnowledgeBaseStudent from './KnowledgeBase/KnowledgeBaseStudentPage';
import UserDemPage from './userProfile/demographics/userDemographicPage';
import RegisteredOrganizationPage from './organization/RegisteredOrganizationPage';
import ClientPage from './client/ClientPage';
import Hello from './helloWorld/hello';
import UserFinancialAidPage from './clients/UserFinancialAidPage'
import SendSMSPage from './Utilities/SendSMSPage';
import { DragulaSample } from './helloWorld/dragulaSample';
import MilitaryPage from './clients/militaryPage';
import AccountSettingsPage from './userProfile/settings/AccountSettingsPage';
import SearchBarResultsPage from './searchBarResults/searchBarResultsPage';
import AboutUsPublicPage from './Utilities/AboutUsView';
import FileMapperDemo from './helloWorld/fileMapperDemo';
import ShowAllScholarshipsStatus from './formBuilder/ShowAllScholarshipsStatus';
import IssueLogForUsersPage from './Utilities/IssueLogForUsersPage';
import IssueRespondForUserPage from './Utilities/IssueRespondForUserPage';
import IssueLogForUsersViewSubmittedIssues from './Utilities/IssueLogForUsersViewSubmittedIssues';
import JobFormDisplay from './JobPostings/JobFormDisplayPage'
import EventsPublicPage from './Events/EventsPublicPage';

interface ILoggedInUserProps {
	user: any;
	history: any;
	notification: any;
};

export const NoMatch = ({ location }) => (
	<div style={{ width: "fit-content" }}>
		<div className="overflow-hidden">
			<div className="container d-flex align-items-stretch ui-mh-70vh p-0">
				<div className="row w-100">
					<div className="d-flex col-md justify-content-center align-items-center order-2 order-md-1 position-relative p-5">
						<div className="error-bg-skew bg-white"></div>

						<div className="text-md-left text-center">
							<h1 className="display-2 font-weight-bolder mb-4">Whoops...</h1>
							<div className="text-xlarge font-weight-light mb-5">We couldn't find the page<br /> you are looking for :(</div>
						</div>
					</div>

					<div className="d-flex col-md-5 justify-content-center align-items-center order-1 order-md-2 text-center p-5">
						<div>
							<div className="error-code font-weight-bolder mb-2" style={{ color: "lightskyblue", fontSize: "150px" }}>404</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>
);

const NoRouteMatch = () => (
	<Switch>
		<Route component={NoMatch} />
	</Switch>
);




export const LoggedInUser = (props: ILoggedInUserProps) => {
	return (
		<Layout user={props.user} history={props.history} notification={props.notification} >
			<main>
                <Switch>
					<Route exact path="/search/:query?" component={SearchBarResultsPage} />
					<Route exact path="/user/changepassword" component={ChangePasswordPage} />
					<Route exact path="/user/userconnectionspendings" component={UserConnectionsPendings} />
					<Route exact path="/user/forms/:id" component={Form} />
					<Route exact path="/user/home" component={UserPersonalPage} />
					<Route exact path="/user/termsofservice" component={TermsOfService} />
					<Route exact path="/user/privacypolicy" component={PrivacyPolicyPagePublic} />
					<Route exact path="/submitAnIssue" component={IssueLogForUsersPage} />

					{/* /user/settings */}
					<Route exact path="/user/settings/accountsettings" component={AccountSettingsPage} />
					<Route path="/issueRespondForUserPage/:id?" component={IssueRespondForUserPage} />


					<Route path="/viewAllSubmissionsFromUser" component={IssueLogForUsersViewSubmittedIssues} />

					{/* /user/social */}
					<Route exact path="/user/social/events" component={EventsPage} />
					<Route exact path="/user/social/events/:id?" component={EventDetails} />
					<Route exact path="/user/social/chat" component={ChatPage} />
					<Route exact path="/user/social/eventsPublic" component={EventsPublicPage} />

					{/* /user/social/profile */}
					<Route exact path="/user/social/profile/:id?/:hash?" component={UserProfilePage} />
					<Route exact path="/user/social/profile/workExperience" component={UserWorkExperience} />
					<Route exact path="/user/social/profile/workReferences" component={UserWorkReference} />
					<Route exact path="/user/social/profile/connections" component={UserProfileContact} />
					<Route exact path="/user/social/profile/Education" component={UserEducationPage} />
					<Route exact path="/user/social/profile/contactSocial" component={UserContactSocialPage} />
					<Route exact path="/user/social/profile/:id?" component={UserProfilePage} />

					{/* /public */}
					<Route exact path="/aboutus" component={AboutUsPublicPage} />
					<Route exact path="/privacyPolicyPublicPage" component={PrivacyPolicyPagePublic} />
					<Route exact path="/contactUs" component={ContactUsPage} />
					<Route exact path="/demo/import" component={FileMapperDemo} />
					{/* /public */}
					<Route exact path="/contactUs" component={ContactUsPage} />
					<Route exact path="/UserFinancialAid" component={UserFinancialAidPage} />
					<Route exact path="/jobform" component={JobFormDisplay} />

					{props.user.roles[0] == "Student" && <StudentRoleRoutes><NoRouteMatch /></StudentRoleRoutes>}
					{props.user.roles.join(",").includes("Funding") && <FundingOrgRoleRoutes><NoRouteMatch /></FundingOrgRoleRoutes>}
					{props.user.roles.join(",").includes("School") && <EduOrgRoleRoutes><NoRouteMatch /></EduOrgRoleRoutes>}
					{props.user.roles.join(",").includes("CaseManager") && <CaseManagerRoleRoutes><NoRouteMatch /></CaseManagerRoleRoutes>}
					{props.user.roles.join(",").includes("Director") &&
						<DirectorRoleRoutes>
							<CaseManagerRoleRoutes>
								<NoRouteMatch /></CaseManagerRoleRoutes></DirectorRoleRoutes>}
					{props.user.roles[0] == "Admin" &&
						<AdminRoleRoutes>
							<DirectorRoleRoutes>
								<CaseManagerRoleRoutes>
									<NoRouteMatch /></CaseManagerRoleRoutes></DirectorRoleRoutes></AdminRoleRoutes>}
					{props.user.roles[0] == "SuperAdmin" &&
						<SuperAdminRoleRoutes>
							<AdminRoleRoutes>
								<DirectorRoleRoutes>
									<CaseManagerRoleRoutes>
										<StudentRoleRoutes>
											<FundingOrgRoleRoutes>
												<EduOrgRoleRoutes>
													<NoRouteMatch /></EduOrgRoleRoutes></FundingOrgRoleRoutes></StudentRoleRoutes></CaseManagerRoleRoutes></DirectorRoleRoutes></AdminRoleRoutes></SuperAdminRoleRoutes>}
				</Switch>
			</main>
		</Layout>
	)
};