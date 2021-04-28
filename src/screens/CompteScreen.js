import React from 'react';
import {View, Text, TouchableOpacity} from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {getLoggedIn} from "../store/slices/authSlice";
import {useDispatch} from "react-redux";

function CompteScreen(props) {
    const dispatch = useDispatch()
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <TouchableOpacity onPress={() => dispatch(getLoggedIn())}>
                    <MaterialCommunityIcons name='logout' size={30} color='red'/>
            </TouchableOpacity>
            <Text>user Compte screen</Text>
        </View>
    );
}

export default CompteScreen;