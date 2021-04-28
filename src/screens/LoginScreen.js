import React, {useState} from 'react';
import { StyleSheet, ScrollView, View, Image} from "react-native";
import AppForm from "../components/form/AppForm";
import AppFormField from "../components/form/AppFormField";
import * as Yup from 'yup'
import FormSubmitButton from "../components/form/FormSubmitButton";
import {useDispatch, useStore} from "react-redux";
import {getLoggedIn, signin} from "../store/slices/authSlice";

import defaultStyles from '../utilities/styles'
import AppText from "../components/AppText";
import routes from "../navigation/routes";
import AppLogoInfo from "../components/AppLogoInfo";

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
        <ScrollView contentContainerStyle={styles.container}>
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
                    icon='email'
                    keyboardType='email-address'
                    placeholder='email ou username'
                />
                <AppFormField
                    name='password'
                    icon='lock'
                    placeholder='password'
                    secureTextEntry
                />
                <FormSubmitButton title='envoyer'/>
            </AppForm>
            <View style={{flexDirection: 'row'}}>
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
    container: {
      padding: 10
    },
    logoInfoContainer: {
        alignSelf:'center',
        width: '100%',
        alignItems: 'center',
        marginBottom: 40
    }
})
export default LoginScreen;