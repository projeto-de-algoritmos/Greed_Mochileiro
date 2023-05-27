import { useState } from "react";
import { TextInput } from "react-native-paper";

export default function Home() {
    const [text, setText] = useState("")

    return (
        <>
            <TextInput
                label="Capacidade da mochila"
                value={text}
                cursorColor="white"
                defaultValue="20"
                activeOutlineColor="white"
                textColor="white"
                outlineColor="white"
                selectionColor="rgba(255,255,255,0.5)"
                placeholderTextColor="white"
                placeholder="20"
                onChangeText={text => setText(text.replace(/[^0-9]/g, ''))}
                right={<TextInput.Affix text="kg" textStyle={{color: 'white'}}/>}
                keyboardType="numeric"
                style={{
                    position: "absolute",
                    width: 250,
                    fontSize: 12,
                    top: 80,
                    backgroundColor: 'transparent',
                    textAlignVertical: "bottom"
                }}
                mode="outlined"
                outlineStyle={{
                    borderStyle: "dashed",
                    top: 15,
                    bottom: 5,
                }}

            />
            
        </>
    )
}