import {View, Text, TouchableOpacity, Image, TouchableHighlight} from 'react-native';
import {useRouter, } from 'expo-router';
import {images} from '../../../constants'

const TheaterButton = ({theaterName}) =>{
    const router = useRouter();

    const handleTheaterPress = (theaterName) =>{
        console.log(`Yay from ${theaterName}`)
    }

    return (
        <View>
            <TouchableOpacity
            style={{width:150,
                height:150,
                margin:20,
                justifyContent: "center",
                alignItems: "center"}}
                onPress={()=> handleTheaterPress(theaterName)}>
            {theaterName=='A' ? (
                <Image
                source={images.SoarinA}
                style={{width:'100%', height:'100%', resizeMode:"contain"}}
                />
            ): theaterName=='B' ? (
                <Image
                source={images.SoarinB}
                style={{width:'100%', height:'100%', resizeMode:"contain"}}
                />
            ):(
                <Image
                source={images.SoarinC}
                style={{width:'100%', height:'100%', resizeMode:"contain"}}
                />
            )}
            </TouchableOpacity>
        </View>
    )
}

export default TheaterButton;