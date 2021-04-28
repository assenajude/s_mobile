import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from "react-native";
import colors from "../utilities/colors";

function AppButton({title, otherButtonStyle, textStyle, onPress}) {
    return (
        <TouchableOpacity style={[styles.buttonStyle, otherButtonStyle]} onPress={onPress}>
                <Text style={[styles.textStyle, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.bleuFbi,
        height: 50,
        marginVertical: 10,
        width: '100%',
        borderRadius: 40
    },
    textStyle: {
        color: colors.white,
        fontSize: 18
    }
})
export default AppButton;