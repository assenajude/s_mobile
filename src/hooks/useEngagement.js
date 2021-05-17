import {useSelector} from "react-redux";

let useEngagement;
export default useEngagement = () => {
    const listEngagement = useSelector(state => state.entities.engagement.list)

    const getMemberEngagementInfos = (member) => {
        let engagementLength = 0
        let engagementAmount = 0
        const memberEngagements = listEngagement.filter(item => item.memberId === member.member.id)
         engagementLength = memberEngagements.length
        memberEngagements.forEach(engage => {
            engagementAmount += engage.montant
        })
        return {engagementLength, engagementAmount}
    }

    const getAssociationEngagementTotal = () => {
        let total = 0
        const engagementLenght = listEngagement.length
        listEngagement.forEach(engage => {
            total += engage.montant
        })
        return {total, engagementLenght}
    }
    return {getMemberEngagementInfos, getAssociationEngagementTotal}
}