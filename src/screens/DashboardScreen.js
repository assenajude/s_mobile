import React, {useState, useEffect, useCallback} from 'react';
import {View,TouchableOpacity,TouchableWithoutFeedback, StyleSheet, ScrollView, Image} from "react-native";
import {useDispatch, useSelector, useStore} from "react-redux";
import {MaterialCommunityIcons} from '@expo/vector-icons'
import AppText from "../components/AppText";
import defaultStyles from '../utilities/styles'
import LottieView from "lottie-react-native";
import useManageAssociation from "../hooks/useManageAssociation";
import {getAllMembers, getMemberInfos} from "../store/slices/memberSlice";
import {getAllCotisations} from "../store/slices/cotisationSlice";
import ListItemSeparator from "../components/ListItemSeparator";
import FondsLabel from "../components/association/FondsLabel";
import AppLinkButton from "../components/AppLinkButton";
import {getAllVotes, getEngagementsByAssociation} from "../store/slices/engagementSlice";
import useCotisation from "../hooks/useCotisation";
import useEngagement from "../hooks/useEngagement";
import {getAssociationInfos} from "../store/slices/informationSlice";
import {getSelectedAssociationMembers, getMemberRoles} from "../store/slices/associationSlice";
import routes from "../navigation/routes";
import AppHeaderGradient from "../components/AppHeaderGradient";
import useAuth from "../hooks/useAuth";
import AppAddNewButton from "../components/AppAddNewButton";
import AssociationBackImage from "../components/association/AssociationBackImage";

