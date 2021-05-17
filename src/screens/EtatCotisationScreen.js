import React, {useEffect} from 'react';
import {View, FlatList, StyleSheet} from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons'

import AppText from "../components/AppText";
import {useSelector} from "react-redux";
import MemberListItem from "../components/member/MemberListItem";
import defaultStyles from '../utilities/styles'
import ListItemSeparator from "../components/ListItemSeparator";
import useCotisation from "../hooks/useCotisation";
import useManageAssociation from "../hooks/useManageAssociation";

function EtatCotisationScreen({navigation}) {
    const {getMemberCotisations, checkCotisationUpToDate} = useCotisation()
    const {formatFonds, associationValidMembers} = useManageAssociation()

    useEffect(() => {
    }, [])
    return (
        <>
            <FlatList data={associationValidMembers()}
                      keyExtractor={item => item.id.toString()}
                      ItemSeparatorComponent={ListItemSeparator}
                      renderItem={({item}) =>
                          <MemberListItem memberAddress={item.email?item.email: item.phone}
                              username={item.username?item.username:item.nom}
                              getMemberDetails={() => navigation.navigate('MemberCotisationScreen',item)}>
                              <AppText style={{marginHorizontal: 10}}>({getMemberCotisations(item).cotisationLenght})</AppText>
                              <AppText style={{marginHorizontal: 10}}>{formatFonds(getMemberCotisations(item).totalCotisation)}</AppText>
                          <View style={styles.checker}>
                            {checkCotisationUpToDate(item) && <MaterialCommunityIcons name="account-check" size={24} color={defaultStyles.colors.vert} />}
                              {!checkCotisationUpToDate(item) && <MaterialCommunityIcons name="account-alert" size={24} color="orange" />}
                          </View>
                      </MemberListItem>}
            />
        </>
    );
}
const styles = StyleSheet.create({
    checker: {
        position: 'absolute',
        right: 5,
        top: -35
    }
})
export default EtatCotisationScreen;