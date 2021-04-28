import React, {useEffect} from 'react';
import {View, Text, FlatList, StyleSheet} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {getAssociationMembers} from "../store/slices/associationSlice";
import MemberItem from "../components/member/MemberItem";
import AppText from "../components/AppText";
import AppAddNewButton from "../components/AppAddNewButton";
import routes from "../navigation/routes";

function MembersListScreen({navigation}) {
    const dispatch = useDispatch()
    const selectedAssociation = useSelector(state => state.entities.association.selectedAssociation)
    const associationMembers = useSelector(state => state.entities.member.list)

    useEffect(() => {
    }, [])

    return (
        <>
            {associationMembers.length===0 && <View style={styles.emptyStyle}>
                <AppText>Aucun membre trouvé</AppText>
            </View>}

           {associationMembers.length>0 && <FlatList data={associationMembers}
                      keyExtractor={item => item.id.toString()}
                      renderItem={({item}) =><MemberItem nom={item.username}/>}
            />}
            <View style={styles.addNew}>
                <AppAddNewButton onPress={() => navigation.navigate(routes.NEW_MEMBER)}/>
            </View>
        </>
    );
}
const styles = StyleSheet.create({
    addNew: {
        position: 'absolute',
        bottom: 40,
        right: 20
    },
    emptyStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default MembersListScreen;