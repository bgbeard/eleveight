const db = require("../../dbController");


const post = (posting) => {
    let params = [];
    console.log(posting)
    db.buildParams(params, "FeedText", db.TYPES.NVarChar, posting.FeedText);
    db.buildParams(params, "FeedImgUrl", db.TYPES.NVarChar, posting.FeedImgUrl);
    db.buildParams(params, "FeedRepostId", db.TYPES.Int, posting.FeedRepostId);
    db.buildParams(params, "CreatedById", db.TYPES.Int, posting.CreatedById);
    db.buildParams(params, 'id', db.TYPES.Int, 0, true);

    return db.executeNonQuery("NewsFeedPost_Insert", params)
        .then(result => {
            console.log("call back result on the post", result)
            return result
        })
        .catch(err => console.log("error with insert", err));
}

const readAll = () => {
    return db.executeQuery("NewsFeedPost_SelectAll", null)
        .then(result => {
            console.log(result)
            return result
        })
        .catch(err => console.log("error with read all", err));
}

const getAllPublic = (userbaseId, offset) => {
    let params = [];
    db.buildParams(params, "Offset", db.TYPES.Int, offset);
    db.buildParams(params, "ProfileId", db.TYPES.Int, userbaseId);
    db.buildParams(params, "CurrentUserId", db.TYPES.Int, userbaseId);
    db.buildParams(params, "TotalPosts", db.TYPES.Int, null, true);

    return db.executeQuery("NewsFeedPost_SelectAllPublicPosts", params)
        .then(result => {
            console.log(result)
            return result
        })
        .catch(err => console.log("error with read all", err));
}

const getAllPrivate = (userbaseId, offset) => {
    let params = [];
    db.buildParams(params, "Offset", db.TYPES.Int, offset);
    db.buildParams(params, "UserId", db.TYPES.Int, userbaseId);
    db.buildParams(params, "TotalPosts", db.TYPES.Int, null, true);

    let result = {};

    sqlCallback = (reader, resultSet) => {
        if (resultSet == 0) {
            newsFeed = reader;
        }
        if (resultSet == 1) {
            reposts = reader;
        }
        if (resultSet == 2) {
            totalPosts = reader[0].totalPosts;
        }
    }
    return db.executeMultiQuery("dbo.NewsFeedPost_SelectAllPrivatePosts", params, sqlCallback)
        .then(res => {
            result.newsFeed = newsFeed;
            result.reposts = reposts;
            result.totalPosts = totalPosts;
            return result;
        })
        .catch(err => {
            return err;
        })

}

const readById = (id) => {
    let params = [];
    db.buildParams(params, 'id', db.TYPES.Int, id);

    return db.executeQuery("NewsFeedPost_SelectById", params)
        .then(result => {
            console.log(result)
            return result
        })
        .catch(err => console.log("error with read all", err));
}

const update = (id) => {
    let params = [];
    db.buildParams(params, "id", db.TYPES.Int, id.id);
    db.buildParams(params, "FeedText", db.TYPES.NVarChar, id.FeedText);
    db.buildParams(params, "FeedImgUrl", db.TYPES.NVarChar, id.FeedImgUrl);
    db.buildParams(params, "FeedRepostId", db.TYPES.Int, id.FeedRepostId);
    db.buildParams(params, 'ModifiedById', db.TYPES.Int, id.ModifiedById);

    return db.executeNonQuery("NewsFeedPost_Update", params)
        .then(result => {
            console.log(result)
            return result
        })
        .catch(err => console.log("error update", err));
}

const deleteById = (id) => {
    let params = [];
    db.buildParams(params, 'id', db.TYPES.Int, id);

    return db.executeNonQuery("NewsFeedPost_Delete", params)
        .then(result => {
            console.log(result)
            return result
        })
        .catch(err => console.log("error update", err));
}

module.exports = {
    post,
    readAll,
    getAllPublic,
    getAllPrivate,
    readById,
    update,
    deleteById
}