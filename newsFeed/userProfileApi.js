import { ApiExecute } from "../common/apiExecute";

const addNewsFeedPost = (model) => {
    return ApiExecute(`/api/user/newsfeed/posts`, 'POST', model)
}

const getPrivateNewsFeed = (id, offset) => {
    return ApiExecute(`/api/user/newsfeed/posts/private/${id}/${offset}`, 'GET', '')
};

const getAllConnections = () => {
    return ApiExecute(`/api/user/connections/connected`, 'GET', '')
}

const addPostLike = (model) => {
    return ApiExecute(`/api/user/newsfeed/posts/likes`, 'POST', model)
}

const removePostLike = (postId, userId) => {
    return ApiExecute(`/api/user/newsfeed/posts/likes/${postId}/${userId}`, 'DELETE', '')
}

const getAllCommentsByPost = (postId, offset) => {
    return ApiExecute(`/api/user/newsfeed/comments/post/${postId}/${offset}`, 'GET', '')
}

export const userProfileApi = {
    addNewsFeedPost,
    getPrivateNewsFeed,
    getAllConnections,
    addPostLike,
    removePostLike,
    getAllCommentsByPost
}