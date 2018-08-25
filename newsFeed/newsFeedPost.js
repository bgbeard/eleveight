import * as React from 'react';
import Moment from 'react-moment';
import { View, Text, Dimensions, TouchableHighlight } from "react-native";
import { Card, Avatar, Icon } from "react-native-elements";
import ScaledImage from "../common/autoScaledImage";
import { textStyles, CustomText } from "../../utilities/theme/index";

export const PostBody = props => {

    const showRepost = (repost) => {
        if (repost.postId == props.feedRepostId)
            return (
                <Card key={repost.postId}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Avatar
                            medium
                            rounded
                            containerStyle={{ margin: 10 }}
                            source={{ uri: repost.avatarUrl }}
                        />
                        <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
                            <CustomText fontStyle={textStyles.name}>{repost.firstName} {repost.lastName}</CustomText>
                            <CustomText fontStyle={textStyles.time}>
                                <Moment fromNow style={textStyles.time} element={Text}>{repost.createdDate}</Moment>
                            </CustomText>
                        </View>
                    </View>
                    <Text style={textStyles.paragraph}>
                        {repost.feedText}
                    </Text>
                    {
                        (repost.feedImgUrl != "" && repost.feedImgUrl != null) &&
                        <View style={{ flexDirection: "column", alignItems: "center" }}>
                            <ScaledImage
                                uri={repost.feedImgUrl}
                                width={Dimensions.get('window').width - 60}
                            />
                        </View>
                    }
                    <View style={{ alignItems: "flex-end" }}><Text>Reposted from @{repost.firstName.charAt(0)}{repost.lastName}{repost.profileId}</Text></View>
                </Card >
            )
        else return;
    }

    return (
        <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Avatar
                    medium
                    rounded
                    containerStyle={{ margin: 10 }}
                    source={{ uri: props.avatar }}
                />
                <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
                    <CustomText fontStyle={textStyles.name}>{props.name}</CustomText>
                    <CustomText fontStyle={textStyles.time}>
                        <Moment fromNow element={Text}>{props.createdDate}</Moment>
                    </CustomText>
                </View>
            </View>
            <View style={{ flex: 1 }}>
                {(props.postImgUrl != "" && props.postImgUrl != null) &&
                    <ScaledImage
                        uri={props.postImgUrl}
                        width={Dimensions.get('window').width}
                    />}
                <CustomText
                    style={{ marginVertical: 5, marginHorizontal: 20 }}
                    fontStyle={textStyles.paragraph}
                >
                    {props.postText}
                </CustomText>
            </View>
            <View>
                {props.feedRepostId != 0 &&
                    <View>{props.reposts.map(showRepost)}</View>
                }
            </View>
            <View style={{ flexDirection: "row", marginVertical: 10, justifyContent: "space-around" }}>
                <View
                    style={{ flexDirection: "row", alignItems: "center" }}
                >
                    {props.didUserLike ?
                        <TouchableHighlight
                            onPress={() => props.onUnlikePost(props.postId, props.index)}>
                            <Icon name="star" type="FontAwesome" color="#5bc0de" />
                        </TouchableHighlight>
                        :
                        <TouchableHighlight
                            onPress={() => props.onLikePost(props.postId, props.index)}>
                            <Icon name="star" type="FontAwesome" color="#D3D3D3" />
                        </TouchableHighlight>
                    }
                    {props.likesCount > 0 &&
                        <Text style={{ marginLeft: 5, fontSize: 15 }}>
                            {props.likesCount}
                        </Text>
                    }
                </View>

                <View
                    style={{ flexDirection: "row", alignItems: "center" }}
                >
                    <TouchableHighlight
                        onPress={() => props.onPressComment(props.postId)}
                    >
                        <Icon name="comment" type="FontAwesome5" color="#D3D3D3" />
                    </TouchableHighlight>
                    {props.commentsCount > 0 &&
                        <Text style={{ marginLeft: 5, fontSize: 15, fontFamily: 'Roboto' }}>{props.commentsCount}</Text>
                    }
                </View>

                <TouchableHighlight
                // onPress={props.onPressShare}
                >
                    <Icon name="share" type="FontAwesome5" color="#D3D3D3" />
                </TouchableHighlight>
            </View>
        </View >
    )
}


