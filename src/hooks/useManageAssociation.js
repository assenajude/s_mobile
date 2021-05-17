import {useSelector} from "react-redux";
import dayjs from "dayjs";

let useManageAssociation;
export default useManageAssociation = () => {
    const connectedMember = useSelector(state => state.auth.user)
    const associationMembers = useSelector(state => state.entities.association.selectedAssociationMembers)
    const allMember = useSelector(state => state.entities.member.list)

    const getAssociatonAllMembers = (association) => {
        let members = []
            if(association && allMember.length > 0) {
            members = allMember.filter(item => item.associationId === association.id)
            }
        return members
    }

    const getMemberRelationType = (association) => {
        let associationType = ''
        const associatedMembers = getAssociatonAllMembers(association)
        if(associatedMembers && associatedMembers.length>0) {
         const selectedMember = associatedMembers.find(member => member.userId === connectedMember.id)
        if(selectedMember) {
            associationType = selectedMember.relation
        }
        }
     return associationType
    }

    const formatFonds = (fonds) => {
        const formated = fonds?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
        return `${formated} XOF`
    }

    const formatDate = (date) => {
        let formated = ''
        if(date) {
            formated = dayjs(date).format('DD/MM/YYYY HH:mm:ss')
        }
        return formated

    }

    const associationValidMembers = () => {
        let validList = []
        validList = associationMembers.filter(item => {
            const isMember = item.member.relation.toLowerCase() === 'member'
            const isOnLeave = item.member.relation.toLowerCase() === 'onleave'
            if(isMember || isOnLeave) return true
        })
        return validList
    }

    return {getAssociatonAllMembers, getMemberRelationType, formatFonds, formatDate, associationValidMembers}
}