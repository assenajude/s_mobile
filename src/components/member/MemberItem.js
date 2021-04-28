import React from 'react';
import {View, Image, StyleSheet} from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons'
import defaultStyles from '../../utilities/styles'
import AppText from "../AppText";
import colors from "../../utilities/colors";

function MemberItem({nom}) {
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 10
        }}>
            <View style={styles.secondContainer}>
                <MaterialCommunityIcons name='plus' size={30} color={defaultStyles.colors.dark}/>
                <Image source={require('../../../assets/user_avatar.jpg')} style={styles.avatar}/>
                <AppText>{nom}</AppText>
            </View>
            <View style={{
                flexDirection: 'row'
            }}>
                <MaterialCommunityIcons name="check-circle" size={24} color={defaultStyles.colors.vert} />
                <AppText style={{color:defaultStyles.colors.vert}}>à jour</AppText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    avatar: {
        height: 80,
        width: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20
    },
    secondContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20
    }
})

export default MemberItem;