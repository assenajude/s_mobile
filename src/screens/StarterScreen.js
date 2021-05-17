import React, {useEffect} from 'react';
import {View, StyleSheet, TouchableWithoutFeedback, FlatList} from "react-native";
import AppText from "../components/AppText";
import {useDispatch, useSelector} from "react-redux";
import {getAllMembers, getMemberAssociations} from "../store/slices/memberSlice";
import routes from "../navigation/routes";
import {getLoggedIn} from "../store/slices/authSlice";
import AssociationItem from "../components/association/AssociationItem";
import {setSelectedAssociation} from "../store/slices/associationSlice";
import AppActivityIndicator from "../components/AppActivityIndicator";
import defaultStyles from '../utilities/styles'
import useAuth from "../hooks/useAuth";
import ListItemSeparator from "../components/ListItemSeparator";
import AppButton from "../components/AppButton";
import useManageAssociation from "../hooks/useManageAssociation";

function StarterScreen({navigation}) {
    const dispatch = useDispatch()
    const {isAdmin} = useAuth()
    const {getMemberRelationType, getAssociatonAllMembers} = useManageAssociation()

    const currentUser = useSelector(state => state.auth.user)
    const isLoading = useSelector(state => state.entities.association.loading)
    const memberAssociations = useSelector(state => state.entities.member.memberAssociations)

    const handleGoToDashboard = (association) => {
        const isMember = getMemberRelationType(association).toLowerCase() === 'member'
        const isOnLeave = getMemberRelationType(association).toLowerCase() === 'onleave'

        if(isMember || isOnLeave) {
        dispatch(getLoggedIn())
        dispatch(setSelectedAssociation(association))
        } else
            alert("Vous n'êtes pas encore membre de cette association")
    }

    useEffect(() => {
        dispatch(getAllMembers())
        dispatch(getMemberAssociations())
    }, [])


    return (
        <>
            <AppActivityIndicator visible={isLoading}/>
            {memberAssociations.length === 0 && !isLoading && <View style={styles.emptyStyle}>
                <AppText>Vous n'appartenez à aucune association</AppText>
            </View>}
               {isAdmin() && <View style={{
                    flexDirection:'row',
                    justifyContent: 'space-between',
                    padding:20
                }}>
                    <TouchableWithoutFeedback onPress={() => dispatch(getLoggedIn())}>
                        <AppText style={{color: defaultStyles.colors.bleuFbi}}>Aller au menu</AppText>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate(routes.ASSOCIATION_LIST)}>
                        <AppText style={{color: defaultStyles.colors.bleuFbi}}>Adherer</AppText>
                    </TouchableWithoutFeedback>
                </View>}
                <ListItemSeparator/>
            {memberAssociations.length > 0 &&
                <FlatList
                    data={memberAssociations}
                    keyExtractor={item => item.id.toString()}
                    numColumns={2}
                    renderItem={({item}) =>
                        <AssociationItem
                            nom={item.nom}
                            relationType={getMemberRelationType(item)}
                            isMember={getAssociatonAllMembers(item)?.some(member => member.userId === currentUser.id)}
                            onPress={() => handleGoToDashboard(item)}
                            nameStyle={{color: defaultStyles.colors.bleuFbi}}
                        />}
                />
            }

            {!isAdmin() && <View style={{
                paddingHorizontal: 20,
                paddingVertical: 20
            }}>
                <AppButton title='Adherer à une association'
                           onPress={() => navigation.navigate(routes.ASSOCIATION_LIST)}/>
            </View>}
            </>
    );
}

const styles = StyleSheet.create({
    emptyStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default StarterScreen;