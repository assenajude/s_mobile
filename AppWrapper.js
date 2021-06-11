import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import MainNavigator from "./src/navigation/MainNavigator";

function AppWrapper(props) {
    return (
        <NavigationContainer>
            <MainNavigator/>
        </NavigationContainer>
    );
}

export default AppWrapper;