import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import MembersListScreen from "../screens/MembersListScreen";
import defaultStyles from "../utilities/styles";
import NewMemberScreen from "../screens/NewMemberScreen";

const MemberNavig = createStackNavigator()

function MembersNavigator(props) {
    return (
        <MemberNavig.Navigator screenOptions={() => ({
            headerStyle: {backgroundColor: defaultStyles.colors.rougeBordeau},
            headerTintColor: defaultStyles.colors.white
        })}>
            <MemberNavig.Screen name='List' component={MembersListScreen} options={() => ({
                title: 'Liste des membres'
            })}/>
            <MemberNavig.Screen name='NewMemberScreen' component={NewMemberScreen} options={() => ({
                title: 'Nouveau membre'
            })}/>
        </MemberNavig.Navigator>
    );
}

export default MembersNavigator;