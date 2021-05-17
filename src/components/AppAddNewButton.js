import React from 'react';
import {View, TouchableWithoutFeedback, StyleSheet} from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons'

import defaultStyles from '../utilities/styles'

function AppAddNewButton({onPress, name="plus-circle-outline"}) {
    return (
            <TouchableWithoutFeedback onPress={onPress}>
                <View elevation={10} style={styles.buttonContainer}>
                    <MaterialCommunityIcons name={name} size={40} color={defaultStyles.colors.white} />
                </View>
            </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: defaultStyles.colors.rougeBordeau
    }
})
export default AppAddNewButton;