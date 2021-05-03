import React, {useState} from 'react';
import {ScrollView} from "react-native";
import * as Yup from 'yup'

import {AppForm, AppFormField, FormSubmitButton} from "../components/form";
import {useDispatch, useSelector} from "react-redux";
import {addNewCotisation} from "../store/slices/cotisationSlice";
import useCotisation from "../hooks/useCotisation";

const validCotisation = Yup.object().shape({
    montant: Yup.number().required('Indiquez un montant'),
    motif: Yup.string().min(5, 'Donnez un motif explicatif')
})

function NewCotisationScreen(props) {
    const dispatch = useDispatch()
    const {getMonthString} = useCotisation()

    const currentMember = useSelector(state => state.auth.user)
    const selectedAssociation = useSelector(state => state.entities.association.selectedAssociation)

    const [initMotif, setInitMotif] = useState(() => {
        let motif = ''
        const currentDate = new Date()
        const currentMonth = currentDate.getMonth() + 1
         motif = `Payement cotisation mensuelle du Mois de ${getMonthString(currentMonth)}`
        return motif
    })

    const handleAddCotisation = (cotisation) => {
        const data = {...cotisation, memberId: currentMember.id, associationId: selectedAssociation.id}
        dispatch(addNewCotisation(data))
    }


    return (
        <ScrollView contentContainerStyle={{paddingVertical: 20, paddingHorizontal: 20}}>
            <AppForm initialValues={{
                montant: '',
                motif: initMotif
            }}
                     validationSchema={validCotisation}
                     onSubmit={handleAddCotisation}>
                <AppFormField name='montant' placeholder='montant'/>
                <AppFormField name='motif'/>
                <FormSubmitButton title='Cotiser'/>
            </AppForm>
        </ScrollView>
    );
}

export default NewCotisationScreen;