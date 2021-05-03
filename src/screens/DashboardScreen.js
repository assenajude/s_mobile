import React, {useState, useEffect, useCallback} from 'react';
import {View,TouchableOpacity,TouchableWithoutFeedback, StyleSheet, ScrollView, Image} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {MaterialCommunityIcons} from '@expo/vector-icons'
import AppText from "../components/AppText";
import defaultStyles from '../utilities/styles'
import LottieView from "lottie-react-native";
import useManageAssociation from "../hooks/useManageAssociation";
import {getAssociationMembers} from "../store/slices/memberSlice";
import {getAllCotisations} from "../store/slices/cotisationSlice";

function DashboardScreen({navigation}) {
    const dispatch = useDispatch()
    const {formatFonds} = useManageAssociation()
    const currentAssociation = useSelector(state => state.entities.association.selectedAssociation)
    const members = useSelector(state => state.entities.member.list)

    const [showDescrip, setShowDescrip] = useState(false)

    const getStarted = useCallback(() => {
        dispatch(getAssociationMembers({associationId:currentAssociation.id}))
        dispatch(getAllCotisations({associationId: currentAssociation.id}))
    }, [])

    useEffect(() => {
        getStarted()
    }, [])


    return (
        <>
            <ScrollView>
                <Image style={styles.image} source={require('../../assets/peuple_solidaire.png')}/>
                <AppText style={{alignSelf: 'center', marginVertical: 10, fontWeight: 'bold'}}>{currentAssociation.nom}</AppText>
                <View style={styles.cotisation}>
                    <AppText style={{fontWeight: 'bold'}}>{currentAssociation.cotisation}</AppText>
                </View>
                <View style={styles.fondsContainer}>
                    <View>
                        <AppText
                            style={{
                                color: defaultStyles.colors.vert,
                                fontWeight: 'bold',
                                fontSize: 30,
                                padding: 10
                            }}>{formatFonds(currentAssociation.fonds)}
                        </AppText>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around'
                        }}>
                        <LottieView style={{ width: 100}} autoPlay={true} loop={true} source={require('../../assets/animations/fonds')}/>
                        <View>
                            <View style={styles.secondFonds}>
                                <AppText>{formatFonds(100000000)}</AppText>
                                <AppText> Entrées</AppText>
                            </View>
                            <View style={styles.secondFonds}>
                                <AppText>{formatFonds(5000)}</AppText>
                                <AppText> Invests</AppText>
                            </View>
                            <View style={styles.secondFonds}>
                                <AppText>{formatFonds(2000)}</AppText>
                                <AppText> Gains</AppText>
                            </View>
                            <View style={styles.secondFonds}>
                                <AppText>{formatFonds(2000)}</AppText>
                                <AppText> Sorties</AppText>
                            </View>
                        </View>
                    </View>

                </View>
                <View>
                    <View
                        style={{
                            flexDirection: 'row',
                            margin: 20
                        }}>
                        <TouchableOpacity onPress={() => setShowDescrip(!showDescrip)}>
                            {!showDescrip && <MaterialCommunityIcons name="plus" size={24} color="black" />}
                            {showDescrip && <MaterialCommunityIcons name="minus" size={24} color="black" />}
                        </TouchableOpacity>
                        <AppText
                            style={{
                                fontWeight: 'bold',
                                marginLeft: 5,
                            }}>Description</AppText>
                    </View>
                    {showDescrip && <View style={{
                        paddingHorizontal: 20
                    }}>
                        <AppText>{currentAssociation.description}</AppText>
                    </View>}
                </View>
                <View style={styles.linkContainer}>
                    <TouchableWithoutFeedback
                        onPress={() => navigation.navigate('Members')}>
                        <View style={styles.link}>
                            <AppText style={styles.linkText}>Membres({members.length})</AppText>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        onPress={() => navigation.navigate('Cotisations')}>
                        <View style={styles.link}>
                            <AppText style={styles.linkText}>Cotisations</AppText>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        onPress={() => navigation.navigate('Engagements')}>
                        <View style={styles.link}>
                            <AppText style={styles.linkText}>Engagements</AppText>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    image: {
        height: 200,
        width: '100%'
    },
    cotisation: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: defaultStyles.colors.white,
        alignSelf:'flex-end',
        margin: 10,
      height: 60,
      width: 60,
       borderRadius: 30,
      borderWidth: 1,
      borderColor: defaultStyles.colors.or
    },
    fondsContainer: {
        borderWidth: 4,
        borderColor: defaultStyles.colors.or,
        borderRadius: 30,
        backgroundColor: defaultStyles.colors.white,
        margin: 20
    },
    link: {
        borderWidth: 1,
        borderColor: defaultStyles.colors.bleuFbi,
        width: '100%',
        padding: 20,
        alignItems: 'center',
        backgroundColor: defaultStyles.colors.white,
        marginVertical: 20,
        borderRadius: 10
    },
    linkText: {
      fontWeight: 'bold',
      fontSize: 20,
      color: defaultStyles.colors.bleuFbi
    },
    linkContainer: {
        alignItems: 'center'
    },
    secondFonds: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10
    }
})
export default DashboardScreen;