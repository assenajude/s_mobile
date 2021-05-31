import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import AuthNavigator from "./src/navigation/AuthNavigator";
import BottomTabNavigator from "./src/navigation/BottomTabNavigator";
import {useSelector} from "react-redux";

function AppWrapper(props) {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    return (
        <NavigationContainer>
            {!isLoggedIn && <AuthNavigator/>}
            {isLoggedIn && <BottomTabNavigator/>}
        </NavigationContainer>
    );
}

export default AppWrapper;