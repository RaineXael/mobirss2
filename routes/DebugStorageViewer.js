import { useEffect, useState } from "react";
import { getData } from "../modules/DataManager";
import { Surface, Text, TextInput } from "react-native-paper";

export function KeyViewer(){
    const [val, setVal] = useState("");
    const [result, setResult] = useState("")
    //getData
    

    useEffect(() =>{
        getData(val).then(data =>{
            setResult(data);
        }).catch(e =>{
            console.error(e);
        });
    },[val])


    return(
        <Surface>
            <TextInput 
            value={val}
            onChangeText={text => setVal(text)}
            ></TextInput>
            <Text>
                {result}
            </Text>
        </Surface>
    );
}