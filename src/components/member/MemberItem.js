import React from 'react';
import {Image, View, StyleSheet, TouchableWithoutFeedback} from "react-native";
import AppText from "../AppText";

function MemberItem({avatarSource, username, getMemberDetails}) {
    return (
        <TouchableWithoutFeedback onPress={getMemberDetails}>
        <View style={styles.container}>
            <Image source={avatarSource} style={styles.avatar}/>
            <AppText style={{margin: 10}}>{username}</AppText>
        </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    avatar: {
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20
    }
})
export default MemberItem;