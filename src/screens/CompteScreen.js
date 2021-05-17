import React, {useEffect} from 'react';
import {View, ScrollView, Image, StyleSheet, TouchableWithoutFeedback} from "react-native";

import AppText from "../components/AppText";
import useManageAssociation from "../hooks/useManageAssociation";
import {useSelector} from "react-redux";
import AppAddNewButton from "../components/AppAddNewButton";
import routes from "../navigation/routes";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import defaultStyles from "../utilities/styles";
import AppLabelWithValue from "../components/AppLabelWithValue";
import AppLinkButton from "../components/AppLinkButton";
import useCotisation from "../hooks/useCotisation";
import useEngagement from "../hooks/useEngagement";


function CompteScreen({route, navigation}) {

    const {getMemberCotisations} = useCotisation()
    const {getMemberEngagementInfos} = useEngagement()

    const user = useSelector(state => state.auth.user)
    const connectedMember = useSelector(state => {
        const listMember = state.entities.association.selectedAssociationMembers
        const currentMember = listMember.find(item => item.id === user.id)
        return currentMember
    })
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
                            <AppText style={{fontWeight: 'bold'}}>{connectedMember.username}</AppText>
                            <AppText>{connectedMember.email}</AppText>
                        </View>
                        <TouchableWithoutFeedback onPress={() => navigation.navigate('EditImage')}>
                            <MaterialCommunityIcons style={{padding: 20}} name='camera' size={24} color={defaultStyles.colors.dark}/>
                        </TouchableWithoutFeedback>
                    </View>
                    <Image style={styles.avatar} source={require('../../assets/user_avatar.jpg')}/>
                </View>
                <View style={styles.statut}>
                    <AppText style={{color: defaultStyles.colors.bleuFbi, fontSize: 22, fontWeight: 'bold'}}>{connectedMember.member.statut}</AppText>
                </View>
                <View style={{marginTop: 30}}>
                    <AppLabelWithValue label='Fonds' value={formatFonds(connectedMember.member.fonds)}/>
                    <AppLabelWithValue label='Nom' value={connectedMember.nom}/>
                    <AppLabelWithValue label='Penoms' value={connectedMember.prenom}/>
                    <AppLabelWithValue label='Telephone' value={connectedMember.phone}/>
                    <AppLabelWithValue label='Autres adresses' value={connectedMember.adresse}/>
                    <AppLabelWithValue label="Date d'adhesion" value={formatDate(connectedMember.member.adhesionDate)}/>
                </View>
                <View style={{
                    marginVertical: 10,
                    marginHorizontal: 10
                }}>
                    <AppLinkButton label='Vos cotisations'
                                   onPress={() =>
                                       navigation.navigate('Cotisations', {
                                           screen: 'MemberCotisationScreen',
                                           initial: false,
                                           params:connectedMember
                                       })}
                                   labelLength={getMemberCotisations(connectedMember).cotisationLenght}
                                   totalAmount={getMemberCotisations(connectedMember).totalCotisation}/>
                     <AppLinkButton label='Vos engagements'
                                    onPress={() => navigation.navigate('Engagements', {
                                        screen : routes.LIST_ENGAGEMENT,
                                        initial: false,
                                        params:connectedMember
                                    })}
                                    labelLength={getMemberEngagementInfos(connectedMember).engagementLength}
                                    totalAmount={getMemberEngagementInfos(connectedMember).engagementAmount}/>
                </View>
            </ScrollView>
            <View style={styles.edit}>
                <AppAddNewButton name='account-edit'
                                 onPress={() => navigation.navigate('Members',{
                                     screen : routes.NEW_MEMBER,
                                     params: connectedMember
                                 })}/>
            </View>
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
    edit: {
      position: 'absolute',
        right: 20,
        bottom: 25
    },
    fontImage: {
        height: 200
    },
    mainInfo: {
        marginLeft:'25%',
        marginTop: 10,
    },
    statut: {
        alignItems: 'center',
        marginTop: 40
    }
})
export default CompteScreen;