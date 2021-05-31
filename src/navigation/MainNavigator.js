import {createStackNavigator} from '@react-navigation/stack'

const MainNavig = createStackNavigator()

import React from 'react';
import AuthNavigator from "./AuthNavigator";
import BottomTabNavigator from "./BottomTabNavigator";

function MainNavigator(props) {
    return (
        <MainNavig.Navigator>
            <MainNavig.Screen name='Auth' component={AuthNavigator}/>
            <MainNavig.Screen name='TabNavigator' component={BottomTabNavigator}/>
        </MainNavig.Navigator>
    );
}

export default MainNavigator;