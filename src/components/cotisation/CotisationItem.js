import React from 'react';
import {View,TouchableWithoutFeedback, StyleSheet} from "react-native";
import AppText from "../AppText";

function CotisationItem({creationDate, montant, motif, cotisationDetail}) {
    return (
            <View>
               {!cotisationDetail && <TouchableWithoutFeedback style={styles.itemContainer}>
                    <AppText>{creationDate}</AppText>
                    <AppText>{montant}</AppText>
                </TouchableWithoutFeedback>}
                {cotisationDetail && <View>
                    <AppText>{creationDate}</AppText>
                    <AppText>{montant}</AppText>
                    <AppText>{motif}</AppText>
                </View>}
            </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row'
    }
})
export default CotisationItem;