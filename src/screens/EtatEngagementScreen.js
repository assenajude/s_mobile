import React, {useState, useEffect} from 'react';
import  {View, FlatList, TouchableWithoutFeedback,TouchableOpacity, Modal, StyleSheet} from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {useDispatch, useSelector, useStore} from "react-redux";
import MemberListItem from "../components/member/MemberListItem";
import AppText from "../components/AppText";
import useManageAssociation from "../hooks/useManageAssociation";
import ListItemSeparator from "../components/ListItemSeparator";
import routes from "../navigation/routes";
import defaultStyles from '../utilities/styles'
import AppAddNewButton from "../components/AppAddNewButton";
import EngagementItem from "../components/engagement/EngagementItem";
import useEngagement from "../hooks/useEngagement";
import {getEngagementDetail} from "../store/slices/engagementSlice";
import useAuth from "../hooks/useAuth";

function EtatEngagementScreen({navigation}) {
    const dispatch = useDispatch()
    const store = useStore()
    const {getMemberUserCompte} = useAuth()
    const {formatFonds, associationValidMembers} = useManageAssociation()
    const {getMemberEngagementInfos} = useEngagement()

    const engagements = useSelector(state => state.entities.engagement.list)
    const [showDropdown, setShowDropdown] = useState(false)
    const [isByMember, setIsByMember] = useState(false)
    const [mainData, setMainData] = useState(engagements)

    const dropdownData = [
        {
        id: 1,
        label: 'Tous les engagements'
    },
    {
        id: 2,
        label: 'Par membre'
    }
    ]

    const [data, setData] = useState(dropdownData[0])

    const handleChangeContent = (item) => {
        setData(item)
        if(item.id === 2) {
            setIsByMember(true)
            setMainData(associationValidMembers())
        }
        else {
            setIsByMember(false)
            setMainData(engagements)
        }
        setShowDropdown(false)
    }

    const handleEngagementDetails = async (item) => {
        await dispatch(getEngagementDetail(item))
        const newEngagements = store.getState().entities.engagement.list
        setMainData(newEngagements)


    }


    useEffect(() => {
    }, [])

    return (
        <>
            <View>
                <TouchableWithoutFeedback onPress={() => setShowDropdown(!showDropdown)}>
                    <View style={styles.dropdown}>
                        <AppText>{data.label}</AppText>
                        {!showDropdown && <MaterialCommunityIcons name="chevron-down" size={24} color="black" />}
                        {showDropdown && <MaterialCommunityIcons name="chevron-up" size={24} color="black" />}
                    </View>
                </TouchableWithoutFeedback>
                {showDropdown && <View style={styles.dropdownContent}>
                    {dropdownData.map(item =>
                        <AppText onPress={()=>handleChangeContent(item)} key={item.label} style={styles.dropdownText}>{item.label}</AppText>)}
                </View>}
            </View>
            <View style={{
                marginVertical: 10
            }}>
                <ListItemSeparator/>
            </View>
            {mainData.length === 0 && <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 50
            }}>
                <AppText>Aucun engagements trouvé</AppText>
            </View>}
           {mainData.length>0 && <FlatList data={mainData}
                     keyExtractor={item => item.id.toString()}
                     ItemSeparatorComponent={ListItemSeparator}
                     renderItem={({item}) => {
                         if(isByMember) {
                           return  <MemberListItem
                               childrenStyle={{
                                   top: 25
                               }}
                               username={item.username}
                               memberAddress={item.email?item.email:item.phone}
                               getMemberDetails={() => navigation.navigate(routes.LIST_ENGAGEMENT, item)}>
                               <AppText style={{marginHorizontal: 20}}>({getMemberEngagementInfos(item).engagementLength})</AppText>
                               <AppText>{formatFonds(getMemberEngagementInfos(item).engagementAmount)}</AppText>
                             </MemberListItem>
                         }

                         return <EngagementItem label={item.libelle}
                                                montant={item.montant}
                                                memberUsername={getMemberUserCompte(item.member).username}
                                                memberAvatar={require('../../assets/user_avatar.jpg')}
                                                memberAddress={getMemberUserCompte(item.member).email?getMemberUserCompte(item.member).email:getMemberUserCompte(item.member).phone}
                                                engagementDetails={item.showDetail}
                                                getEngagementDetails={() => handleEngagementDetails(item)}
                                                statutEngagement={item.statut}
                                                demandDate={item.createdAt}
                                                validationDate={item.updatedAt}
                                                echeanceDate={item.echeance}/>

                     }}
           />}
           <View style={styles.addNew}>
               <AppAddNewButton onPress={() => navigation.navigate(routes.NEW_ENGAGEMENT)}/>
           </View>
        </>
    );
}



const styles = StyleSheet.create({
    addNew: {
      position: 'absolute',
      bottom: 20,
      right: 20
    },
    dropdown: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 20,
        marginTop: 20,
        backgroundColor: defaultStyles.colors.white,
        paddingVertical: 15
    },
    dropdownContent: {
        backgroundColor: defaultStyles.colors.white,
        height: 'auto',
        width: '85%',
        alignItems: 'flex-start',
        alignSelf: 'center',
        paddingBottom: 20,
        paddingLeft: 30
    },
    dropdownText: {
        color: defaultStyles.colors.bleuFbi,
        marginTop: 20
    }
})
export default EtatEngagementScreen;