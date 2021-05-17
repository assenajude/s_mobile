import React, {useEffect} from 'react';
import {View, ScrollView, Image, StyleSheet, TouchableWithoutFeedback} from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons'

import defaultStyles from '../utilities/styles'
import AppText from "../components/AppText";
import useManageAssociation from "../hooks/useManageAssociation";
import BackgroundWithAvatar from "../components/member/BackgroundWithAvatar";
import routes from "../navigation/routes";
import useCotisation from "../hooks/useCotisation";
import useEngagement from "../hooks/useEngagement";


function MemberDetails({route, navigation}) {
    const selectedMember = route.params
    const {getMemberCotisations} = useCotisation()
    const {getMemberEngagementInfos} = useEngagement()
    const {formatFonds, formatDate} = useManageAssociation()

    useEffect(() => {
    }, [])

    return (
        <>
        <ScrollView contentContainerStyle={{paddingBottom: 20}}>

            <BackgroundWithAvatar
                fondSource={require('../../assets/peuple_solidaire.png')}
                memberUsername={selectedMember.username}
                memberEmail={selectedMember.email}
                memberAvatar={require('../../assets/user_avatar.jpg')} />
            <TouchableWithoutFeedback
                onPress={() => navigation.navigate(routes.NEW_MEMBER, selectedMember)}>
                <View style={styles.editAccount}>
                    <MaterialCommunityIcons name="account-edit" size={24} color="black" />
                </View>
            </TouchableWithoutFeedback>
            <View style={styles.statut}>
                <AppText style={{color: defaultStyles.colors.bleuFbi, fontSize: 20, fontWeight: 'bold'}}>{selectedMember.member.statut}</AppText>
            </View>
            <View style={{marginTop: 30}}>
                <View style={styles.detailContainer}>
                    <AppText>FONDS</AppText>
                    <AppText>{formatFonds(selectedMember.member.fonds)}</AppText>
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
                    <AppText>{formatDate(selectedMember.member.adhesionDate)}</AppText>
                </View>
            </View>
            <View>
                <TouchableWithoutFeedback
                    onPress={() =>
                        navigation.navigate('Cotisations', {
                            screen: 'MemberCotisationScreen',
                            initial: false,
                            params:selectedMember
                        })}>
                    <View style={styles.cotisation}>
                        <AppText style={{color: defaultStyles.colors.bleuFbi}}>Cotisations</AppText>
                        <AppText style={{color: defaultStyles.colors.bleuFbi}}>({getMemberCotisations(selectedMember).cotisationLenght})</AppText>
                        <AppText style={{color: defaultStyles.colors.bleuFbi}}>{formatFonds(getMemberCotisations(selectedMember).totalCotisation)}</AppText>
                        <MaterialCommunityIcons name="clipboard-play-multiple" size={24} color="black" />
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                    onPress={() => navigation.navigate('Engagements', {
                    screen : routes.LIST_ENGAGEMENT,
                    initial: false,
                    params:selectedMember
                })}>
                    <View style={styles.cotisation}>
                        <AppText style={{color: defaultStyles.colors.bleuFbi}}>Engagements</AppText>
                        <AppText style={{color: defaultStyles.colors.bleuFbi}}>({getMemberEngagementInfos(selectedMember).engagementLength})</AppText>
                        <AppText style={{color: defaultStyles.colors.bleuFbi}}>{formatFonds(getMemberEngagementInfos(selectedMember).engagementAmount)}</AppText>
                        <MaterialCommunityIcons name="clipboard-play-multiple" size={24} color="black" />
                    </View>
                 </TouchableWithoutFeedback>
            </View>
        </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    camera: {
      padding: 10
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
    editAccount: {
        position: 'absolute',
        top: 220,
        right: 20,
    },
    statut: {
        alignItems: 'center',
        marginTop: 40
    }
})
export default MemberDetails;