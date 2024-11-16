import { useEffect, useState } from "react";
import { getData } from "../modules/DataManager";
import { Surface, Text, TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native";

export function KeyViewer(){
    const [val, setVal] = useState("");
    const [result, setResult] = useState("")
    //getData]
    const [allKeys, setAllKeys] = useState([])
    

    useEffect(()=>{
        AsyncStorage.getAllKeys().then(result=>{setAllKeys(result.map(key=>key + '\n\n'))})
    },[])

    useEffect(() =>{
        getData(val).then(data =>{
            setResult(data);
        }).catch(e =>{
            console.error(e);
        });
    },[val])


    return(
        <ScrollView>
            <Text>{allKeys}</Text>
            <TextInput 
            value={val}
            onChangeText={text => setVal(text)}
            ></TextInput>
            <Text>
                {result}
            </Text>
        </ScrollView>
    );
}