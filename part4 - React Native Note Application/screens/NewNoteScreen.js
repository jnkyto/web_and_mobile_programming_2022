/*

DTEK2040 PART 4
Joona Kytöniemi 523008
jnkyto@utu.fi

notes-app
Implementation of Part 4.1 thru 4.8

*/

import React, {useState} from "react"
import {Button, Dimensions, TextInput, View} from "react-native"
import styles from "../styles/Styles"

const height = Dimensions.get('window').height

const NewNoteScreen = ({navigation, addNote}) => {
    const [name, setName] = useState('')
    const [content, setContent] = useState('')

    const handleClick = () => {
        addNote({name, content, navigation})
    }

    return (
        <View style={{flex: 1}}>
            <View style={styles.bg_light}>
                <TextInput
                    style={{padding: 10, color: "#fff", fontWeight: "bold"}}
                    placeholder="Name of note"
                    placeholderTextColor="#aaa"
                    onChangeText={newName => setName(newName)}
                    defaultValue={name}
                    maxLength={48}
                />
                <TextInput
                    style={{padding: 10, color: "#fff"}}
                    placeholder="Start typing your note here"
                    placeholderTextColor="#aaa"
                    onChangeText={newContent => setContent(newContent)}
                    defaultValue={content}
                    multiline={true}
                    numberOfLines={height/25}
                    maxLength={2048}
                />
            </View>
            <Button title="Save note" color={"#eeb600"} onPress={handleClick} />
        </View>
    )
}

export default NewNoteScreen