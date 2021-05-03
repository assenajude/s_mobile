import React, {useState} from 'react';
import {View, TouchableWithoutFeedback} from "react-native";
import {createStackNavigator} from '@react-navigation/stack'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import DashboardScreen from "../screens/DashboardScreen";
import AppLabelWithIcon from "../components/AppLabelWithIcon";
import AssociationModal from "../components/association/AssociationModal";
import {useSelector} from "react-redux";
import defaultStyles from "../utilities/styles";

const AssocNavig = createStackNavigator()

function AssociationNavigator(props) {

    const [associationModalVisible, setAssociationModalVisible] = useState(false)
    const memberAssociations = useSelector(state => {
        const list = state.entities.member.memberAssociations
        const validList = list.filter(ass => ass.associated_member?.relation.toLowerCase() === 'valid')
        return validList
    })

    const handleShowAssociationModal = () => {
        setAssociationModalVisible(!associationModalVisible)
    }

    const handleSelectAssociation = (item) => {
        console.log(item)
        setAssociationModalVisible(false)
    }

    return (
        <>
        <AssocNavig.Navigator screenOptions={() => ({
            headerStyle: {backgroundColor: defaultStyles.colors.rougeBordeau},
            headerTintColor: defaultStyles.colors.white
        })}>
            <AssocNavig.Screen
                name='DashboardScreen'
                component={DashboardScreen}
                options={() =>({
                    headerTitle: () =>
                        <AppLabelWithIcon
                            icon='tablet-dashboard'
                            label='Dashboard'
                        />,
                    headerRight: () => <TouchableWithoutFeedback onPress={handleShowAssociationModal}>
                        <View style={{
                            padding: 20
                        }}>
                            <MaterialCommunityIcons name="group" size={30} color={defaultStyles.colors.white} />
                        </View>
                    </TouchableWithoutFeedback>
                })}/>
        </AssocNavig.Navigator>

            <AssociationModal visible={associationModalVisible}
                              closeModal={() => setAssociationModalVisible(false)}
                              associations={memberAssociations}
                              selectAssociation={val=>handleSelectAssociation(val)}
            />
            </>
    );
}

export default AssociationNavigator;