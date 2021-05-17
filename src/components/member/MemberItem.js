import React from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from "react-native";
import AppText from "../AppText";
import defaultStyles from '../../utilities/styles'
import AppAvatar from "../AppAvatar";

function MemberItem({username, getMemberDetails, avatarStyle, address}) {
    return (
        <TouchableWithoutFeedback onPress={getMemberDetails}>
        <View style={styles.container}>
            <AppAvatar avatarStyle={avatarStyle}/>
            <View style={styles.addressContainer}>
                <AppText style={styles.addressText}>{username}</AppText>
                <AppText style={styles.addressText}>{address}</AppText>
            </View>
        </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    addressContainer: {
      alignItems: 'flex-start',
        marginLeft: 10
    },
    addressText: {
      color: defaultStyles.colors.grey,
        fontWeight: '100',
        fontSize: 15
    },
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
    }
})
export default MemberItem;