import React from 'react';
import {View, TouchableWithoutFeedback, StyleSheet} from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons'

import defaultStyles from '../utilities/styles'

function AppAddNewButton({onPress}) {
    return (
            <TouchableWithoutFeedback onPress={onPress}>
                <View style={styles.buttonContainer}>
                    <MaterialCommunityIcons name="plus-circle-outline" size={40} color={defaultStyles.colors.white} />
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