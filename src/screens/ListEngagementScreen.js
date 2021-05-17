import React from 'react';
import {View, FlatList, StyleSheet} from "react-native";
import AppText from "../components/AppText";
import {useDispatch, useSelector} from "react-redux";
import BackgroundWithAvatar from "../components/member/BackgroundWithAvatar";
import EngagementItem from "../components/engagement/EngagementItem";
import {getEngagementDetail} from "../store/slices/engagementSlice";
import ListItemSeparator from "../components/ListItemSeparator";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import useAuth from "../hooks/useAuth";

function ListEngagementScreen({route}) {
    const selectedMember = route.params
    const dispatch = useDispatch()
    const { getMemberUserCompte} = useAuth()
    const memberEngagements = useSelector(state => {
        const list = state.entities.engagement.list
        const memberList = list.filter(engagement => engagement.memberId === selectedMember.member.id)
        return memberList
    })




    return (
        <>
            <BackgroundWithAvatar fondSource={require('../../assets/peuple_solidaire.png')}
                                  memberUsername={selectedMember.username}
                                  memberEmail={selectedMember.email}
                                  memberAvatar={require('../../assets/user_avatar.jpg')}/>
             <View style={{marginVertical: 20}}>
                 <ListItemSeparator/>
             </View>
            {memberEngagements.length > 0 && <FlatList data={memberEngagements}
                      keyExtractor={item => item.id.toString()}
                      renderItem={({item}) =>
                          <EngagementItem  label={item.libelle} inList={true}
                                          montant={item.montant} showAvatar={false}
                                          statutEngagement={item.statut}
                                          demandDate={item.createdAt}
                                          validationDate={item.updatedAt}
                                          echeanceDate={item.echeance}
                                          engagementDetails={item.showDetail}
                                          getEngagementDetails={() => dispatch(getEngagementDetail(item))}
                                           memberUsername={getMemberUserCompte(item.member).username}
                                           memberAddress={getMemberUserCompte(item.member).email}
                                           memberAvatar={item.member.avatar}
                          />}
            />}
            {memberEngagements.length === 0 && <View style={{
                marginVertical: 20,
                marginHorizontal: 20
            }}>
                <AppText>Aucun engagement trouvé</AppText>
            </View>}
        </>
    );
}

const styles = StyleSheet.create({
    arrowButton: {
        position: 'absolute',
        right:20,
        top: 100
    }
})

export default ListEngagementScreen;