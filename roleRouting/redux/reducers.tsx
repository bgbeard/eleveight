import { combineReducers } from "redux";

const initNotifState = {
    notifForIssue: 0,
    notifForIssueForAdmin: 0
};

const notification = (state = initNotifState, action) => {

    const { payload } = action;
    switch (action.type) {
        case "GET_NEW_NOTIF": // actions are just javascript objects
            //   let notificationResponse = payload.notificationResponse;
            return {
                ...this.state,
                notifForIssue: payload.notificationResponse.notifForIssue,
                notifForIssueForAdmin: payload.notificationResponse.notifForIssueForAdmin

            };
        default:
            return state;
    }
}

const initUserState = {
    id: 0,
    email: "",
    firstName: "",
    lastName: "",
    profileId: 0,
    roles: [],
    roleRoutes: [],
    avatarUrl: "",
    orgId: 0
};

const user = (state = initUserState, action) => {
    // allows me to type payload instead of action.payload
    const { payload } = action;
    switch (action.type) {
        case "GET_USER_DATA":
            let loginResponse = payload.loginResponse;
            return {
                id: loginResponse.id,
                email: loginResponse.email,
                firstName: loginResponse.firstName,
                lastName: loginResponse.lastName,
                profileId: loginResponse.profileId,
                roles: loginResponse.roles,
                roleRoutes: loginResponse.roleRoutes,
                avatarUrl: loginResponse.avatarUrl,
                orgId: loginResponse.orgId
            };

        case "SET_PROFILE_IMAGE_SRC":
            return { profileImgSrc: payload.profileImgSrc };

        case "LOGOUT_USER":
            return { userBaseId: 0, role: "", notifications: 0 };

        default:
            return state;
    }
}

export const reducers = combineReducers({ user, notification });