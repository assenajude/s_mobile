import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import EtatEngagementScreen from "../screens/EtatEngagementScreen";
import defaultStyles from "../utilities/styles";
import ListEngagementScreen from "../screens/ListEngagementScreen";
import NewEngagementScreen from "../screens/NewEngagementScreen";

const EngageNavig = createStackNavigator()

function EngagementNavigator(props) {
    return (
        <EngageNavig.Navigator screenOptions={() =>({
            headerStyle: {backgroundColor: defaultStyles.colors.rougeBordeau},
            headerTintColor: defaultStyles.colors.white
        })}>
            <EngageNavig.Screen name='EtatEngagement' component={EtatEngagementScreen} options={{
                title: 'Etat des engagements'
            }}/>
            <EngageNavig.Screen name='NewEngagementScreen' component={NewEngagementScreen} options={{
                title: 'Nouvel engagement'
            }}/>
            <EngageNavig.Screen name='ListEngagementScreen' component={ListEngagementScreen} options={({route}) => ({
                title: 'Engagements de '+route.params?.username,
            })}/>
        </EngageNavig.Navigator>
    );
}

export default EngagementNavigator;