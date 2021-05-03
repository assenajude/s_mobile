import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import MembersListScreen from "../screens/MembersListScreen";
import defaultStyles from "../utilities/styles";
import NewMemberScreen from "../screens/NewMemberScreen";
import MemberDetails from "../screens/MemberDetails";
import MemberCotisationScreen from "../screens/MemberCotisationScreen";
import MemberEngagementScreen from "../screens/MemberEngagementScreen";

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
            <MemberNavig.Screen name='MemberDetails' component={MemberDetails} options={({route}) => ({
                title: 'Membre '+route.params?.nom,
            })}/>

            <MemberNavig.Screen name='MemberEngagementScreen' component={MemberEngagementScreen} options={({route}) => ({
                title: 'Engagements de '+route.params?.nom,
            })}/>
        </MemberNavig.Navigator>
    );
}

export default MembersNavigator;