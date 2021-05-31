import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import MemberCompteScreen from "../screens/MemberCompteScreen";
import defaultStyles from "../utilities/styles";
import EditMemberImageScreen from "../screens/EditMemberImageScreen";
import AppText from "../components/AppText";
import {View, TouchableOpacity} from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {useDispatch} from "react-redux";
import {getLogout} from "../store/slices/authSlice";

const MemberCompteNavig = createStackNavigator()

function MemberCompteNavigator({navigation}) {
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(getLogout())
        // navigation.navigate('AuthNavigator')
    }

    return (
        <MemberCompteNavig.Navigator screenOptions={() => ({
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
            <MemberCompteNavig.Screen name='Compte' component={MemberCompteScreen}/>
            <MemberCompteNavig.Screen name='EditImage' component={EditMemberImageScreen} options={{
                title: 'Editeur de profile'
            }}/>
        </MemberCompteNavig.Navigator>
    );
}

export default MemberCompteNavigator;