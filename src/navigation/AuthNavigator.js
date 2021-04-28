import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import StarterScreen from "../screens/StarterScreen";
import ListAssociationScreen from "../screens/ListAssociationScreen";
import NewAssociationScreen from "../screens/NewAssociationScreen";
import defaultStyles from '../utilities/styles'

const AuthNavig = createStackNavigator()

function AuthNavigator(props) {
    return (
        <AuthNavig.Navigator
            screenOptions={() => ({
                headerStyle: {backgroundColor: defaultStyles.colors.rougeBordeau},
                headerTintColor: defaultStyles.colors.white,
            })}>
            <AuthNavig.Screen name='Welcome' component={WelcomeScreen} options={{headerTitle:'Bienvenue', headerTitleAlign: 'center'}}/>
            <AuthNavig.Screen name='LoginScreen' component={LoginScreen} options={{title:'Connectez-vous'}}/>
            <AuthNavig.Screen name='RegisterScreen' component={RegisterScreen} options={{title:'Créer votre compte'}}/>
            <AuthNavig.Screen name='StarterScreen' component={StarterScreen} options={{title:'Vos associations'}}/>
            <AuthNavig.Screen name='ListAssociationScreen' component={ListAssociationScreen} options={{title:'Toutes les associations'}}/>
            <AuthNavig.Screen name='NewAssociationScreen' component={NewAssociationScreen} options={{title:'Nouvelle association'}}/>
        </AuthNavig.Navigator>
    );
}

export default AuthNavigator;