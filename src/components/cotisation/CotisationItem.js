import React from 'react';
import {View,TouchableWithoutFeedback, StyleSheet} from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons'
import AppText from "../AppText";
import dayjs from "dayjs";
import useManageAssociation from "../../hooks/useManageAssociation";

function CotisationItem({datePayement, montant, details, cotisationDetail, getCotisationDetails}) {
    const {formatFonds} = useManageAssociation()
    return (
            <View>
                <View>
                    <View style={styles.itemContainer}>
                    <View style={{
                        flexDirection:'row'
                    }}>
                        <TouchableWithoutFeedback onPress={getCotisationDetails}>
                            <MaterialCommunityIcons name='plus' size={24} color='black'/>
                        </TouchableWithoutFeedback>
                        <AppText style={{marginLeft: 5, fontWeight: 'bold'}}>{dayjs(datePayement).format('DD/MM/YYYY HH:mm:ss')}</AppText>
                    </View>
                    <AppText style={{fontWeight: 'bold'}}>{formatFonds(montant)}</AppText>
                    </View>
                </View>
                {cotisationDetail && <View>
                    <AppText>{details}</AppText>
                </View>}
            </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingVertical: 20
    }
})
export default CotisationItem;