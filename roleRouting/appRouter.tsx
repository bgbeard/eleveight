import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginPageRedux from './login/LoginPage';
import RegisterPage from './register/RegisterPage';
import { LoggedInUser, NoMatch } from './LoggedInUserRouter';
import EmailConfirmedPage from './Register/EmailConfirmedPage';
import ForgotPasswordPage from './forgotPassword/forgotPasswordPage';
import ResetPasswordPage from './forgotPassword/resetPasswordPage';
import LogsPage from "./logs/logsPage";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import apiExecute from "../components/common/apiExecute";
import { getUserData, getNewNotif } from "../redux/actions";
import { RouteComponentProps } from "react-router";
import TermsOfService from './Terms/TermsOfService';
import PrivacyPolicyPagePublic from './privacyPolicies/privacyPolicyPagePublic';
import renewSubscription from './subscriptionPlan/renewSubscription';
import { ButtonSamplePage } from "./common/form/buttons/buttonSample";

//const NoMatch: React.StatelessComponent<{ location }> = ({ location }) => (
//    <div>No URL matching {location.pathname}</div>
//);

interface IAppRouter extends RouteComponentProps<{}> {
	user: any;
	getUserData: (loginResponse) => void;
	history: any;
	notification: any;
	getNewNotif: (notificationResponse) => void;
};

class AppRouter extends React.Component<IAppRouter> {
	componentDidMount() {
		apiExecute("/api/common/logins", "GET", null)
			.then(response => {
				if (response.item.id != 0) {
					this.props.getUserData(response.item);
					apiExecute(`/api/notifications/${this.props.user.profileId}`, "GET", null)
						.then(response => {
							this.props.getNewNotif(response.item);
						})
						.catch(error => console.log(error))
				}
			})
			.catch(error => {
				console.log("AppRouter err")
				console.log(error);
				this.props.history.push("/");
			})


	}

	render() {
		return (
			<React.Fragment>
				<Switch>
					<Route exact path="/" component={LoginPageRedux} />
					<Route path="/register" component={RegisterPage} />
					<Route path='/emailconfirmed/:id?' component={EmailConfirmedPage} />
					<Route path="/forgotpassword" component={ForgotPasswordPage} />
					<Route path="/resetpassword/:GUID" component={ResetPasswordPage} />
					<Route path="/termsofservice" component={TermsOfService} />
					<Route path="/renewsubscription/:GUID" component={renewSubscription} />
					<Route path="/privacypolicy" component={PrivacyPolicyPagePublic} />
					<Route path="/buttonsample" component={ButtonSamplePage} />
					{(this.props.user.id != 0) && <LoggedInUser user={this.props.user} history={this.props.history} notification={this.props.notification}
					//PAGES FOR LOGGED IN USERS WITH NAVBAR AND MENU
					/>}
				</Switch>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => ({
	user: state.user,
	notification: state.notification
});

const mapDispatchToProps = dispatch => ({
	getUserData: (loginResponse) => { dispatch(getUserData(loginResponse)) },
	getNewNotif: (notificationResponse) => { dispatch(getNewNotif(notificationResponse)) }
});

const AppRouterRedux = withRouter(connect(mapStateToProps, mapDispatchToProps)(AppRouter));

export default AppRouterRedux;