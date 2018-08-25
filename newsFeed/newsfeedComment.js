import * as React from 'react';
import Moment from 'react-moment';
import { View, Text, TouchableHighlight, TextInput } from "react-native";
import { Avatar } from "react-native-elements";
import { textStyles, CustomText } from "../../utilities/theme/index";

export const PostComment = (props) => {
    const buildComment = (comment, index) => {
        return (
            <View
                style={{ marginHorizontal: 20, marginVertical: 4 }}
                key={comment.id}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Avatar
                        small
                        rounded
                        containerStyle={{ margin: 7 }}
                        source={{ uri: comment.avatarUrl }}
                    />
                    <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
                        <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-end" }}>
                            <CustomText fontStyle={textStyles.name}>{comment.name} </CustomText>
                            <CustomText fontStyle={textStyles.time}>
                                <Moment fromNow element={Text}>{comment.createdDate}</Moment>
                            </CustomText>
                        </View>
                        <Text>{comment.commentText}</Text>

                    </View>
                </View>

            </View>
        )
    }

    return (
        <View>
            {props.commentsPost.comments.length > 0 &&
                <View>
                    {props.commentsPost.comments.map(buildComment)}
                    {props.commentsPost.totalCmts > 2 && props.commentsPost.cmtDisplayCount < props.commentsPost.totalCmts
                        &&
                        <TouchableHighlight style={{ alignSelf: "center" }}
                            onPress={() => props.onLoadMoreCmts(props.postId)}
                        >
                            <Text>load more comments</Text>
                        </TouchableHighlight>
                    }
                </View>
            }
        </View>
    )
}