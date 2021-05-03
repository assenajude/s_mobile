import React from 'react';
import {View, StyleSheet, FlatList} from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons'

import AppText from "../components/AppText";
import AppAddNewButton from "../components/AppAddNewButton";
import routes from "../navigation/routes";
import {useSelector} from "react-redux";
import MemberListItem from "../components/member/MemberListItem";
import defaultStyles from '../utilities/styles'
import colors from "../utilities/colors";

function EtatCotisationScreen({navigation}) {
    const associationMembers = useSelector(state => state.entities.member.list)

    return (
        <>
            <FlatList data={associationMembers}
                      keyExtractor={item => item.id.toString()}
                      renderItem={({item}) =>
                          <MemberListItem username={item.username?item.username:item.nom}
                                          getMemberDetails={() => navigation.navigate('MemberCotisationScreen',item)}>
                          <View>
                            <MaterialCommunityIcons name="account-check" size={24} color={defaultStyles.colors.bleuFbi} />
                          </View>
                      </MemberListItem>}
            />
        </>
    );
}
export default EtatCotisationScreen;