import React from 'react';
import {View, TouchableOpacity, StyleSheet} from "react-native";
import dayjs from "dayjs";
import {MaterialCommunityIcons} from '@expo/vector-icons'
import AppText from "../AppText";
import useManageAssociation from "../../hooks/useManageAssociation";
import MemberItem from "../member/MemberItem";
import defaultStyles from '../../utilities/styles'


function EngagementItem({label, montant, getEngagementDetails, memberAvatar, memberUsername,
                            memberAddress, engagementDetails, statutEngagement,demandDate,
                            validationDate,echeanceDate, showAvatar=true, inList=false}) {
    const {formatFonds} = useManageAssociation()
    return (
        <>
        <TouchableOpacity onPress={getEngagementDetails}>
            <View style={styles.container}>
                <AppText numberOfLines={2} style={{width: '80%', fontWeight: 'bold'}}>{label}</AppText>
                <View style={styles.montant}>
                    <AppText style={{fontSize: 15, fontWeight: 'bold'}}>{formatFonds(montant)}</AppText>
                </View>
                {inList && !engagementDetails && <View>
                    <AppText style={{color: defaultStyles.colors.bleuFbi}}> + Details</AppText>
                </View>}
                {engagementDetails && <View>
                    <View style={styles.detail}>
                        <AppText style={styles.label}>Statut</AppText>
                        <AppText>{statutEngagement}</AppText>
                    </View>
                    <View style={styles.detail}>
                        <AppText style={styles.label}>Date demande</AppText>
                        <AppText>{dayjs(demandDate).format('DD/MM/YYYY HH:mm:ss')}</AppText>
                    </View>
                    <View style={styles.detail}>
                        <AppText style={styles.label}>Date validation</AppText>
                        <AppText>{dayjs(validationDate).format('DD/MM/YYYY HH:mm:ss')}</AppText>
                    </View>
                    <View style={styles.detail}>
                        <AppText style={styles.label}>Date échéance</AppText>
                        <AppText>{dayjs(echeanceDate).format('DD/MM/YYYY HH:mm:ss')}</AppText>
                    </View>
                    <View style={{
                        alignItems: 'flex-end',
                        marginRight: 20
                    }}>
                    <MaterialCommunityIcons name="chevron-up" size={30} color={defaultStyles.colors.dark} />
                    </View>
                </View>}
                {showAvatar && <View style={styles.avatarContainer}>
                    <AppText style={{margin: 10, color: defaultStyles.colors.grey}}>Par</AppText>
                    <MemberItem avatarStyle={styles.avatar} username={memberUsername}
                                avatarSource={memberAvatar} address={memberAddress}/>
                </View>}
                <View style={styles.icon}>
                    {!engagementDetails && <MaterialCommunityIcons name="chevron-down" size={24} color={defaultStyles.colors.dark} />}

                </View>
            </View>
        </TouchableOpacity>
            </>
    );
}

const styles = StyleSheet.create({
    avatar:{
        height: 40,
        width: 40,
        borderRadius: 20
    },
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
    },
    container: {
        marginVertical: 20,
        paddingHorizontal: 10
    },
    detail:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginVertical: 10
    },
    icon: {
      position: 'absolute',
      right: 40,
      top: 40
    },
    label: {
      fontWeight: '900'
    },
    montant: {
        position: 'absolute',
        right: 20,
        top: 10
    }
})
export default EngagementItem;