import React,{useState} from 'react';
import {View, FlatList, StyleSheet} from "react-native";
import AppText from "../components/AppText";
import {useDispatch, useSelector} from "react-redux";
import BackgroundWithAvatar from "../components/member/BackgroundWithAvatar";
import EngagementItem from "../components/engagement/EngagementItem";
import {
    getEngagementDetail,
    getPayingTranche,
    getTranchePayed,
    showEngagementTranches
} from "../store/slices/engagementSlice";
import ListItemSeparator from "../components/ListItemSeparator";
import useAuth from "../hooks/useAuth";
import AppAddNewButton from "../components/AppAddNewButton";
import routes from "../navigation/routes";
import useManageAssociation from "../hooks/useManageAssociation";
import TrancheRightActions from "../components/tranche/TrancheRightActions";
import useEngagement from "../hooks/useEngagement";

function ListEngagementScreen({route, navigation}) {
    const selectedMember = route.params
    const {formatDate} = useManageAssociation()
    const {handlePayTranche} = useEngagement()
    const dispatch = useDispatch()
    const { getMemberUserCompte} = useAuth()

    const currentUser = useSelector(state => state.auth.user)
    const connectedMember = useSelector(state => {
        const listMember = state.entities.association.selectedAssociationMembers
        const currentMember = listMember.find(item => item.id === currentUser.id)
        return currentMember
    })
    const allTranches = useSelector(state => state.entities.engagement.tranches)
    const memberEngagements = useSelector(state => {
        const list = state.entities.engagement.list
        const memberList = list.filter(engagement => engagement.creatorId === selectedMember.member.id)
        const validList = memberList.filter(item => item.accord === true)
        return validList
    })

    const [tranchePayMontant, setTranchePayMontant] = useState('')


    return (
        <>
            <BackgroundWithAvatar selectedMember={selectedMember}/>
             <View style={{marginVertical: 20}}>
                 <ListItemSeparator/>
             </View>
            {memberEngagements.length > 0 &&
            <FlatList
                data={memberEngagements}
                keyExtractor={item => item.id.toString()}
                ItemSeparatorComponent={ListItemSeparator}
                renderItem={({item}) =>
                          <EngagementItem
                              tranches={allTranches.filter(tranche => tranche.engagementId === item.id)}
                              showTranches={item.showTranches}
                              getTranchesShown={() => {
                                  dispatch(showEngagementTranches(item))
                              }}
                              handlePayTranche={(tranche) =>handlePayTranche(tranche.id, item.id, tranchePayMontant)}
                              editTrancheMontant={tranchePayMontant}
                              onChangeTrancheMontant={val => setTranchePayMontant(val)}
                              renderRightActions={(tranche) =>
                                  connectedMember.id === item.creatorId?<TrancheRightActions
                                      ended={tranche.montant===tranche.solde}
                                      isPaying={tranche.paying}
                                      payingTranche={() => {dispatch(getPayingTranche(tranche))}}
                                  />:null
                              }
                              engagement={item}
                              validationDate={item.updatedAt}
                              inList={true}
                              showAvatar={false}
                              engagementDetails={item.showDetail}
                              getEngagementDetails={() => dispatch(getEngagementDetail(item))}
                              selectedMember={getMemberUserCompte(selectedMember)}
                          />}
            />}
            {memberEngagements.length === 0 && <View style={{
                marginVertical: 20,
                marginHorizontal: 20
            }}>
                <AppText>Aucun engagement trouvé</AppText>
            </View>}

            <View style={styles.addNew}>
                <AppAddNewButton onPress={() => navigation.navigate(routes.NEW_ENGAGEMENT)}/>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    arrowButton: {
        position: 'absolute',
        right:20,
        top: 100
    },
    addNew: {
        position: 'absolute',
        right: 20,
        bottom: 20
    }
})

export default ListEngagementScreen;