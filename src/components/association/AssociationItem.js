import React from 'react';
import {View, StyleSheet, Image,  TouchableWithoutFeedback,} from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons'

import AppText from "../AppText";
import AppButton from "../AppButton";
import defaultStyles from '../../utilities/styles'


function AssociationItem({nom, sendAdhesionMessage,onPress, isMember, relationType, showState=true}) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
        <View style={{width: '50%'}}>
        <View style={styles.container}>
            <View style={{ alignItems: 'center'}}>
                <Image style={styles.associationAvatar} source={require('../../../assets/peuple_solidaire.png')}/>
                <AppText style={styles.nom}>{nom}</AppText>
            </View>
        </View>
            {showState && <View style={{
                position: 'absolute',
                top:0,
                right:10
            }}>
                {!isMember && <AppButton otherButtonStyle={styles.buttonStyle} title='adherer' onPress={sendAdhesionMessage}/>}
                {isMember && relationType.toLowerCase() === 'ondemand' && <AppText style={{color: defaultStyles.colors.bleuFbi}}>envoyé</AppText> }
                {isMember && relationType.toLowerCase() === 'rejected' && <AppText style={{color: defaultStyles.colors.rouge}}>refusé</AppText> }
                {isMember && relationType.toLowerCase() === 'member' && <MaterialCommunityIcons name="account-group" size={24} color={defaultStyles.colors.vert} />}
                {isMember && relationType.toLowerCase() === 'onleave' && <MaterialCommunityIcons name="account-group" size={24} color={defaultStyles.colors.rouge} />}
            </View>}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    associationAvatar: {
      height: 100,
      width: 150,
        borderRadius: 10
    },
    container: {
        marginVertical: 20,
        marginHorizontal:10,
    },
    buttonStyle: {
        width: 'auto',
        height: 20,
        padding: 5
    },
    nom: {
        textAlign: 'center',
        marginVertical: 10
    }
})
export default AssociationItem;