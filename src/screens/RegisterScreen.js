import React from 'react';
import {View,  ScrollView, StyleSheet} from "react-native";
import * as Yup from 'yup'

import AppLogoInfo from "../components/AppLogoInfo";
import AppForm from "../components/form/AppForm";
import AppFormField from "../components/form/AppFormField";
import FormSubmitButton from "../components/form/FormSubmitButton";
import AppText from "../components/AppText";
import defaultStyles from '../utilities/styles'
import routes from "../navigation/routes";
import {useDispatch, useStore} from "react-redux";
import {register} from "../store/slices/authSlice";


const registerValidSchema = Yup.object().shape({
    username: Yup.string(),
    email: Yup.string().email("Email invalide").required("Email requis"),
    password: Yup.string().min(5,"Le mot de passe doit contenir au moins 5 caractères").required('le mot de passe est requis'),
    confirm:Yup.string().when("password", {
        is: val => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
            [Yup.ref("password")],
            "Les mots de passe  ne correspondent pas."
        )
    }).required("Veuillez confirmer le mot de passe.")
})

function RegisterScreen({navigation}) {
    const store = useStore()
    const dispatch = useDispatch()

    const handleRegister = async (data) => {
        await dispatch(register(data))
        const error = store.getState().auth.error
        if(error !== null)return alert("Error")
        navigation.navigate(routes.LOGIN)
    }

    return (
        <>
            <View style={styles.logoInfoContainer}>
               <AppLogoInfo/>
            </View>
        <ScrollView contentContainerStyle={styles.container}>
            <AppForm
                initialValues={{
                username: '',
                email: '',
                password: '',
                confirm: ''
            }}
                validationSchema={registerValidSchema}
                onSubmit={handleRegister}
            >
                <AppFormField
                    name='username'
                    placeholder='pseudo'
                    icon='account'
                />
                <AppFormField
                    name='email'
                    placeholder='email'
                    icon='email'
                    keyboardType='email-address'
                />
                <AppFormField
                    name='password'
                    placeholder='password'
                    icon='lock'
                    secureTextEntry
                />
                <AppFormField
                    name='confirm'
                    placeholder='confirm password'
                    icon='lock'
                    secureTextEntry
                />
                <FormSubmitButton title='Valider'/>
            </AppForm>

            <View>
                <AppText>Vous avez deja un compte? </AppText>
                <AppText
                    style={{color: defaultStyles.colors.bleuFbi}}
                    onPress={() => navigation.navigate(routes.LOGIN)}
                >
                    Connectez-vous</AppText>
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
        alignItems: 'center',
        width: '100%',
        marginBottom: 40
    }
})
export default RegisterScreen;