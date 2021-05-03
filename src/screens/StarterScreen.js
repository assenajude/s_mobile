import React, {useCallback, useEffect} from 'react';
import {ScrollView, View, StyleSheet, TouchableWithoutFeedback} from "react-native";
import AppText from "../components/AppText";
import {useDispatch, useSelector} from "react-redux";
import {getMemberAssociations} from "../store/slices/memberSlice";
import AppButton from "../components/AppButton";
import routes from "../navigation/routes";
import {getLoggedIn} from "../store/slices/authSlice";
import AssociationItem from "../components/association/AssociationItem";
import {setSelectedAssociation} from "../store/slices/associationSlice";
import AppActivityIndicator from "../components/AppActivityIndicator";
import defaultStyles from '../utilities/styles'
import useAuth from "../hooks/useAuth";
import ListItemSeparator from "../components/ListItemSeparator";

function StarterScreen({navigation}) {
    const dispatch = useDispatch()
    const {isAdmin} = useAuth()

    const isLoading = useSelector(state => state.entities.association.loading)
    const memberAssociations = useSelector(state => {
        const list = state.entities.member.memberAssociations
        const validList = list.filter(ass => ass.associated_member.relation.toLowerCase() === 'valid')
        return validList
    })



    const handleGoToDashboard = (association) => {
        dispatch(getLoggedIn())
        dispatch(setSelectedAssociation(association))
    }

    useEffect(() => {
        dispatch(getMemberAssociations())
    }, [])


    return (
        <>
            <AppActivityIndicator visible={isLoading}/>
            {memberAssociations.length === 0 && <View style={styles.emptyStyle}>
                <AppText>Vous n'appartenez à aucune association</AppText>
            </View>}
                <View style={{
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
                </View>
                <ListItemSeparator/>
            {memberAssociations.length > 0 && <ScrollView centerContent={true}>
                {memberAssociations.map((item) =>
                    <AssociationItem key={item.id.toString()}
                        nom={item.nom}
                        relationType={item.associated_member.relation}
                        isMember={true}
                        onPress={() => handleGoToDashboard(item)}
                        nameStyle={{color: defaultStyles.colors.bleuFbi}}
                    />)}
            </ScrollView>}
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