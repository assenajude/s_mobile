import React from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from "react-native";
import AppText from "../AppText";
import defaultStyles from '../../utilities/styles'
import AppAvatar from "../AppAvatar";
import {useSelector} from "react-redux";

function MemberItem({getMemberDetails, avatarStyle, selectedMember,deleteAvatar}) {
    const connectedMember = useSelector(state => {
        const connectedUser = state.auth.user
        const list = state.entities.association.selectedAssociationMembers
        const selected = list.find(item => item.id === connectedUser.id)
        return selected
    })
    return (
        <TouchableWithoutFeedback onPress={getMemberDetails}>
        <View style={styles.container}>
            <AppAvatar source={{uri: selectedMember.member.avatar}} avatarStyle={avatarStyle} onDelete={deleteAvatar}/>
            <View style={styles.addressContainer}>
                <AppText style={styles.addressText}>{selectedMember.username}</AppText>
                <AppText style={styles.addressText}>{selectedMember.email?selectedMember.email:selectedMember.phone}</AppText>
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