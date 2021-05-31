import {useSelector} from "react-redux";

let useAuth;
export default useAuth = () => {
    const connectedUser = useSelector(state => state.auth.user)
    const userRoles = useSelector(state => state.auth.roles)
    const memberRoles = useSelector(state => state.entities.association.memberRoles)
    const associationMembers = useSelector(state => state.entities.association.selectedAssociationMembers)
    const isAdmin = () => {
        let isMemberAdmin = false
        if(userRoles.length>0) {
        const adminIndex = userRoles.findIndex(role =>role === 'ROLE_ADMIN')
        if(adminIndex !== -1) {
            isMemberAdmin = true
        }
        }

        return isMemberAdmin
    }

   const isModerator = () => {
        let isModarat = false
        if(memberRoles.length>0) {
            const modIndex = memberRoles.findIndex(role =>role === 'ROLE_MODERATOR')
            if(modIndex !== -1) {
                isModarat = true
            }
        }
        return isModarat
    }

    const getMemberUserCompte = (member) => {
        const selected = associationMembers.find(item => item.member.id === member.id)
        return selected
    }

    const getConnectedMember = () => {
            const currentMember = associationMembers.find(item => item.id === connectedUser.id)
            return currentMember
    }
    return {isAdmin,getMemberUserCompte, isModerator,getConnectedMember}
}