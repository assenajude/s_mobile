import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {MaterialCommunityIcons, FontAwesome5} from '@expo/vector-icons'

import React from 'react';
import MembersNavigator from "./MembersNavigator";
import AssociationNavigator from "./AssociationNavigator";
import CotisationNavigation from "./CotisationNavigation";
import defaultStyles from '../utilities/styles'
import CompteNavigator from "./CompteNavigator";
import EngagementNavigator from "./EngagementNavigator";

const MainNavig = createBottomTabNavigator();

function MainNavigator(props) {
    return (
        <MainNavig.Navigator tabBarOptions={{
            activeTintColor: defaultStyles.colors.rougeBordeau
        }}>
            <MainNavig.Screen name='Association' component={AssociationNavigator}
                              options={{
                                  tabBarIcon: ({color, size}) => (
                                      <MaterialCommunityIcons name='home-account' size={size} color={color}/>
                                  )
                              }}/>
            <MainNavig.Screen name='Members' component={MembersNavigator}
                              options={{
                                  tabBarIcon: ({size, color}) => (
                                      <MaterialCommunityIcons name='account-group' size={size} color={color}/>
                                  )
                              }}/>
            <MainNavig.Screen name='Cotisations' component={CotisationNavigation}
                              options={{
                                  tabBarIcon: ({size, color}) => (
                                      <FontAwesome5 name="money-check-alt" size={size} color={color} />
                                  )
                              }}/>
            <MainNavig.Screen name='Engagements' component={EngagementNavigator}
                              options={{
                                  tabBarIcon: ({size, color}) => (
                                      <MaterialCommunityIcons name="source-commit" size={size} color={color} />
                                  )
                              }}/>
            <MainNavig.Screen name='Moi' component={CompteNavigator}  options={{
                tabBarIcon: ({color, size}) => (
                    <MaterialCommunityIcons name='account' size={size} color={color}/>
                )
            }}/>
        </MainNavig.Navigator>
    );
}

export default MainNavigator;