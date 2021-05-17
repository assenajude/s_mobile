import {useSelector} from "react-redux";
import dayjs from "dayjs";

let useCotisation;
export default useCotisation = () => {
    const currentAssociation = useSelector(state => state.entities.association.selectedAssociation)
    const listCotisations = useSelector(state => state.entities.cotisation.list)
    const yearCotisations = useSelector(state => state.entities.cotisation.memberYearCotisations)

    const getMonthString = (number) => {
        let monthString = ''
        switch(number) {
            case 1: monthString = 'Janvier';
            break;
            case 2: monthString = 'Fevrier';
            break;
            case 3: monthString = 'Mars';
            break;
            case 4: monthString = 'Avril';
            break;
            case 5: monthString = 'Mai';
            break;
            case 6: monthString = 'Juin';
            break;
            case 7: monthString = 'Juillet';
            break;
            case 8: monthString = 'Aout';
            break;
            case 9: monthString = 'Septembre';
            break;
            case 10: monthString = 'Octobre';
            break;
            case 11: monthString = 'Novembre';
            break;
            case 12: monthString = 'Decembre';
            break;
            default: monthString = 'Mois indefini';
            break;
        }
        return monthString
    }

    const getMonthCotisations = (month) => {
        const monthCotisations = yearCotisations.filter(cotisation => {
            const cotisationdate = cotisation.datePayement
            const cotisationMonth = dayjs(cotisationdate).month()
            if(cotisationMonth === month.number) return true
            return false
        })
        return monthCotisations
    }

    const getMonthTotal = (month) => {
        const selectedMonthCotisations = getMonthCotisations(month)
        let total = 0
        selectedMonthCotisations.forEach(cotisation => {
            total += cotisation.montant
        })
        return total
    }
    const getMemberCotisations = (member) => {
        let cotisationLenght = 0
        let totalCotisation = 0
        const memberCotisations = listCotisations.filter(item => item.memberId === member.member.id)
        cotisationLenght = memberCotisations.length
        memberCotisations.forEach(cotis => {
            totalCotisation += cotis.montant
        })
        return {cotisationLenght, totalCotisation}
    }

    const getAssociationCotisation = () => {
        let total = 0
        const cotisLenght = listCotisations.length
        listCotisations.forEach(cotis => {
            total += cotis.montant
        })
        return {total, cotisLenght}
    }

    const checkCotisationUpToDate = (member) => {
        const now = new Date()
        const nowMonth = dayjs(now).month()
        const memberCotisatons = listCotisations.filter(item => item.memberId === member.member.id)
        const stringMonth = getMonthString(nowMonth+1).toLowerCase()
        let isMonthCotis = false
        memberCotisatons.forEach(cotis => {
            const motif = cotis.motif.toLowerCase()
            const label = 'cotisation mensuelle'
            if(motif.indexOf(label) !== -1 && motif.indexOf(stringMonth) !== -1 && cotis.montant === currentAssociation.cotisationMensuelle) isMonthCotis = true
        })
        return isMonthCotis

    }

return {getMonthString, getMonthCotisations, getMonthTotal, getMemberCotisations, checkCotisationUpToDate, getAssociationCotisation}
}