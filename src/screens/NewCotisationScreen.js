import React, {useState} from 'react';
import {ScrollView} from "react-native";
import * as Yup from 'yup'

import {AppForm, AppFormField, FormSubmitButton} from "../components/form";
import {useDispatch, useSelector} from "react-redux";
import {addNewCotisation} from "../store/slices/cotisationSlice";
import useCotisation from "../hooks/useCotisation";
import AppTimePicker from "../components/AppTimePicker";

const validCotisation = Yup.object().shape({
    montant: Yup.number().required('Indiquez un montant'),
    motif: Yup.string().min(5, 'Donnez un motif explicatif'),
    datePayement: Yup.date()
})

function NewCotisationScreen(props) {
    const dispatch = useDispatch()
    const {getMonthString} = useCotisation()

    const currentUser = useSelector(state => state.auth.user)
    const selectedMember = useSelector(state => {
        const list = state.entities.association.selectedAssociationMembers
        const selected = list.find(item => item.id === currentUser.id)
        return selected
    })
    const selectedAssociation = useSelector(state => state.entities.association.selectedAssociation)

    const [initMotif, setInitMotif] = useState(() => {
        let motif = ''
        const currentDate = new Date()
        const currentMonth = currentDate.getMonth() + 1
         motif = `Payement cotisation mensuelle du Mois de ${getMonthString(currentMonth)}`
        return motif
    })


    const handleAddCotisation = (cotisation) => {
        const datePay = cotisation.datePayement.getTime()
            const data = {
                montant: cotisation.montant,
                motif: cotisation.motif,
                datePayement: datePay,
                memberId: selectedMember.member.id,
                associationId: selectedAssociation.id}
            dispatch(addNewCotisation(data))
    }


    return (

        <ScrollView contentContainerStyle={{paddingVertical: 20, paddingHorizontal: 20}}>
            <AppForm initialValues={{
                montant: '',
                motif: initMotif,
                datePayement: new Date()
            }}
                     validationSchema={validCotisation}
                     onSubmit={handleAddCotisation}>
                <AppFormField name='montant' placeholder='montant'/>
                <AppFormField name='motif'/>
                <AppTimePicker name='datePayement' label='date'/>
                <FormSubmitButton title='Cotiser'/>
            </AppForm>
        </ScrollView>
    );
}

export default NewCotisationScreen;