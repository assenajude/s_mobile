import {useSelector} from "react-redux";

let useAuth;
export default useAuth = () => {
    const connectedMember = useSelector(state => state.auth.user)
    const associationMembers = useSelector(state => state.entities.association.selectedAssociationMembers)
    const isAdmin = () => {
        let isMemberAdmin = false
        const memberRoles = connectedMember.roles
        if(memberRoles && memberRoles.length>0) {
        const adminIndex = memberRoles.findIndex(role =>role === 'ROLE_ADMIN')
        if(adminIndex !== -1) {
            isMemberAdmin = true
        }
        }

        return isMemberAdmin
    }

    const getMemberUserCompte = (member) => {
        const selected = associationMembers.find(item => item.member.id === member.id)
        return selected
    }

    return {isAdmin, getMemberUserCompte}
}