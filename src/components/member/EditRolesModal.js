import React from 'react';
import {Modal, StyleSheet, ToastAndroid, View} from "react-native";
import * as Yup from 'yup'

import {AppForm, AppFormField, FormSubmitButton} from "../form";
import AppButton from "../AppButton";
import defaultStyles from '../../utilities/styles'
import useAuth from "../../hooks/useAuth";
import {useDispatch} from "react-redux";
import {getMemberRolesEdited} from "../../store/slices/associationSlice";



const validRoles = Yup.object().shape({
    roles: Yup.string()
})
function EditRolesModal({editRoles, dismissModal}) {
    const {getConnectedMember} = useAuth()

    const dispatch = useDispatch()

    const handleEditRoles = (role) => {
        const data = {
            memberId: getConnectedMember().member.id,
            roles: [role.roles]
        }
        dispatch(getMemberRolesEdited(data))
    }


    return (
        <Modal visible={editRoles} transparent>
            <View style={styles.container}>
                <View style={{
                    alignSelf: 'flex-end',
                    margin: 20
                }}>
                    <AppButton
                        onPress={dismissModal} title='fermer'
                        otherButtonStyle={{
                            height: 20,
                            backgroundColor: defaultStyles.colors.rougeBordeau
                        }}/>
                </View>
            <View style={styles.formContainer}>
                <AppForm
                    validationSchema={validRoles}
                    initialValues={{
                        roles: ''
                    }}
                    onSubmit={handleEditRoles} >
                    <AppFormField name='roles' placeholder='roles'/>
                    <FormSubmitButton title='Editer'/>
                </AppForm>
            </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '80%',
        top: 80,
        bottom: 20,
        backgroundColor: defaultStyles.colors.white
    },
    formContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default EditRolesModal;