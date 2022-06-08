/*

DTEK2040 PART 4
Joona Kytöniemi 523008
jnkyto@utu.fi

notes-app
Implementation of Part 4.1 thru 4.8

*/

import {Text, View} from "react-native"
import React from "react"
import styles from "../styles/Styles"

const ContentScreen = (props) => {
    const date = new Date(props.route.params.date)
    return (
        <View style={{flex: 1}}>
            <View style={styles.bg_light}>
                <Text style={styles.content_name}>{props.route.params.name}</Text>
                <Text style={{color: "#999", paddingHorizontal: 10}}>
                    {date.toLocaleDateString()} {date.getHours()}:{(date.getMinutes().toString().length > 1 ?
                    date.getMinutes() : (`0${date.getMinutes()}`))}{"\n"}
                    {props.route.params.id}
                </Text>
                <Text style={{color: "#fff", padding: 10}}>{props.route.params.content}</Text>
            </View>
        </View>
    )
    // the date looks ugly, but it's necessary to avoid timestamps like 19:2
}

export default ContentScreen