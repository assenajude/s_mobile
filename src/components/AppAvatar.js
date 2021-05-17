import React from 'react';
import {View,Image, StyleSheet, } from "react-native";
import {useSelector} from "react-redux";

import defaultStyles from '../utilities/styles'

function AppAvatar({avatarStyle}) {
    const connectedMember = useSelector(state => {
        const connectedUser = state.auth.user
        const list = state.entities.association.selectedAssociationMembers
        const selected = list.find(item => item.id === connectedUser.id)
        return selected
    })
    return (
        <>
            {!connectedMember.member.avatar && <Image source={require('../../assets/silhouette.png')} style={[styles.avatar, avatarStyle]}/>}
            {connectedMember.member.avatar && <Image style={[styles.avatar, avatarStyle]} source={{uri: connectedMember.member.avatar}}/>}
        </>
    );
}

const styles = StyleSheet.create({
    avatar: {
        height: 60,
        width: 60,
        borderRadius: 30,
    }
})
export default AppAvatar;