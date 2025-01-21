import {useState} from 'react';
import {View, Text, ScrollView, SafeAreaView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { TheaterButton } from '../components';



const Home = () =>{
    const router = useRouter();

    const navigate = () =>{
        router.push(`/theater-sim/A`)
    }

    return (
        <SafeAreaView style={{display:"flex", backgroundColor: "#ADD8E6", justifyContent:'center', alignItems: 'center',
            width:"100%", height:"100%", gap: 25
        }}>
            <Stack.Screen options={{headerShown: false, headerShadowVisible: false}}> 
            </Stack.Screen>
        <View style={{display:'flex', justifyContent: 'center'}}>
            <Text style={{fontSize:48}}>
                Select a Gate
            </Text>
        </View>
        <View style={{display:"flex", flexDirection:"row", flexWrap:"wrap", gap:5,
            alignContent:"center", justifyContent:"center"
        }}>
            <TheaterButton theaterName="A" handleNavigate={()=> navigate()}/>
            <TheaterButton theaterName="B" handleNavigate={()=> router.push(`/theater-sim/B`)}/>
            <TheaterButton theaterName="C" handleNavigate={()=> router.push(`/theater-sim/C`)}/>
        </View>
        </SafeAreaView>
    )
}

export default Home;