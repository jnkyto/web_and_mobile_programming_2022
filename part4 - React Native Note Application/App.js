/*

DTEK2040 PART 4
Joona Kytöniemi 523008
jnkyto@utu.fi

notes-app
Implementation of Part 4.1 thru 4.8

*/

import {ActivityIndicator, Alert, Text, View} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React from "react"
import styles from "./styles/Styles"
import options from "./styles/Options"
import 'react-native-get-random-values' // fixes UUID generation on iOS
import {v4 as UUIDv4} from "uuid"

import NewNoteScreen from "./screens/NewNoteScreen"
import ContentScreen from "./screens/ContentScreen"
import NoteListScreen from "./screens/NoteListScreen"

const Stack = createStackNavigator();

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: false,
            notes: []
        }
    }

    toggleLoading = () => {
        const var_loading = this.state.loading
        this.setState({loading: !var_loading})
    }

    setNotes = (newNotes) => {
        this.setState({notes: newNotes})
    }

    /**
     * Fetches and parses notes from AsyncStorage. Sets app error state upon failure.
     *
     * @returns {Promise<void>}
     */
    getNotesAsync = async() => {
        try {
            const gotNotes = await AsyncStorage.getItem('notes')
            if(gotNotes !== null)  {
                this.setNotes(JSON.parse(gotNotes))
            }
            this.toggleLoading()
        } catch (e) {
            this.setState({error: true})
            console.log(e)
        }
    }

    componentDidMount() {
        this.getNotesAsync().then(() => {return null})
    }

    /**
     * Shows an alert with no action.
     *
     * @param title Title/Headline of the alert
     * @param message Message/Content of the alert
     * @param button_text Text displayed on the button
     */
    showAlert = (title, message, button_text) => {
        Alert.alert(
            title,
            message,
            [{text: button_text, onPress: () => {return null}}])
    }

    /**
     * Adds a new note to AsyncStorage and app state. Doesn't add the note and shows alert
     * if it's name is a duplicate or empty.
     *
     * @param name Name of the new note
     * @param content Content of the new note
     * @param navigation Navigation prop used to go back into NoteListScreen
     * @returns {Promise<void>}
     */
    addNote = async({name, content, navigation}) => {
        let newNotes = this.state.notes

        const newNote = {
            id: UUIDv4(),
            name: name,
            content: content,
            date: new Date().toISOString(),
        }

        let nameSet = []
        this.state.notes.map(note => nameSet.push(note.name))
        if(newNote.name === "") {
            this.showAlert("Note name is missing!",
                "Give your note a name and try again.",
                "OK")
        }
        else if(nameSet.includes(newNote.name)) { // Checking for the same name counts, no?
            this.showAlert("A note with the same name already exists!",
                "Modify the name of your new note and try again.",
                "OK")
        } else {
            newNotes = newNotes.concat(newNote)
            this.setNotes(newNotes)
            try {
                await AsyncStorage.setItem('notes', JSON.stringify(newNotes))
                navigation.navigate("Notes")
            } catch (e) {
                console.log(e)
            }
        }
    }
    /**
     * Clears all notes from AsyncStorage and app state.
     *
     * @returns {Promise<void>}
     */
    clearAllNotes = async() => {
        Alert.alert(
            "Removing all notes",
            "Are you sure you want to remove all notes?",
            [
                {text: "No", onPress: () => {return null}},
                {text: "Yes", style: "destructive", onPress: () => {
                    AsyncStorage.clear()
                    this.setNotes([])}}
            ],{cancelable: false})
    }

    render() {
        if (this.state.loading) {
            return (
                <View>
                    <ActivityIndicator animating={true}/>
                </View>
            )
        }

        if (this.state.error) {
            return (
                <View>
                    <Text>Failed to load notes!</Text>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Notes">
                        <Stack.Screen name="Notes" options={options.header}>
                            {props => <NoteListScreen {...props} notes={this.state.notes} clearAllNotes={this.clearAllNotes}/>}
                        </Stack.Screen>
                        <Stack.Screen name="Content View" component={ContentScreen} options={options.header}/>
                        <Stack.Screen name="New note" options={options.header}>
                            {props => <NewNoteScreen {...props} addNote={this.addNote}/>}
                        </Stack.Screen>
                    </Stack.Navigator>
                </NavigationContainer>
            </View>
        )
    }
}

export default App