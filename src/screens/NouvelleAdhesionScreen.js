import React, {useEffect} from 'react';
import {View, FlatList} from "react-native";
import {useSelector} from "react-redux";
import MemberItem from "../components/member/MemberItem";
import AppAvatar from "../components/AppAvatar";
import MemberListItem from "../components/member/MemberListItem";
import {MaterialCommunityIcons} from '@expo/vector-icons'
import defaultStyles from '../utilities/styles'

function NouvelleAdhesionScreen(props) {
    const newAdhesions = useSelector(state => {
        const list = state.entities.association.selectedAssociationMembers
        const adhesionList = list.filter(item => {
            const isNew = item.member.relation.toLowerCase() === 'ondemand'
            const isRejected = item.member.relation.toLowerCase() === 'rejected'
            if(isNew || isRejected) return true
        })
        return adhesionList
    })


    useEffect(() => {
    }, [])

    return (
        <>
           <FlatList
               data={newAdhesions}
               keyExtractor={item => item.id.toString()}
               renderItem={({item}) =>
                   <MemberListItem
                       renderRightActions={() =><View>
                           <MaterialCommunityIcons name="account-multiple-plus" size={24} color="black" />
                       </View>}
                       username={item.username}
                       memberAddress={item.email?item.email:item.phone}  >
                   </MemberListItem>}/>
        </>
    );
}

export default NouvelleAdhesionScreen;