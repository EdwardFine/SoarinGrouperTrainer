import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import { images } from '../../constants';

const ElementsList = (params) =>{
  const elements = [];
  for(let i=0; i < params.count-params.filled; i++){
    elements.push(<Image source={images.SoarinGlider} style={{width:"9%", aspectRatio:1}} key={i}/>);
  }
  for(let i=0; i < params.filled; i++){
    elements.push(<Image source={images.SoarinGliderFilled} style={{width:"9%", aspectRatio:1}} key={100 + i}/>);
  }
  return elements;
}


const Row = ({spaces, filled, rowID, handleGroup}) => {
  return (
    <View style={{display:"flex", flexDirection:"row",
      justifyContent:"space-around", width:"100%", marginBottom:5}}>
      <TouchableOpacity onPress={handleGroup} style={{backgroundColor:"#888888", borderWidth:1, borderRadius:90, width:100, height:100,
        justifyContent:"center", alignItems:"center"
      }}>
        <Text style={{color:"white"}}>
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