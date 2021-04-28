import React from 'react';
import {View, Modal, TouchableOpacity, StyleSheet, ScrollView, Image, TouchableWithoutFeedback} from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons'
import defaultStyles from '../../utilities/styles'
import AppText from "../AppText";

function AssociationModal({visible, closeModal, associations, selectAssociation}) {

    return (
        <Modal visible={visible} transparent>
            <View style={styles.mainContainer}>

            </View>
            <View style={styles.modalContainer}>
                <TouchableOpacity style={{
                    alignSelf: 'flex-end',
                }} onPress={closeModal}>
                    <MaterialCommunityIcons
                        style={{fontWeight: 'bold'}} name="close" size={24}
                        color={defaultStyles.colors.rougeBordeau} />
                </TouchableOpacity>
                <ScrollView horizontal>
                    {associations.map((item) => <TouchableWithoutFeedback
                        key={item.id.toString()}
                        onPress={() => selectAssociation(item)}
                        >
                        <View style={styles.associationContainer}>
                            <Image style={styles.image} source={require('../../../assets/peuple_solidaire.png')}/>
                            <View>
                                <AppText numberOfLines={1} style={styles.nom}>{item.nom}</AppText>
                            </View>
                        </View>
                        </TouchableWithoutFeedback>
                       )}
                </ScrollView>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
       height: '100%',
        width: '100%',
        opacity: 0.7,
       backgroundColor: defaultStyles.colors.dark
    },
    modalContainer: {
        backgroundColor: defaultStyles.colors.white,
        height: '80%',
        width: '100%',
        top: 80,
        position: 'absolute',
        padding: 10
    },
    image: {
        height:80,
        width: 80,
        borderRadius: 40
    },
    associationContainer: {
        alignItems: 'center',
    },
    nom: {
        color: defaultStyles.colors.bleuFbi,
        width: 150,
    }
})

export default AssociationModal;