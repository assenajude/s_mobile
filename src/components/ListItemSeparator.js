import React from 'react';
import  {View, StyleSheet} from "react-native";

import defaultStyles from '../utilities/styles'

function ListItemSeparator(props) {
    return (
        <View style={styles.separator}>
        </View>
    );
}

const styles = StyleSheet.create({
    separator: {
        borderColor: defaultStyles.colors.leger,
        borderWidth: 0.5,
        height: 1,
        width: '100%'
    }
})
export default ListItemSeparator;