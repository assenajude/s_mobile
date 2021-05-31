import React from 'react';
import {View, Text, ImageBackground, StyleSheet} from "react-native";
import AppButton from "../components/AppButton";
import colors from "../utilities/colors";
import routes from "../navigation/routes";
import AppHeaderGradient from "../components/AppHeaderGradient";

function WelcomeScreen({navigation}) {
    return (
        <>
            <AppHeaderGradient/>
        <ImageBackground blurRadius={1} style={styles.container} source={require('../../assets/solidariteImg.jpg')}>
            <View style={styles.buttonStyle}>
                <AppButton title='Se connecter' onPress={() => navigation.navigate(routes.LOGIN)}/>
                <AppButton otherButtonStyle={{backgroundColor: colors.orange}}
                           title='Créer un compte' onPress={() => navigation.navigate(routes.REGISTER)}/>
            </View>
        </ImageBackground>
    </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    buttonStyle: {
        padding: 20,
        paddingBottom: 5
    }
})

export default WelcomeScreen;