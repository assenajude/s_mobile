import React, {useEffect} from 'react';
import {View, ScrollView, Image, StyleSheet, TouchableWithoutFeedback} from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons'

import defaultStyles from '../utilities/styles'
import AppText from "../components/AppText";
import useManageAssociation from "../hooks/useManageAssociation";
function MemberDetails({route, navigation}) {
    const selectedMember = route.params

    const {formatFonds, formatDate} = useManageAssociation()

    useEffect(() => {
    }, [])

    return (
        <>
        <ScrollView contentContainerStyle={{paddingBottom: 20}}>

            <View>
                <Image style={styles.fontImage} source={require('../../assets/peuple_solidaire.png')}/>
                <View style={styles.cameraContainer}>
                    <View style={styles.mainInfo}>
                        <AppText style={{fontWeight: 'bold'}}>{selectedMember.username}</AppText>
                        <AppText>{selectedMember.email}</AppText>
                    </View>
                </View>
                <Image style={styles.avatar} source={require('../../assets/user_avatar.jpg')}/>
            </View>
            <View style={{marginTop: 30}}>
                <View style={styles.detailContainer}>
                    <AppText>FONDS</AppText>
                    <AppText>{formatFonds(selectedMember.fonds)}</AppText>
                </View>
                <View style={styles.detailContainer}>
                    <AppText>NOM</AppText>
                    <AppText>{selectedMember.nom}</AppText>
                </View>
                <View style={styles.detailContainer}>
                    <AppText>PRENOMS</AppText>
                    <AppText>{selectedMember.prenom}</AppText>
                </View>
                <View style={styles.detailContainer}>
                    <AppText>TELEPHONE</AppText>
                    <AppText>{selectedMember.phone}</AppText>
                </View>
                <View style={styles.detailContainer}>
                    <AppText>AUTRES ADRESSES</AppText>
                    <AppText>{selectedMember.adresse}</AppText>
                </View>
                <View style={styles.detailContainer}>
                    <AppText>Date adhesion</AppText>
                    <AppText>{formatDate(selectedMember.associated_member.adhesionDate)}</AppText>
                </View>
            </View>
            <View>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('Cotisations', {screen: 'MemberCotisationScreen', params:selectedMember})}>
                    <View style={styles.cotisation}>
                        <AppText style={{color: defaultStyles.colors.bleuFbi}}>Cotisations(5)</AppText>
                        <MaterialCommunityIcons name="clipboard-play-multiple" size={24} color="black" />
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('MemberEngagementScreen', selectedMember)}>
                    <View style={styles.cotisation}>
                        <AppText style={{color: defaultStyles.colors.bleuFbi}}>Engagements(2)</AppText>
                        <MaterialCommunityIcons name="clipboard-play-multiple" size={24} color="black" />
                    </View>
                 </TouchableWithoutFeedback>
            </View>
        </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    avatar: {
      borderRadius: 30,
      bottom:30,
      position: 'absolute',
      height: 60,
      left: 30,
      width: 60
    },
    camera: {
      padding: 10
    },
    cameraContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cotisation: {
      flexDirection: 'row',
      justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginVertical: 20
    },
    detailContainer: {
      flexDirection: 'row',
        paddingVertical: 15,
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    fontImage: {
        height: 200
    },
    mainInfo: {
        marginLeft:'25%',
        marginTop: 10,
    }
})
export default MemberDetails;