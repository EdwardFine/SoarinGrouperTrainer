import {useState, React} from 'react';
import {View, Text, ScrollView, SafeAreaView } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import {Row} from '../../components';

const calculatePartySize = () =>{
  const factor = Math.floor(Math.random() * 100)
  if(factor <=26){
    return 2;
  }else if(factor <= 53){
    return 4;
  }else if(factor <= 72){
    return 3;
  }else if(factor <= 82){
    return 5;
  }else if(factor <= 86){
    return 1;
  }else{
    return Math.floor(Math.random() * 10 + 6)
  }
}



const TheaterSim = () => {
  const params = useLocalSearchParams();
  const seatCount = [];
  if(params.id == "B"){
    seatCount.push(11,11,11)
  }else{
    seatCount.push(10,10,7)
  }
  const [filledSeats, setFilledSeats] = useState([0,0,0])

  const [partySize, setPartySize] = useState(calculatePartySize())

  const handleGroup = (partySize, rowID) =>{
    if((seatCount[rowID] - filledSeats[rowID])-partySize >=0){
      const temp = [...filledSeats]
      temp[rowID] += partySize;
      setFilledSeats(temp);
      setPartySize(calculatePartySize());
    }else{
      setPartySize(calculatePartySize());
    }
  }

  return (
    <SafeAreaView style={{display:"flex", backgroundColor: "#ADD8E6", justifyContent:'center', alignItems: 'center',
      width:"100%", height:"100%", gap: 25
    }}>
      <Stack.Screen options={{headerShown: false, headerShadowVisible: false}}> 
      </Stack.Screen>

      <View>
        <Row spaces={seatCount[0]} filled={filledSeats[0]} rowID={0} handleGroup={() => handleGroup(partySize,0)}/>
        <Row spaces={seatCount[1]} filled={filledSeats[1]} rowID={1} handleGroup={() => handleGroup(partySize,1)}/>
        <Row spaces={seatCount[2]} filled={filledSeats[2]} rowID={2} handleGroup={() => handleGroup(partySize,2)}/>
      </View>

      <View>
        <Text>
          Party size = {partySize}
        </Text>
      </View>

    </SafeAreaView>
  )
}

export default TheaterSim