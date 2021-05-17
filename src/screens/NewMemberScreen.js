import React, {useEffect, useState} from 'react';
import {ScrollView, ToastAndroid} from "react-native";
import * as Yup from 'yup'

import {AppForm, AppFormField, FormSubmitButton} from "../components/form";
import {useDispatch, useSelector, useStore} from "react-redux";
import {addNewMember, getUpdateOneMember} from "../store/slices/memberSlice";
import AppTimePicker from "../components/AppTimePicker";

const validMember = Yup.object().shape({
    statut: Yup.string(),
    fonds: Yup.number(),
    relation: Yup.string(),
    adhesionDate: Yup.date()
})
function NewMemberScreen({route, navigation}) {
    const store = useStore()
    const selectEdited = route.params
    const dispatch = useDispatch()
    const currentAssociation = useSelector(state => state.entities.association.selectedAssociation)
    const [edit, setEdit] = useState(selectEdited?true:false)

    const handleAddMember = (member) => {
        let data;
        if (edit) {
            data = {...member, currentMemberId: selectEdited.id}
            dispatch(getUpdateOneMember(data))
        } else {
            data = {
                ...member,
                associationId: currentAssociation.id
            }
            dispatch(addNewMember(data))
        }
        const error = store.getState().entities.member.error
        if (error !== null) {
            return alert('error: impossible de sauvegarder vos données.')
        }else {
            ToastAndroid.showWithGravityAndOffset(
                'Données sauvegardées avec succès',
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
                25,
                50
            );
            navigation.goBack()
        }
    }


    useEffect(() => {
        console.log(selectEdited);
    }, [])

    return (
        <ScrollView contentContainerStyle={{padding: 20}}>
            <AppForm
                initialValues={{
                    statut: selectEdited? selectEdited.member.statut : '',
                    fonds: selectEdited?String(selectEdited.member.fonds) : '',
                    relation: selectEdited?selectEdited.member.relation: '',
                    adhesionDate: selectEdited?selectEdited.adhesionDate:new Date()
                }}
                validationSchema={validMember}
                onSubmit={handleAddMember}
            >
                <AppFormField name='statut' placeholder='statut'/>
                <AppFormField name='fonds' placeholder='fonds de depart'/>
                <AppFormField name='relation' placeholder='type relation'/>
                <AppTimePicker label='date adhesion' name='adhesionDate'/>
                <FormSubmitButton title='Ajouter'/>
            </AppForm>
        </ScrollView>
    );
}

export default NewMemberScreen;