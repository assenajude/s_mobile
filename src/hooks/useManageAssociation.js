import {useDispatch, useSelector} from "react-redux";

let useManageAssociation;
export default useManageAssociation = () => {
    const dispatch = useDispatch()
    const connectedMember = useSelector(state => state.auth.user)

    const getMemberRelationType = (association) => {
        let associationType = ''
        const associatedMembers = association.members
        if(associatedMembers && associatedMembers.length>0) {
         const selectedMember = associatedMembers.find(member => member.id === connectedMember.id)
        if(selectedMember) {
            associationType = selectedMember.associated_member.relation
        }
        }
     return associationType
    }

    const formatFonds = (fonds) => {
        const formated = fonds.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
        return `XOF ${formated} `
    }


    return {getMemberRelationType, formatFonds}
}