import React from 'react';
import { StyleSheet, ScrollView, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";

import AppForm from "../components/form/AppForm";
import AppFormField from "../components/form/AppFormField";
import * as Yup from 'yup'
import FormSubmitButton from "../components/form/FormSubmitButton";
import {useDispatch, useStore} from "react-redux";
import {signin} from "../store/slices/authSlice";

import defaultStyles from '../utilities/styles'
import AppText from "../components/AppText";
import routes from "../navigation/routes";
import AppLogoInfo from "../components/AppLogoInfo";
import GradientButton from "../components/GradientButton";

const loginValidSchema = Yup.object().shape({
    info: Yup.string().required('Entrez votre adresse mail ou votre nom utilisateur'),
    password: Yup.string().min(5, 'Le mot de passe doit être de 5 caractères au moins').required("Le mot de passe est requis")
})

function LoginScreen({navigation}) {
    const store = useStore()
    const dispatch = useDispatch()

    const  validateEmail = (email) => {
        const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/
        return re.test(email);
    }

    const handleLogin = async (userData, {resetForm}) => {
            const valid = validateEmail(userData.info)
            let data = {}
            if(valid) {
                data = {
                    email: userData.info,
                    password: userData.password
                }
            } else {
                data = {
                    username: userData.info,
                    password: userData.password
                }
            }
        await dispatch(signin(data))
              const error = store.getState().auth.error
              if(error !== null) return alert('error')
              resetForm()
              // dispatch(getLoggedIn())
              navigation.navigate(routes.STARTER)
    }

    return (
        <>
            <View style={styles.logoInfoContainer}>
                <AppLogoInfo/>
            </View>
        <ScrollView>
            <AppForm
                initialValues={{
                    info: '',
                    password: ''
                }}
                validationSchema={loginValidSchema}
                onSubmit={handleLogin}
            >
                <AppFormField
                    name='info'
                    icon='account'
                    keyboardType='email-address'
                    placeholder='email ou username'
                    returnKeyType='next'
                    autoCapitalize='none'
                />
                <AppFormField
                    autoCapitalize='none'
                    name='password'
                    icon='lock'
                    placeholder='password'
                    secureTextEntry
                />
                <FormSubmitButton title='Envoyer' iconName='login'/>
            </AppForm>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 20,
                marginHorizontal: 40
            }}>
                <AppText>Vous n'avez pas de compte? </AppText>
                <AppText
                    style={{color: defaultStyles.colors.bleuFbi}}
                    onPress={() => navigation.navigate(routes.REGISTER)}>Créez un</AppText>
            </View>
        </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    logoInfoContainer: {
        alignSelf:'center',
        alignItems: 'center',
        marginBottom: 40,
    }
})
export default LoginScreen;