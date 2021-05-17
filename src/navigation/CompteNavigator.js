import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import CompteScreen from "../screens/CompteScreen";
import defaultStyles from "../utilities/styles";
import EditMemberImageScreen from "../screens/EditMemberImageScreen";
import AppText from "../components/AppText";
import {View, TouchableOpacity} from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {getLogout} from "../store/slices/authSlice";
import {useDispatch} from "react-redux";

const CompteNavig = createStackNavigator()

function CompteNavigator(props) {
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(getLogout())
    }

    return (
        <CompteNavig.Navigator screenOptions={() => ({
            headerStyle: {backgroundColor: defaultStyles.colors.rougeBordeau},
            headerTintColor: defaultStyles.colors.white,
            headerRight: () =>
                <TouchableOpacity onPress={handleLogout}>
                    <View style={{alignItems: 'center', marginRight: 10}}>
                        <MaterialCommunityIcons name="logout" size={24} color={defaultStyles.colors.white} />
                        <AppText style={{color: defaultStyles.colors.white}}>Fermer</AppText>
                    </View>
                </TouchableOpacity>

        })}>
            <CompteNavig.Screen name='Compte' component={CompteScreen}/>
            <CompteNavig.Screen name='EditImage' component={EditMemberImageScreen} options={{
                title: 'Editeur de profile'
            }}/>
        </CompteNavig.Navigator>
    );
}

export default CompteNavigator;