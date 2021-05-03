import React, {useEffect, useRef} from 'react';
import {ScrollView, View,FlatList, StyleSheet} from "react-native";
import {useDispatch, useSelector} from "react-redux";

import {getMonthDetails, getYearSelected, populateTimeData} from "../store/slices/cotisationSlice";
import {initYears} from '../utilities/years'
import {initMonth} from '../utilities/months'
import YearItem from "../components/cotisation/YearItem";
import MonthItem from "../components/cotisation/MonthItem";
import ListItemSeparator from "../components/ListItemSeparator";
import useCotisation from "../hooks/useCotisation";
import AppAddNewButton from "../components/AppAddNewButton";


function MemberCotisationScreen({route, navigation}) {
    const dispatch = useDispatch()
    const selectedMember = route.params
    const scrollRef = useRef()
    const {getMonthTotal} = useCotisation()

    const selectedMonthCotisations = useSelector(state => state.entities.cotisation.selectedMonthCotisations)
    const memberCotisations = useSelector(state => {
        const allCotisation = state.entities.cotisation.list
        const selectedMemberCotisation = allCotisation.filter(cotis => cotis.memberId === selectedMember?.id)
        return selectedMemberCotisation

    })
    const yearCotisations = useSelector(state => state.entities.cotisation.memberYearCotisations)
    const allYears = useSelector(state => state.entities.cotisation.years)
    const allMonths = useSelector(state => state.entities.cotisation.months)


    const handleSelectYear = (year) => {
        dispatch(getYearSelected({...year, memberId: selectedMember.id}))
    }

    const handleMonthDetail = (month) => {
        dispatch(getMonthDetails(month))
    }

    const initSelectYear = () => {
        const currentDate = new Date()
        const currentYear = currentDate.getFullYear()
        const currentYearData = {
            year: currentYear,
            selected: false,
            memberId: selectedMember.id
        }
        dispatch(getYearSelected(currentYearData))
    }
    setTimeout(() => {
        scrollRef.current?.scrollTo({x:50, y:0})
    }, 1000)

    useEffect(() => {
        dispatch(populateTimeData({years: initYears, months: initMonth}))
        initSelectYear()
    }, [])


    return (
        <>
            <View style={{
                marginBottom: 20,
                marginTop: 20
            }}>
            {allYears.length>0 && <ScrollView ref={scrollRef}  horizontal>
                {allYears.map((item) =>
                    <YearItem key={item.year.toString()}
                              year={item.year} isSelected={item.selected}
                              selectYear={()=>handleSelectYear(item)}/>
                              )}
            </ScrollView>}
            </View>

            <FlatList data={allMonths}
                      ItemSeparatorComponent={ListItemSeparator}
                      keyExtractor={item => item.label}
                      renderItem={({item}) =>
                          <MonthItem month={item.label}
                                     monthTotal={getMonthTotal(item)}
                                     showMonthDetail={item.showDetail}
                                     showMonthItemDetail={() => handleMonthDetail(item)}
                                     monthCotisations={selectedMonthCotisations}/>}
            />
            <View style={styles.newCotisation}>
                <AppAddNewButton onPress={() => navigation.navigate('NewCotisationScreen')}/>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    newCotisation: {
        position: 'absolute',
        right: 20,
        bottom: 30
    }
})
export default MemberCotisationScreen;