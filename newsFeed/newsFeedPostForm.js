import * as React from 'react';
import { Button, TextInput, View, Dimensions, Text } from "react-native";
import { Divider, Icon } from "react-native-elements";
import ImageUploader from "../imageuploader/imageuploader";
import ScaledImage from "../common/autoScaledImage";

const CameraButton = (
    <Icon
        name="camera"
        type="FontAwesome"
        size={25}
        color="#DCDCDC"
    />
)

const ImageButton = (
    <Icon
        name="photo"
        type="FontAwesome"
        size={25}
        color="#DCDCDC"
    />)

export const NewsFeedPostForm = (props) => {
    const imgUploadWidth = (Dimensions.get('window').width - 20);
    return (
        <View style={{ backgroundColor: "#FFFFFF" }}>
            <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                <Text style={{ flexDirection: "row", justifyContent: "flex-start", fontWeight: "bold", fontSize: 20 }}>What's on your mind?</Text>
                <Divider />
                <View style={{ flexDirection: "row", alignContent: "center" }}>
                    <TextInput editable={true} multiline={true} numberOfLines={5} maxLength={4000}
                        name="feedText"
                        value={props.newsFeedPost.feedText}
                        onChangeText={props.onChangePost}
                        placeholder="Type something..."
                        style={{ width: "94%" }}
                    />
                    <View style={{ width: "6%", alignContent: "center", justifyContent: "center" }}>
                        <ImageUploader
                            onUploadComplete={props.onUploadComplete}
                            cameraButton={CameraButton}
                            imageButton={ImageButton}
                            buttonStyle={{ flexDirection: "column", justifyContent: 'center' }}
                        />
                    </View>
                </View>
                {props.newsFeedPost.feedImgUrl == "" ||
                    <ScaledImage
                        uri={props.newsFeedPost.feedImgUrl}
                        width={imgUploadWidth}
                    />
                }
                <Button
                    title="Share"

                    onPress={props.onPostSubmit}
                    disabled={props.newsFeedPost.feedText == "" && props.newsFeedPost.feedImgUrl == "" ? true : false}
                />
            </View>
            <View style={{ height: 10, backgroundColor: "#DCDCDC" }} />
        </View >
    );
}