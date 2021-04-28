import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import EtatCotisationScreen from "../screens/EtatCotisationScreen";
import defaultStyles from "../utilities/styles";

const CotisationNavig = createStackNavigator()


function CotisationNavigation(props) {
    return (
        <CotisationNavig.Navigator screenOptions={() => ({
            headerStyle: {backgroundColor: defaultStyles.colors.rougeBordeau},
            headerTintColor: defaultStyles.colors.white
        })}>
            <CotisationNavig.Screen name='EtatCotisationScreen' component={EtatCotisationScreen}/>
        </CotisationNavig.Navigator>
    );
}

export default CotisationNavigation;