import React from 'react';
import {ScrollView} from "react-native";
import * as Yup from 'yup'
import {AppForm, AppFormField, FormSubmitButton} from '../components/form'
import {addNewAssociation} from "../store/slices/associationSlice";
import {useDispatch, useStore} from "react-redux";

const newAssociationValidSchema = Yup.object().shape({
    nom: Yup.string(),
    decription: Yup.string(),
    cotisation: Yup.number(),
    frequence: Yup.string(),
    fonds: Yup.number()
})
function NewAssociationScreen({navigation}) {
    const store = useStore()
    const dispatch = useDispatch()

    const handleNewAssociation = async(data) => {
        await dispatch(addNewAssociation(data))
        const error = store.getState().entities.association.error
        if(error !== null) return alert('error adding new association')
        navigation.goBack()
    }
    return (
        <ScrollView
            contentContainerStyle={{
                padding: 10
            }}>
            <AppForm
                initialValues={{
                    nom: '',
                    description: '',
                    cotisation: '',
                    frequence: '',
                    fonds: ''
                }}
                validationSchema={newAssociationValidSchema}
                onSubmit={handleNewAssociation}
            >
                <AppFormField name='nom' placeholder='nom'/>
                <AppFormField name='description' placeholder='description'/>
                <AppFormField name='cotisation' placeholder='cotisation mensuelle'/>
                <AppFormField name='frequence' placeholder='frequence cotisation'/>
                <AppFormField name='fonds' placeholder='fonds initial'/>
                <FormSubmitButton title='Ajouter'/>
            </AppForm>
        </ScrollView>
    );
}

export default NewAssociationScreen;