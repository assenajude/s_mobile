import React from 'react';
import {ScrollView} from "react-native";
import * as Yup from 'yup'

import {AppForm, AppFormField, FormSubmitButton} from "../components/form";
import {useDispatch, useSelector} from "react-redux";
import {addNewMember} from "../store/slices/memberSlice";

const validMember = Yup.object().shape({
    nom: Yup.string().required('Le nom est requis'),
    prenom: Yup.string(),
    statut: Yup.string(),
    email: Yup.string().email().required('Ajoutez une adresse mail'),
    phone: Yup.string().required('Ajoutez un numero de telephone'),
    adresse: Yup.string(),
    fonds: Yup.number()
})
function NewMemberScreen(props) {
    const dispatch = useDispatch()
    const currentAssociation = useSelector(state => state.entities.association.selectedAssociation)

    const handleAddMember = (member) => {
        const data = {
            ...member,
            associationId: currentAssociation.id
        }
       dispatch(addNewMember(data))
    }

    return (
        <ScrollView contentContainerStyle={{padding: 20}}>
            <AppForm
                initialValues={{
                    nom: '',
                    prenom: '',
                    statut: '',
                    email: '',
                    phone: '',
                    adresse: '',
                    fonds: ''
                }}
                validationSchema={validMember}
                onSubmit={handleAddMember}
            >
                <AppFormField name='nom' placeholder='nom'/>
                <AppFormField name='prenom' placeholder='prenom'/>
                <AppFormField name='statut' placeholder='statut'/>
                <AppFormField name='email' placeholder='email' keyboardType='email-address'/>
                <AppFormField name='phone' placeholder='phone' keyboardType='numeric'/>
                <AppFormField name='adresse' placeholder='autre adresse'/>
                <AppFormField name='fonds' placeholder='fonds de depart'/>
                <FormSubmitButton title='Ajouter'/>
            </AppForm>
        </ScrollView>
    );
}

export default NewMemberScreen;