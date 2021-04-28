import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import AuthNavigator from "./src/navigation/AuthNavigator";
import MainNavigator from "./src/navigation/MainNavigator";
import {useSelector} from "react-redux";

function AppWrapper(props) {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    return (
        <NavigationContainer>
            {!isLoggedIn && <AuthNavigator/>}
            {isLoggedIn && <MainNavigator/>}
        </NavigationContainer>
    );
}

export default AppWrapper;