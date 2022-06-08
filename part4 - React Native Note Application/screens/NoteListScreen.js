/*

DTEK2040 PART 4
Joona Kytöniemi 523008
jnkyto@utu.fi

notes-app
Implementation of Part 4.1 thru 4.8

*/

import {Button, Pressable, ScrollView, Text, View} from "react-native";
import styles from "../styles/Styles";
import React from "react";

const NoteListing = (props) => {
    const date = new Date(props.date)
    return (
        // utilize Pressable instead of Button, because it looks cooler
        <Pressable
            onPress = {() => props.navigation.navigate('Content View', { id: props.id, name: props.name, date: props.date, content: props.content })}
            style = {({ pressed }) => [
                {
                    borderColor: '#484848',
                    borderStyle: "solid",
                    borderBottomWidth: 1,
                    padding: 15,
                    backgroundColor: pressed
                        ? '#444'
                        : '#333'
                }
            ]}>
            <Text style={styles.pressable_text}>
                {props.name}
            </Text>
            <Text style={styles.pressable_date}>
                {date.toLocaleDateString()} {date.getHours()}:{(date.getMinutes().toString().length > 1 ?
                date.getMinutes() : (`0${date.getMinutes()}`))}
            </Text>
        </Pressable>
        // the date looks ugly, but it's necessary to avoid timestamps like 19:2
    )
}
/**
 * Checks the existence of notes via array length
 *
 * @param navigation Navigation prop used to go into ContentScreen
 * @param notes Notes dictarray got from app state
 * @returns {JSX.Element|*}
 */
const check_notes = (navigation, notes) => {
    if(notes.length > 0) { // check whether notes exist or not
        return (
            notes.map(note =>
                <NoteListing
                    key = {note.id}
                    id = {note.id}
                    name = {note.name}
                    content = {note.content}
                    date = {note.date}
                    navigation = {navigation}
                />)
        )
    } else return (
        <Text style={styles.no_notes}>
            No saved notes. Add a new note by clicking the button below
        </Text>
    )
}

const NoteListScreen = ({navigation, notes, clearAllNotes}) => {
    return (
        <View style={{flex: 1}}>
            <ScrollView style={styles.bg_light}>
                {check_notes(navigation, notes)}
            </ScrollView>
            <Button title="New note" color={"#eeb600"} onPress={() => navigation.navigate('New note')} />
            <Button title="Clear all notes" color={"#ee0038"} onPress={() => clearAllNotes()} />
        </View>
    )
}

export default NoteListScreen