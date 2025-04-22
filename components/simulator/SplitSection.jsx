import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native';


const SplitSection = ({split, rowNumber, handleSplitIncrease, handleSplitDecrease}) => {
  return (
    <View style={{gap:"5", justifyContent:'center', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
        <Text style={{color:"white"}}>
            {rowNumber}
        </Text>
        <TouchableOpacity onPress={handleSplitIncrease} style={{backgroundColor:'#888888', borderWidth:1, borderRadius:90, width:'60', height:'60', aspectRatio:1, justifyContent:'center', alignItems:"center"}}>
            <Text style={{color:"white"}} adjustsFontSizeToFit={true} numberOfLines={1}>
            ↑
            </Text>
        </TouchableOpacity>
        <View style={{backgroundColor:'white', borderRadius:12, borderWidth:1, width:'60', justifyContent:'center'}}>
            <Text style={{color:"black", textAlign:'center'}} adjustsFontSizeToFit={true} numberOfLines={1}>
                {split}
            </Text>
        </View>
        <TouchableOpacity onPress={handleSplitDecrease} style={{backgroundColor:'#888888', borderWidth:1, borderRadius:90, width:'60', height:'60', aspectRatio:1, justifyContent:'center', alignItems:"center"}}>
            <Text style={{color:"white"}} adjustsFontSizeToFit={true} numberOfLines={1}>
            ↓
            </Text>
        </TouchableOpacity>
    </View>
  )
}

export default SplitSection