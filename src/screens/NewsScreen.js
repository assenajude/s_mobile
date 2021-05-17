import React from 'react';
import {View, StyleSheet, FlatList} from "react-native";
import AppAddNewButton from "../components/AppAddNewButton";
import routes from "../navigation/routes";
import {useDispatch, useSelector} from "react-redux";
import InformationItem from "../components/information/InformationItem";
import ListItemSeparator from "../components/ListItemSeparator";
import useManageAssociation from "../hooks/useManageAssociation";
import {readMemberInfos} from "../store/slices/memberSlice";
import useInfo from "../hooks/useInfo";
import {showInfoDetails} from "../store/slices/informationSlice";

function NewsScreen({navigation}) {
    const dispatch = useDispatch()
    const {getMemberInfoState} = useInfo()
    const currentUser = useSelector(state => state.auth.user)
    const currentAssociation = useSelector(state => state.entities.association.selectedAssociation)
    const members = useSelector(state => {
        const list = state.entities.member.list
        const selectedList = list.filter(item => item.associationId === currentAssociation.id)
        return selectedList
    })
    const infos = useSelector(state => state.entities.information.list)

    const handleReadInfo = (info) => {
        const infoState = getMemberInfoState(info)
        if(infoState) {
            dispatch(showInfoDetails(info))
            return;
        }
        dispatch(showInfoDetails(info))
        const currentMember = members.find(item => item.userId === currentUser.id)
        const data = {
            informationId: info.id,
            memberId: currentMember.id
        }
        dispatch(readMemberInfos(data))
    }

    return (
        <>
            <FlatList
                data={infos}
                keyExtractor={item => item.id.toString()}
                ItemSeparatorComponent={ListItemSeparator}
                renderItem={({item}) =>
                    <InformationItem
                        infoDetail={item.showDetail}
                        onPress={() => handleReadInfo(item)}
                        title={item.title}
                        content={item.content}
                        infoRead={getMemberInfoState(item)}
                        dateDebut={item.dateDebut}
                        dateFin={item.dateFin}
                    />}
            />
            <View style={styles.addNew}>
                <AppAddNewButton onPress={() => navigation.navigate(routes.NEW_INFO)}/>
            </View>
        </>


    );
}

const styles = StyleSheet.create({
    addNew: {
        position: 'absolute',
        right: 20,
        bottom: 20
    }
})

export default NewsScreen;