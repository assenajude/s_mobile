import React from 'react';
import AppText from "./AppText";
import {View, StyleSheet} from "react-native";

function AppSimpleLabelWithValue({label, labelValue}) {
    return (
        <View style={styles.container}>
            <AppText style={{fontWeight: 'bold'}}>{label}</AppText>
            <AppText style={{
                marginLeft: '20%'
            }}>{labelValue}</AppText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    flexDirection: 'row',
        alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10
}
})
export default AppSimpleLabelWithValue;