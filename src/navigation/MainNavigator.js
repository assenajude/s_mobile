import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import React from 'react';
import DashboardScreen from "../screens/DashboardScreen";
import MembersListScreen from "../screens/MembersListScreen";
import CompteScreen from "../screens/CompteScreen";
import AllEngagementScreen from "../screens/AllEngagementScreen";
import MembersNavigator from "./MembersNavigator";
import AssociationNavigator from "./AssociationNavigator";
import CotisationNavigation from "./CotisationNavigation";

const MainNavig = createBottomTabNavigator();

function MainNavigator(props) {
    return (
        <MainNavig.Navigator>
            <MainNavig.Screen name='Association' component={AssociationNavigator}/>
            <MainNavig.Screen name='Members' component={MembersNavigator}/>
            <MainNavig.Screen name='Cotisations' component={CotisationNavigation}/>
            <MainNavig.Screen name='Engagements' component={AllEngagementScreen}/>
            <MainNavig.Screen name='Compte' component={CompteScreen}/>
        </MainNavig.Navigator>
    );
}

export default MainNavigator;