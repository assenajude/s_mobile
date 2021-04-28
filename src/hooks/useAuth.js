import {useSelector} from "react-redux";

let useAuth;
export default useAuth = () => {
    const connectedMember = useSelector(state => state.auth.user)
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

    return {isAdmin}
}