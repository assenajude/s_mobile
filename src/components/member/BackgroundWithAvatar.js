import React from 'react';
import {Image, View, StyleSheet} from "react-native";
import AppText from "../AppText";

function BackgroundWithAvatar({fondSource, memberUsername, memberEmail, memberAvatar}) {
    return (
        <View>
            <Image style={styles.fontImage} source={fondSource}/>
            <View style={styles.cameraContainer}>
                <View style={styles.mainInfo}>
                    <AppText style={{fontWeight: 'bold'}}>{memberUsername}</AppText>
                    <AppText>{memberEmail}</AppText>
                </View>
            </View>
            <Image style={styles.avatar} source={memberAvatar}/>
        </View>
    );
}
const styles = StyleSheet.create({
    avatar: {
        borderRadius: 30,
        bottom:30,
        position: 'absolute',
        height: 60,
        left: 30,
        width: 60
    },
    cameraContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    fontImage: {
        height: 200
    },
    mainInfo: {
        marginLeft:'25%',
        marginTop: 10,
    }
})
export default BackgroundWithAvatar;