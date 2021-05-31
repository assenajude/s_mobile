import React, {useState} from 'react';
import {ScrollView, ToastAndroid} from "react-native";
import * as Yup from 'yup'

import {AppForm, AppFormField, FormSubmitButton} from "../components/form";
import {useDispatch, useSelector, useStore} from "react-redux";
import {addNewCotisation} from "../store/slices/cotisationSlice";
import useCotisation from "../hooks/useCotisation";
import AppTimePicker from "../components/AppTimePicker";

const validCotisation = Yup.object().shape({
    montant: Yup.number().required('Indiquez un montant'),
    motif: Yup.string().min(5, 'Donnez un motif explicatif'),
    datePayement: Yup.date()
})

function NewCotisationScreen(props) {
    const store = useStore()
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


    const handleAddCotisation = async (cotisation, {resetForm}) => {
        if(currentUser.wallet<cotisation.montant) {
            return alert("Vous n'avez pas de fonds suffisant pour faire votre cotisation")
        }
        const datePay = cotisation.datePayement.getTime()
            const data = {
                montant: cotisation.montant,
                motif: cotisation.motif,
                datePayement: datePay,
                memberId: selectedMember.member.id,
                associationId: selectedAssociation.id,
        }
            await dispatch(addNewCotisation(data))

        const error = store.getState().entities.engagement.error
        if(error !== null) {
            ToastAndroid.showWithGravityAndOffset("Erreur: Impossible de valider la cotisation",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                100,
                500
            )
            return;
        }
        ToastAndroid.showWithGravityAndOffset("Succès: cotisation payée",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            100,
            500
        )
        resetForm()
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