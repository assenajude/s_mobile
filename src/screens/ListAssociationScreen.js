import React, {useEffect, useCallback} from 'react';
import {View, StyleSheet, FlatList} from "react-native";
import useAuth from "../hooks/useAuth";
import AppAddNewButton from "../components/AppAddNewButton";
import routes from "../navigation/routes";
import {useDispatch, useSelector} from "react-redux";
import AppText from "../components/AppText";
import {getAllAssociation, sendAdhesionMessage} from "../store/slices/associationSlice";
import AppActivityIndicator from "../components/AppActivityIndicator";
import AssociationItem from "../components/association/AssociationItem";
import useManageAssociation from "../hooks/useManageAssociation";

function ListAssociationScreen({navigation}) {
    const {isAdmin} = useAuth()
    const {getMemberRelationType} = useManageAssociation()
    const dispatch = useDispatch()

    const connectedMember = useSelector(state => state.auth.user)
    const associationList = useSelector(state => state.entities.association.list)
    const isLoadding = useSelector(state=> state.entities.association.loading)



    const handleSendAdhesionMessage = (item) => {
        const data = {
            associationId: item.id,
            memberId: connectedMember.id,
            motif: 'adhesion'
        }
        dispatch(sendAdhesionMessage(data))
    }

    const allAssociations = useCallback(() => {
        dispatch(getAllAssociation())
    }, [])

    useEffect(() => {
        allAssociations()
    }, [])

    return (
        <>
            <AppActivityIndicator visible={isLoadding}/>
            {associationList?.length === 0 && <View style={styles.emptyStyle}>
                <AppText>Aucune association trouvée</AppText>
            </View>}
            {associationList?.length > 0 &&
            <FlatList
                data={associationList}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) =>
                    <AssociationItem
                        nom={item.nom}
                        sendAdhesionMessage={() => handleSendAdhesionMessage(item)}
                        isMember={item.members?.some(member => member.id === connectedMember.id)}
                        relationType={getMemberRelationType(item)}
                    />}
            />}
            {isAdmin() && <View style={styles.addNew}>
                <AppAddNewButton onPress={() => navigation.navigate(routes.NEW_ASSOCIATION)}/>
            </View>}
        </>
    );
}

const styles = StyleSheet.create({
    addNew: {
        position: 'absolute',
        bottom: 20,
        right: 20
    },
    emptyStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default ListAssociationScreen;