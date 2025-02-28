import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import { images } from '../../constants';

// ElementsList is filling the rows of each gate with how many seats are available, and whatever is left, to change the image to represent the change.
const ElementsList = (params) =>{
  const elements = [];
  for(let i=0; i < params.count - params.filled; i++){
    elements.push(<Image source={images.SoarinGlider} style={{width:"9%", aspectRatio:1}} key={i}/>);
  }
  for(let i=0; i < params.filled; i++){
    elements.push(<Image source={images.SoarinGliderFilled} style={{width:"9%", aspectRatio:1}} key={100 + i}/>);
  }
  return elements;
}

// The Row is the spaces in the gate available for grouping, and what has been filled.
const Row = ({spaces, filled, rowID, handleGroup}) => {
  return (
    <View style={{display:"flex", flexDirection:"row",
      justifyContent:"space-around", width:"100%", marginBottom:2}}>
      <TouchableOpacity onPress={handleGroup} style={{backgroundColor:"#888888", borderWidth:1, borderRadius:90, width:"12.5%", height:"100%", aspectRatio:1,
        justifyContent:"center", alignItems:"center"
      }}>
        <Text style={{color:"white"}} adjustsFontSizeToFit={true} numberOfLines={1}>
          GROUP ROW {rowID + 1}
        </Text>
      </TouchableOpacity>
      <View style={{display:"flex", flexDirection:"row", flexWrap:"nowrap", justifyContent:"space-between", width:"75%", alignItems:'center'}}>
        <ElementsList count={spaces} filled={filled}/>
      </View>
    </View>
  )
}

export default Row