import React, {useEffect} from 'react';
import {FlatList, TouchableOpacity, View} from "react-native";
import {useDispatch, useSelector, useStore} from "react-redux";
import MemberListItem from "../components/member/MemberListItem";
import {MaterialCommunityIcons} from '@expo/vector-icons'
import defaultStyles from '../utilities/styles'
import AppSwiper from "../components/AppSwiper";
import {respondToAdhesionMessage} from "../store/slices/memberSlice";
import {getMemberRolesEdited, getSelectedAssociationMembers} from "../store/slices/associationSlice";
import AppText from "../components/AppText";
import useManageAssociation from "../hooks/useManageAssociation";
import ListItemSeparator from "../components/ListItemSeparator";

function NouvelleAdhesionScreen(props) {
    const dispatch = useDispatch()
    const store = useStore()
    const {getNewAdhesion} = useManageAssociation()


    const selectedAssociation = useSelector(state => state.entities.association.selectedAssociation)

    const handleAcceptDemand = async (member) => {
        await dispatch(respondToAdhesionMessage({
            userId: member.id,
            associationId:  selectedAssociation.id,
            adminResponse: 'member'
        }))
        const error = store.getState().entities.member.error
        if(error !== null) {
            return alert("Erreur: impossible d'ajouter le membre")
        }
        dispatch(getMemberRolesEdited({memberId: member.member.id}))
        dispatch(getSelectedAssociationMembers({associationId: selectedAssociation.id}))
        return alert("Membre ajouté avec succès")
    }

    useEffect(() => {
    }, [])


    if(getNewAdhesion().length ===0) {
        return <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <AppText>Vous n'avez aucune demande d'adhesion</AppText>
        </View>
    }

    return (
        <>
           <FlatList
               data={getNewAdhesion()}
               ItemSeparatorComponent={ListItemSeparator}
               keyExtractor={item => item.id.toString()}
               renderItem={({item}) =>
                   <MemberListItem selectedMember={item}
                       renderRightActions={() => <AppSwiper>
                           <TouchableOpacity onPress={() => handleAcceptDemand(item)}>
                               <MaterialCommunityIcons style={{marginVertical: 10}} name="account-multiple-plus" size={24} color={defaultStyles.colors.vert} />
                           </TouchableOpacity>
                           <TouchableOpacity>
                               <MaterialCommunityIcons style={{marginVertical: 10}} name="account-cancel" size={24} color={defaultStyles.colors.rougeBordeau} />
                           </TouchableOpacity>
                       </AppSwiper>}
                   >
                   </MemberListItem>}/>
        </>
    );
}

export default NouvelleAdhesionScreen;