import { StyleSheet, View, Text } from "react-native";
import { useState, useEffect } from 'react';
import { useSQLiteContext } from "expo-sqlite";
import Button from "../components/Button";
import Game from "../components/Game";

export default function App() {
    const database = useSQLiteContext();
    const [index, setIndex] = useState(0);
    const [games, setGames] = useState([]);
    const [waiting, setWaiting] = useState(true);

    useEffect(() => {
        async function setup() {
            const result = await database.getAllAsync('SELECT * FROM games');
            setGames(result);
            setWaiting(false);
        }
        setup();
    }, []);

    if(!waiting){
        return (
                <View style={styles.container}>
                    <Game props={games[index]} />
                    <View style={styles.navButtons}>
                        <Button label={'Prev'} onPress={() => setIndex(Math.max(index - 1, 0))}></Button>
                        <Button label={'Next'} onPress={() => setIndex(Math.min(index + 1, games.length - 1))}></Button>
                    </View>
                </View>
            );
    }

}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightskyblue',
        flex: 1,
    },
    navButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
})
