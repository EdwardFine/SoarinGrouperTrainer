import {useState, React} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, Alert, TouchableHighlight, TextInput } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import {Row} from '../../components';
import SplitSection from '../../components/simulator/SplitSection';
import {Overlay} from '@rneui/themed';


// Calculate the party size using data from 1500+ party sizes for more accurate simulation
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
    return Math.floor((Math.random() * 8)) + 6;
  }
}



const TheaterSim = () => {

  const router = useRouter();
  const params = useLocalSearchParams();

  const seatCount = [];
  if(params.id == "B"){
    seatCount.push(11,11,11);
  }else{
    seatCount.push(10,10,7);
  }

  const [filledSeats, setFilledSeats] = useState([0,0,0]);
  const [errorMessage, setErrorMessage] = useState();
  const [partySize, setPartySize] = useState(calculatePartySize());

  const [visible, setVisible] = useState(false);
  const [row1split, setRow1Split] = useState(0);
  const [row2split, setRow2Split] = useState(0);
  const [row3split, setRow3Split] = useState(0);
  const [passSplit, setPassSplit] = useState(0);
  const [splitErrorMessage, setSplitErrorMessage] = useState();


  // Check to see if row has the right amount of seats before grouping the guests there.
  // Also checks to see if all of the rows have been grouped, if so an alert will prompt the user to reset or go home.
  const handleGroup = (partySize, rowID) =>{
    const temp = [...filledSeats];
    if((seatCount[rowID] - temp[rowID])-partySize >=0){
      temp[rowID] += partySize;
      setFilledSeats(temp);
      setPartySize(calculatePartySize());
      setErrorMessage("");
    }else{
      setErrorMessage("Not enough seats!");
    }

    if(temp[0] == seatCount[0] && temp[1] == seatCount[1] && temp[2]==seatCount[2]){
      Alert.alert("Success!", `You successfully grouped ${params.id} gate!`,[
        {text:"Go Home", 
          onPress: ()=> router.navigate("/")
        },{
          text:"Try Again",
          onPress:()=> {setFilledSeats([0,0,0]); setErrorMessage("");}
        }
      ])
    }
  }
  
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const clearSplits = () => {
    setRow1Split(0);
    setRow2Split(0);
    setRow3Split(0);
    setPassSplit(0);
    setSplitErrorMessage("");
  }

  const handleSplit = async() => {
    if((row1split + row2split + row3split + passSplit) == partySize){
      const splits = [row1split, row2split, row3split];
      const temp = [...filledSeats];
      for(let i=0; i<splits.length; i++){
        if((seatCount[i] - temp[i])-splits[i] >=0){
          temp[i] += splits[i];
        }else{
          setSplitErrorMessage("Not enough seats!");
          return;
        }
      }
      setFilledSeats(temp);
      clearSplits();
      toggleOverlay();
      setPartySize(calculatePartySize());
      setErrorMessage("");
    }else{
      if(isNaN(row1split) || isNaN(row2split) || isNaN(row3split) || isNaN(passSplit)){
        setSplitErrorMessage("Invalid number");
      }else{
        setSplitErrorMessage(`Split doesn't sum to ${partySize}`);
      }
    }
  }

  const handleSplitIncrease = (splitRow) =>{
    if(splitRow == 1){
      setRow1Split(row1split+1);
    }else if(splitRow == 2){
      setRow2Split(row2split + 1);
    }else if(splitRow == 3){
      setRow3Split(row3split + 1);
    }else{
      setPassSplit(passSplit + 1);
    }
  }

  const handleSplitDecrease = (splitRow) =>{
    if(splitRow == 1 && row1split != 0){
      setRow1Split(row1split -1);
    }else if(splitRow == 2 && row2split != 0){
      setRow2Split(row2split - 1);
    }else if(splitRow == 3 && row3split != 0){
      setRow3Split(row3split - 1);
    }else if(passSplit != 0){
      setPassSplit(passSplit - 1);
    }
  }

  return (
    <SafeAreaView style={{display:"flex", backgroundColor: "#ADD8E6", justifyContent:'center', alignItems: 'center',width:"100%", height:"100%"}}>

      <Stack.Screen options={{headerShown: false, headerShadowVisible: false}}> 
      </Stack.Screen>

      <View>
        <Text style={{fontSize:18}}>
          Party size = {partySize}
        </Text>
      </View>

      <View>
        <Text id='overfill' style={{fontSize:18, color:'red'}}>{errorMessage}</Text>
      </View>

      <View>
        <Row spaces={seatCount[0]} filled={filledSeats[0]} rowID={0} handleGroup={() => handleGroup(partySize,0)}/>
        <Row spaces={seatCount[1]} filled={filledSeats[1]} rowID={1} handleGroup={() => handleGroup(partySize,1)}/>
        <Row spaces={seatCount[2]} filled={filledSeats[2]} rowID={2} handleGroup={() => handleGroup(partySize,2)}/>
      </View>

      <View style={{display:"flex", flexDirection:"row",
      justifyContent:"space-around", width:"100%"}}>
        <TouchableOpacity style={{backgroundColor:"#888888", borderWidth:1, borderRadius:90, width:"12.5%", height:"75%", aspectRatio:2.5,
        justifyContent:"center", alignItems:"center"
      }}
      onPress={()=>{setPartySize(calculatePartySize()); setErrorMessage("")}}>
        <Text style={{color:"white"}} adjustsFontSizeToFit={true} numberOfLines={1}>
          Skip
        </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor:"#888888", borderWidth:1, borderRadius:90, width:"12.5%", height:"75%", aspectRatio:2.5,
        justifyContent:"center", alignItems:"center"
      }}
      onPress={()=>toggleOverlay()}>
        <Text style={{color:"white"}} adjustsFontSizeToFit={true} numberOfLines={1}>
          Split
        </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor:"#888888", borderWidth:1, borderRadius:90, width:"12.5%", height:"75%", aspectRatio:2.5,
        justifyContent:"center", alignItems:"center"
      }}
      onPress={()=>router.navigate('/')}>
        <Text style={{color:"white"}} adjustsFontSizeToFit={true} numberOfLines={1}>
          Go Back
        </Text>
        </TouchableOpacity>
      </View>

      <Overlay isVisible={visible} overlayStyle={{width:"75%", backgroundColor: "#1F3A56"}}>
        <View style={{display:"flex", flexDirection:"column", justifyContent:"center", width:"100%", alignItems:"center"}}>
          <Text style={{color:"white"}}>How do you want to split {partySize}?</Text>
          <Text style={{color:"red", marginBottom:"10"}}>{splitErrorMessage}</Text>
        </View>

        <View style={{display:"flex", flexDirection:"row", justifyContent:"space-around", width:"100%", marginBottom:"10"}}>

          <SplitSection split={row1split} rowNumber={"Row 1"} handleSplitIncrease={() => {handleSplitIncrease(1)}} handleSplitDecrease={() => {handleSplitDecrease(1)}}/>
          <SplitSection split={row2split} rowNumber={"Row 2"} handleSplitIncrease={() => {handleSplitIncrease(2)}} handleSplitDecrease={() => {handleSplitDecrease(2)}}/>
          <SplitSection split={row3split} rowNumber={"Row 3"} handleSplitIncrease={() => {handleSplitIncrease(3)}} handleSplitDecrease={() => {handleSplitDecrease(3)}}/>

          {params.id != "C" && <View style={{gap:"5"}}>
          <SplitSection split={passSplit} rowNumber={"Pass"} handleSplitIncrease={() => handleSplitIncrease(0)} handleSplitDecrease={() => handleSplitDecrease(0)}/>
          </View>}
        </View>

        <View style={{display:"flex", flexDirection:"row",justifyContent:"space-between", width:"100%"}}>
          <TouchableOpacity onPress={()=>{toggleOverlay(); clearSplits();}} style={{backgroundColor:"#888888", borderWidth:1, borderRadius:90, width:"25%", height:"100%", aspectRatio:2.5, 
            justifyContent:"center", alignItems:"center"}}>
            <Text style={{color:"white"}} adjustsFontSizeToFit={true} numberOfLines={1}>
              Cancel
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>handleSplit()} style={{backgroundColor:"#888888", borderWidth:1, borderRadius:90, width:"25%", height:"100%", aspectRatio:2.5,
            justifyContent:"center", alignItems:"center"}}>
            <Text style={{color:"white"}} adjustsFontSizeToFit={true} numberOfLines={1}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </Overlay>
      
    </SafeAreaView>
  )
}

export default TheaterSim