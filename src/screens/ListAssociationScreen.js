import React, {useEffect, useCallback} from 'react';
import {View, StyleSheet, FlatList} from "react-native";
import useAuth from "../hooks/useAuth";
import AppAddNewButton from "../components/AppAddNewButton";
import routes from "../navigation/routes";
import {useDispatch, useSelector} from "react-redux";
import AppText from "../components/AppText";
import {getAllAssociation} from "../store/slices/associationSlice";
import AppActivityIndicator from "../components/AppActivityIndicator";
import AssociationItem from "../components/association/AssociationItem";
import useManageAssociation from "../hooks/useManageAssociation";
import {sendAdhesionMessage} from "../store/slices/memberSlice";

function ListAssociationScreen({navigation}) {
    const {isAdmin} = useAuth()
    const {getMemberRelationType, getAssociatonAllMembers} = useManageAssociation()
    const dispatch = useDispatch()

    const connectedMember = useSelector(state => state.auth.user)
    const associationList = useSelector(state => state.entities.association.list)
    const isLoadding = useSelector(state=> state.entities.association.loading)



    const handleSendAdhesionMessage = (item) => {
        const data = {
            associationId: item.id,
            userId: connectedMember.id,
            relation: 'onDemand'
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
            {associationList?.length === 0 && !isLoadding && <View style={styles.emptyStyle}>
                <AppText>Aucune association trouvée</AppText>
            </View>}
            {associationList?.length > 0 &&
            <FlatList
                data={associationList}
                keyExtractor={item => item.id.toString()}
                numColumns={2}
                renderItem={({item}) =>
                    <AssociationItem
                        association={item}
                        onPress={() => navigation.navigate(routes.ASSOCIATION_DETAILS,item)}
                        sendAdhesionMessage={() => handleSendAdhesionMessage(item)}
                        isMember={getAssociatonAllMembers(item)?.some(member => member.userId === connectedMember.id)}
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