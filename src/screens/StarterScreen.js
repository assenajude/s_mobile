import React, {useCallback, useEffect} from 'react';
import {ScrollView, View, StyleSheet} from "react-native";
import AppText from "../components/AppText";
import {useDispatch, useSelector} from "react-redux";
import {getMemberAssociations} from "../store/slices/memberSlice";
import AppButton from "../components/AppButton";
import routes from "../navigation/routes";
import {getLoggedIn} from "../store/slices/authSlice";
import AssociationItem from "../components/association/AssociationItem";
import {getAllAssociation, setSelectedAssociation} from "../store/slices/associationSlice";
import AppActivityIndicator from "../components/AppActivityIndicator";
import defaultStyles from '../utilities/styles'

function StarterScreen({navigation}) {
    const dispatch = useDispatch()

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
            {memberAssociations.length > 0 && <ScrollView>
                {memberAssociations.map((item) =>
                    <AssociationItem key={item.id.toString()}
                        nom={item.nom}
                        relationType={item.associated_member.relation}
                        isMember={true}
                        onPress={() => handleGoToDashboard(item)}
                        nameStyle={{color: defaultStyles.colors.bleuFbi}}
                    />)}
            </ScrollView>}
            <View style={{padding: 10}}>
                <AppButton title='Adherer à une association' onPress={() => navigation.navigate(routes.ASSOCIATION_LIST)}/>
                <AppButton  onPress={() => dispatch(getLoggedIn())} title='Aller au menu'/>
            </View>
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