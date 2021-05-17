import React from 'react';
import {View, ScrollView} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import * as Yup from 'yup'

import {AppForm, AppFormField, FormSubmitButton} from "../components/form";
import {addNewEngagement} from "../store/slices/engagementSlice";
import AppTimePicker from "../components/AppTimePicker";

const validEngagement = Yup.object().shape({
    libelle: Yup.string(),
    montant: Yup.number(),
    echeance: Yup.date()
})
function NewEngagementScreen(props) {
    const dispatch = useDispatch()
    const currentMember = useSelector(state => {
        const currentUser = state.auth.user
        const members = state.entities.association.selectedAssociationMembers
        const selected = members.find(item => item.id === currentUser.id)
        return selected
    })
    const currentAssociation = useSelector(state => state.entities.association.selectedAssociation)

    const handleAddEngagement = (engagement) => {
        const dateEcheance = engagement.echeance.getTime()
        const data = {
            libelle: engagement.libelle,
            montant: engagement.montant,
            echeance: dateEcheance,
            memberId: currentMember.id,
            associationId: currentAssociation.id}
        dispatch(addNewEngagement(data))
    }

    return (
        <ScrollView>
            <AppForm initialValues={{
                libelle: '',
                montant: '',
                echeance: new Date()
            }} validationSchema={validEngagement} onSubmit={handleAddEngagement}>
                <AppFormField name='libelle' placeholder='libelle'/>
                <AppFormField name='montant' placeholder='montant'/>
                <AppTimePicker label='Echeance' name='echeance'/>
                <FormSubmitButton title='Ajouter'/>
            </AppForm>
        </ScrollView>
    );
}

export default NewEngagementScreen;