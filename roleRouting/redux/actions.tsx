export const getUserData = (loginResponse) => ({
    type: "GET_USER_DATA",
    payload: { loginResponse }
});

export const setProfileImgSrc = (avatarUrl) => ({
    type: "SET_PROFILE_IMAGE_SRC",
    payload: { avatarUrl }
});

export const logoutUser = () => ({
    type: "LOGOUT_USER"
});

export const getNewNotif = (notificationResponse) => (
    {
        type: "GET_NEW_NOTIF",
        payload: { notificationResponse }
    })