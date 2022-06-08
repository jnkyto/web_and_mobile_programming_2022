/*

DTEK2040 PART 4
Joona Kytöniemi 523008
jnkyto@utu.fi

notes-app
Implementation of Part 4.1 thru 4.8

*/

import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    no_notes: {
        color: "#aaa",
        textAlign: "center",
        padding: 64
    },
    bg_dark: {
        backgroundColor: '#222'
    },
    bg_light: {
        flex: 1,
        backgroundColor: '#333'
    },
    pressable_text: {
        fontWeight: "bold",
        color: "#eee",
    },
    pressable_date: {
        color: "#999"
    },
    content_name: {
        color: "#fff",
        fontWeight: "bold",
        paddingHorizontal: 10,
        paddingTop: 10
    }
})

export default styles