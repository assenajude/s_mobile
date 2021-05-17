import React, {useEffect} from 'react';
import {View, FlatList, StyleSheet} from "react-native";
import {useSelector} from "react-redux";
import MemberListItem from "../components/member/MemberListItem";
import AppText from "../components/AppText";
import AppAddNewButton from "../components/AppAddNewButton";
import routes from "../navigation/routes";
import ListItemSeparator from "../components/ListItemSeparator";
import useManageAssociation from "../hooks/useManageAssociation";

function MembersListScreen({navigation}) {
    const {associationValidMembers} = useManageAssociation()

    useEffect(() => {
    }, [])

    return (
        <>
            {associationValidMembers().length===0 && <View style={styles.emptyStyle}>
                <AppText>Aucun membre trouvé</AppText>
            </View>}

           {associationValidMembers()?.length>0 &&
           <FlatList data={associationValidMembers()}
                      keyExtractor={item => item.id.toString()}
                     ItemSeparatorComponent={ListItemSeparator}
                      renderItem={({item}) =>
                          <MemberListItem memberAddress={item.email?item.email : item.phone}
                              username={item.username?item.username:item.nom}
                              childrenStyle={{top: 30}}
                              getMemberDetails={() => navigation.navigate('MemberDetails', item)}>
                              <AppText>{item.member.statut}</AppText>
                          </MemberListItem>
                      }
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