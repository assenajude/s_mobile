import React from 'react';
import {View, StyleSheet, Image} from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons'

import AppText from "../AppText";
import AppButton from "../AppButton";
import defaultStyles from '../../utilities/styles'


function AssociationItem({nom, sendAdhesionMessage,onPress, isMember, relationType, nameStyle}) {
    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image style={styles.associationAvatar} source={require('../../../assets/peuple_solidaire.png')}/>
                <AppText onPress={onPress}
                         style={[{marginLeft: 10}, nameStyle]}>{nom}</AppText>
            </View>
            <View>
                {!isMember && <AppButton otherButtonStyle={styles.buttonStyle} title='adherer' onPress={sendAdhesionMessage}/>}
                {isMember && relationType.toLowerCase() === 'pending' && <AppText style={{color: defaultStyles.colors.bleuFbi}}>envoyé</AppText> }
                {isMember && relationType.toLowerCase() === 'rejected' && <AppText style={{color: defaultStyles.colors.rouge}}>refusé</AppText> }
                {isMember && relationType.toLowerCase() === 'valid' && <MaterialCommunityIcons name="account-group" size={24} color={defaultStyles.colors.vert} />}
                {isMember && relationType.toLowerCase() === 'leave' && <MaterialCommunityIcons name="account-group" size={24} color={defaultStyles.colors.rouge} />}
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    associationAvatar: {
      height: 60,
      width: 60,
      borderRadius: 30
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10
    },
    buttonStyle: {
        width: 'auto',
        height: 20,
        padding: 5
    }
})
export default AssociationItem;