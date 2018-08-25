import * as React from 'react';
import { NewsFeedPostForm } from "./newsFeedPostForm";
import { View, ScrollView, Button, Text } from "react-native";
import { userProfileApi } from "./userProfileApi";
import { connect } from "react-redux";
import { PostBody } from "./newsFeedPost";
import { PostComment } from "./newsfeedComment";

const mapStateToProps = (state) => ({
    userId: state.auth.user.Id
});

class NewsFeed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            personalNewsFeed: [],
            personalFeedReposts: [],
            postsDisplayCount: 0,
            totalPosts: 0,
            commentsPosts: {},
            currentUser: this.props.userId,
            newsFeedPost: {
                id: 0,
                feedText: "",
                feedImgUrl: "",
                feedRepostId: 0,
                createdById: 0,
                createdDate: new Date(),
                modifiedById: 0,
                modifiedDate: new Date()
            }
        }
    }

    componentDidMount() {
        this.resetFeed();
    }

    getFeed = () => {
        let id = this.props.userId;
        let count = this.state.postsDisplayCount;
        userProfileApi.getPrivateNewsFeed(id, count)
            .then(response => {
                let newsfeed = this.state.personalNewsFeed.concat(response.items.newsFeed);
                let reposts = this.state.personalFeedReposts.concat(response.items.reposts);
                let count = this.state.postsDisplayCount + response.items.newsFeed.length + response.items.reposts.length;
                this.setState({ personalNewsFeed: newsfeed, personalFeedReposts: reposts, postsDisplayCount: count, totalPosts: response.items.totalPosts });
            })
            .catch(err => console.log('could not load your feed', err));
    }

    resetFeed = () => {
        this.setState({ personalNewsFeed: [], personalFeedReposts: [], postsDisplayCount: 0 }, () => {
            this.getFeed();
        });
    }

    onPostSubmit = () => {
        userProfileApi.addNewsFeedPost(this.state.newsFeedPost)
            .then(response => {
                let resetPost = { ...this.state.newsFeedPost, feedText: "", feedImgUrl: "", feedRepostId: 0 };
                this.setState({ newsFeedPost: resetPost }, () => {
                    this.resetFeed();
                });
            })
            .catch(err => console.log("Something went wrong... Could not upload post.", err));
    }

    onChangePost = (postText) => {
        let nextState = {
            ...this.state,
            newsFeedPost: {
                ...this.state.newsFeedPost,
                feedText: postText
            }
        };
        this.setState(nextState);
    }

    onLikePost = (postId, index) => {
        let posts = [...this.state.personalNewsFeed];
        posts[index].likesCount += 1;
        posts[index].didUserLike = true;
        userProfileApi.addPostLike({ PostId: postId, LikedById: this.props.userId })
            .then(response => this.setState({ personalNewsFeed: posts }))
            .catch(err => console.log("could not like post"));
    }

    onUnlikePost = (postId, index) => {
        let posts = [...this.state.personalNewsFeed];
        posts[index].likesCount -= 1;
        posts[index].didUserLike = false;
        userProfileApi.removePostLike(postId, this.props.userId)
            .then(response => this.setState({ personalNewsFeed: posts }))
            .catch(err => console.log("could not unlike post"));
    }

    onUploadComplete = (url) => {
        this.setState({
            newsFeedPost: {
                ...this.state.newsFeedPost,
                feedImgUrl: url
            }
        })
    }

    getCommentsByPost = (postId) => {
        let postComments = { ...this.state.commentsPosts }, offset = 0;
        if (postComments[postId])
            offset = postComments[postId].cmtDisplayCount;
        userProfileApi.getAllCommentsByPost(postId, offset)
            .then(response => {
                let newPostCmts = {};
                if (offset === 0)
                    newPostCmts = this.insertCmtsItem(response, postId);
                else
                    newPostCmts = this.updateCmtsItem(response, postId);
                this.setState({ commentsPosts: newPostCmts });
            })
            .catch(err => console.log(err));
    }

    onPressComment = (postId) => {
        let postComments = { ...this.state.commentsPosts };
        if (!postComments[postId]) {
            this.getCommentsByPost(postId);
        }
        else {
            if (postComments[postId].showCmts) {
                postComments[postId].showCmts = false;
                this.setState({ commentsPosts: postComments });
            } else {
                postComments[postId].showCmts = true;
                this.setState({ commentsPosts: postComments });
            }
        }
    }

    insertCmtsItem = (data, postId) => {
        let cmts = { ...this.state.commentsPosts };
        let item = {
            [postId]: {
                comments: [].concat(data.items.comments),
                cmtDisplayCount: data.items.comments.length,
                totalCmts: data.items.totalComments,
                cmtField: "",
                showCmts: true
            }
        }
        return Object.assign(cmts, item);
    }

    updateCmtsItem = (data, postId) => {
        let cmts = { ...this.state.commentsPosts };
        cmts[postId] = {
            ...cmts[postId],
            comments: cmts[postId].comments.concat(data.items.comments),
            cmtDisplayCount: cmts[postId].cmtDisplayCount + data.items.comments.length,
            totalCmts: data.items.totalComments
        }
        return cmts;
    }

    onLoadMoreCmts = (postId) => this.getCommentsByPost(postId);


    render() {
        return (
            <View>
                <ScrollView>
                    <NewsFeedPostForm
                        newsFeedPost={this.state.newsFeedPost}
                        onChangePost={this.onChangePost}
                        onPostSubmit={this.onPostSubmit}
                        onUploadComplete={this.onUploadComplete}
                    />

                    {this.state.personalNewsFeed.map((post, index) => {
                        return (
                            <React.Fragment key={post.id}>
                                <View
                                    style={{ backgroundColor: "#FFFFFF" }}
                                >
                                    <PostBody
                                        postText={post.feedText}
                                        avatar={post.avatarUrl}
                                        name={post.name}
                                        createdDate={post.createdDate}
                                        postImgUrl={post.feedImgUrl}
                                        likesCount={post.likesCount}
                                        commentsCount={post.commentsCount}
                                        didUserLike={post.didUserLike}
                                        postId={post.id}
                                        feedRepostId={post.feedRepostId}
                                        reposts={this.state.personalFeedReposts}

                                        index={index}
                                        onLikePost={this.onLikePost}
                                        onUnlikePost={this.onUnlikePost}
                                        onPressComment={this.onPressComment}
                                    // onPressShare={}
                                    />
                                    {this.state.commentsPosts[post.id] &&
                                        <PostComment
                                            index={index}
                                            postId={post.id}
                                            commentsPost={this.state.commentsPosts[post.id]}
                                            onPostCommentChange={this.onCommentFieldChange}
                                            onSendComment={this.onCommentSubmit}
                                            onLoadMoreCmts={this.onLoadMoreCmts}
                                        />
                                    }
                                </View>
                                <View style={{ height: 10, backgroundColor: "#DCDCDC" }} />
                            </React.Fragment>
                        )
                    })}

                    <View style={{ justifyContent: "center" }}>
                        {this.state.postsDisplayCount < this.state.totalPosts ?
                            <Button
                                title="Load More Posts"
                                onPress={this.getFeed}
                            />
                            : <Text style={{ flexDirection: "row", alignItems: "center" }}>No more posts to show...</Text>
                        }
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default connect(mapStateToProps, null)(NewsFeed);