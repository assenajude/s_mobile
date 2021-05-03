import React from 'react';
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {createStackNavigator} from "@react-navigation/stack";
import EtatCotisationScreen from "../screens/EtatCotisationScreen";
import defaultStyles from "../utilities/styles";
import NewCotisationScreen from "../screens/NewCotisationScreen";
import MemberCotisationScreen from "../screens/MemberCotisationScreen";
import {TouchableWithoutFeedback} from "react-native";

const CotisationNavig = createStackNavigator()

function CotisationNavigation(props) {

    return (
        <CotisationNavig.Navigator screenOptions={() => ({
            headerStyle: {backgroundColor: defaultStyles.colors.rougeBordeau},
            headerTintColor: defaultStyles.colors.white
        })}>
            <CotisationNavig.Screen name='EtatCotisationScreen' component={EtatCotisationScreen}
                                    options={{
                                        title: 'Etat des cotisations'
                                    }}/>
            <CotisationNavig.Screen name='NewCotisationScreen' component={NewCotisationScreen}
                                    options={{
                                        title: 'Nouvelle cotisation'
                                    }}/>
            <CotisationNavig.Screen name='MemberCotisationScreen' component={MemberCotisationScreen} options={({route, navigation}) => ({
                title: 'Cotisations de '+route.params?.username || +route.params.nom,
            })}/>
        </CotisationNavig.Navigator>
    );
}

export default CotisationNavigation;