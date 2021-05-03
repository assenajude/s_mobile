import {useSelector} from "react-redux";
import dayjs from "dayjs";

let useCotisation;
export default useCotisation = () => {
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
            const cotisationdate = cotisation.createdAt
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
return {getMonthString, getMonthCotisations, getMonthTotal}
}