function DashboardScreen({navigation}) {
    const dispatch = useDispatch()
    const store = useStore()
    const {isModerator, isAdmin} = useAuth()
    const {formatFonds,getNewAdhesion,getManagedAssociationFund} = useManageAssociation()
    const {getAssociationCotisation} = useCotisation()
    const {getAssociationEngagementTotal} = useEngagement()

    const currentUser = useSelector(state => state.auth.user)
    const currentAssociation = useSelector(state => state.entities.association.selectedAssociation)
    const benefice = useSelector(state => {
        let totalBenefice = 0
        const listEngagement = state.entities.engagement.list
        const endedList = listEngagement.filter(engage => engage.statut.toLowerCase() === 'ended')
        endedList.forEach(item => {
            totalBenefice += item.interetMontant
        })
        return totalBenefice
    })
    const members = useSelector(state => {
        const list = state.entities.member.list
        const selectedList = list.filter(item => item.associationId === currentAssociation.id)
        const validList = selectedList.filter(member => {
            const isMember = member.relation.toLowerCase() === 'member'
            const isOnLeave = member.relation.toLowerCase() === 'onleave'
            if (isMember || isOnLeave) return true
        })
        return validList
    })
    const notReadInfo = useSelector(state => {
        const list = state.entities.member.memberInfos
        const notRead = list.filter(info => info.member_info.isRead === false)
        return notRead
    })

    const [showDescrip, setShowDescrip] = useState(false)
    const isAuthorized = isAdmin() || isModerator()

    const getStarted = useCallback(async () => {
        dispatch(getAllCotisations({associationId: currentAssociation.id}))
        dispatch(getAllMembers())
        dispatch(getEngagementsByAssociation({associationId:currentAssociation.id}))
        dispatch(getAssociationInfos({associationId: currentAssociation.id}))
        dispatch(getSelectedAssociationMembers({associationId: currentAssociation.id}))
        dispatch(getAllVotes({associationId: currentAssociation.id}))
        if(members.length>0) {
            const currentMember = members.find(item => item.userId === currentUser.id)
            dispatch(getMemberInfos({memberId: currentMember.id}))
            dispatch(getMemberRoles({memberId: currentMember.id}))
        }
    }, [])

    const handleChangeImage = (result) => {
        console.log(result)
    }

    useEffect(() => {
        getStarted()
    }, [])


    return (
        <>
            <ScrollView>
            <AppHeaderGradient/>
            <AssociationBackImage association={currentAssociation} uploadResult={handleChangeImage}/>
         {/*       <Image style={styles.image} source={currentAssociation.avatar?{uri: currentAssociation.avatar}:require('../../assets/peuple_solidaire.png')}/>
                <AppText style={{alignSelf: 'center', marginVertical: 10, fontWeight: 'bold'}}>{currentAssociation.nom}</AppText>*/}
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginVertical: 10,
                    marginHorizontal: 10
                }}>
                    <View style={{alignItems: 'center'}}>
                        <AppText>CM</AppText>
                    <View style={styles.cotisation}>
                        <AppText style={{fontWeight: 'bold'}}>{currentAssociation.cotisationMensuelle}</AppText>
                    </View>
                    </View>
                    <View style={{
                        alignItems: 'center'
                    }}>
                        <AppText>TI</AppText>
                    <View style={styles.cotisation}>
                        <AppText style={{fontWeight: 'bold'}}>{currentAssociation.interetCredit}%</AppText>
                    </View>
                    </View>

                </View>
                <View elevation={10} style={styles.fondsContainer}>
                    <View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', padding:10 }}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <MaterialCommunityIcons name="credit-card" size={24} color={defaultStyles.colors.vert}/>
                        <AppText style={{color: defaultStyles.colors.vert}}>Solde</AppText>
                        </View>
                        <LottieView style={{ width: 100}} autoPlay={true} loop={true} source={require('../../assets/animations/money')}/>
                    </View>
                        <View style={{alignItems: 'center', marginBottom: 20}}>
                            <AppText style={{color: defaultStyles.colors.vert, fontSize: 20}}>{formatFonds(currentAssociation.fondInitial)}</AppText>
                        </View>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <ListItemSeparator width='50%'/>
                    </View>
                    <View style={{justifyContent: 'flex-start', paddingVertical: 20, paddingHorizontal: 10}}>

                            <FondsLabel label='Cotisations' value={getAssociationCotisation().total}/>
                            <FondsLabel label='Invests'
                                        value={getManagedAssociationFund().investAmount} labelStyle={{color: defaultStyles.colors.orange}}
                                        valueStyle={{color: defaultStyles.colors.orange}}
                                        icon='credit-card-clock' iconColor={defaultStyles.colors.orange}/>

                            <FondsLabel label='Gains' labelStyle={{color: defaultStyles.colors.vert}}
                                        value={getManagedAssociationFund().gain} valueStyle={{color: defaultStyles.colors.vert}}
                                        icon='credit-card-plus' iconColor={defaultStyles.colors.vert}/>
                            <FondsLabel label='Depenses' labelStyle={{color: defaultStyles.colors.rougeBordeau}}
                                        value={getManagedAssociationFund().depenseAmount} valueStyle={{color: defaultStyles.colors.rougeBordeau}}
                                        icon='credit-card-minus' iconColor={defaultStyles.colors.rougeBordeau}/>

                    </View>

                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <View>
                    <View
                        style={{
                            flexDirection: 'row',
                            margin: 20
                        }}>
                        <TouchableOpacity onPress={() => setShowDescrip(!showDescrip)}>
                            {!showDescrip && <MaterialCommunityIcons name="plus" size={24} color="black" />}
                            {showDescrip && <MaterialCommunityIcons name="minus" size={24} color="black" />}
                        </TouchableOpacity>
                        <AppText
                            style={{
                                fontWeight: 'bold',
                                marginLeft: 5,
                            }}>Description</AppText>
                    </View>
                    {showDescrip && <View style={{
                        paddingHorizontal: 20
                    }}>
                        <AppText>{currentAssociation.description}</AppText>
                    </View>}
                    </View>

                </View>
                <View style={styles.linkContainer}>
                    <AppLinkButton label='Members'
                                   labelLength={members?.length}
                                   onPress={() => navigation.navigate('Members')}/>
                    <AppLinkButton label='Cotisations'
                                   labelLength={getAssociationCotisation().cotisLenght}
                                   totalAmount={getAssociationCotisation().total}
                                   onPress={() => navigation.navigate('Cotisations')}/>

                    <AppLinkButton label='Engagements'
                                   labelLength={getAssociationEngagementTotal().engagementLenght}
                                   totalAmount={getAssociationEngagementTotal().total}
                                   onPress={() => navigation.navigate('Engagements')}/>
                </View>
                <View style={{
                    marginHorizontal: 20
                }}>
                    <View style={{marginVertical: 10}}>
                    <TouchableOpacity onPress={() => navigation.navigate('NEWS')}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <MaterialCommunityIcons name="newspaper-variant-outline" size={24} color="black" />
                            <AppText style={{color: defaultStyles.colors.bleuFbi, marginLeft: 10}}>News</AppText>
                        </View>
                    </TouchableOpacity>
                    {notReadInfo.length>0 && <View style={styles.notReadInfo}>
                        <AppText style={{color: defaultStyles.colors.rougeBordeau}}>{notReadInfo.length}</AppText>
                    </View>}
                    </View>
                    <View style={{
                        marginVertical: 10
                    }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <MaterialCommunityIcons name="account-multiple-plus" size={24} color="black" />
                        <AppText style={styles.adhesion}
                                 onPress={() => navigation.navigate(routes.NEW_ADHESION)}>Nouvelle adhésion</AppText>
                    </View>
                        {getNewAdhesion().length>0 && <View style={styles.newAdhesionLenght}>
                            <AppText style={{color: defaultStyles.colors.rougeBordeau}}>{getNewAdhesion().length}</AppText>
                        </View>}
                    </View>
                </View>
                <View style={styles.reglement}>
                    <AppText style={{color: defaultStyles.colors.bleuFbi}}> Reglement intérieur</AppText>
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    adhesion: {
      color: defaultStyles.colors.bleuFbi,
        marginLeft: 10
    },
    image: {
        height: 200,
        width: '100%'
    },
    cotisation: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: defaultStyles.colors.white,
      height: 60,
      width: 60,
       borderRadius: 30,
      borderWidth: 1,
      borderColor: defaultStyles.colors.or
    },
    fondsContainer: {
        borderWidth: 4,
        borderColor: defaultStyles.colors.or,
        borderRadius: 30,
        backgroundColor: defaultStyles.colors.white,
        margin: 10
    },
    fondsText: {
      fontSize: 15,
        margin : 5
    },
    link: {
        borderWidth: 1,
        borderColor: defaultStyles.colors.bleuFbi,
        width: '100%',
        padding: 20,
        alignItems: 'center',
        backgroundColor: defaultStyles.colors.white,
        marginVertical: 20,
        borderRadius: 10
    },
    linkText: {
      fontWeight: 'bold',
      fontSize: 20,
      color: defaultStyles.colors.bleuFbi
    },
    linkContainer: {
        alignItems: 'center',
        marginHorizontal: 10
    },
    notReadInfo: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        left: '20%',
        top: -8,
      width: 20,
      height: 20,
      borderRadius:10,
        backgroundColor: defaultStyles.colors.white
    },
    newAdhesionLenght: {
        alignItems: 'center',
        justifyContent: 'center',
      position: 'absolute',
      left: '48%',
      top:-5,
        backgroundColor: defaultStyles.colors.white,
        width: 20,
        height: 20,
        borderRadius: 10,
    },
    reglement: {
      marginVertical: 30,
        marginHorizontal: 30,
        flexDirection: 'row'
    },
    secondFonds: {
        flexDirection: 'row',
    }
})
export default DashboardScreen;