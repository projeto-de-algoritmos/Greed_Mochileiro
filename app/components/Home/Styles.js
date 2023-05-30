import { StyleSheet } from "react-native"
import listBox from "../../../assets/list-box.png"
import mochila from "../../../assets/mochila.png"
import mochila_2 from "../../../assets/mochila_2.png"

export const styles = StyleSheet.create({
    botaoX: {
        position: "absolute",
        top: 10,
        right: 10
    },
    botaoAdicionar: {
        position: "absolute",
        bottom: 10,
        alignSelf: "center"
    },
    modal: {
        backgroundColor: 'white',
        height: '80%',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 20,
    },
    texto: {
        position: "absolute",
        top: 40,
        alignSelf: "center"
    },
    fab: {
        position: "absolute",
        zIndex: 10
    },
    imagem: {
        position: "absolute",
        bottom: -150,
        resizeMode: "contain",
        width: 370,
    }
})

export const ListBox = listBox

export const Mochila = mochila

export const Mochila_2 = mochila_2