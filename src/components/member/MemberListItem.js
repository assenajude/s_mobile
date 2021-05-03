import React from 'react';
import {View,StyleSheet} from "react-native";
import MemberItem from "./MemberItem";

function MemberListItem({username, getMemberDetails, children}) {
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: 10
        }}>
           <MemberItem
               avatarSource={require('../../../assets/user_avatar.jpg')}
               username={username}
               getMemberDetails={getMemberDetails}/>

            <View style={{
                flexDirection: 'row'
            }}>
                {children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

})

export default MemberListItem;