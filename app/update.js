import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Button from '../components/Button';
import { useSQLiteContext } from 'expo-sqlite';
import { TextInput } from 'react-native-paper';

const update = () => {
  const [index, setIndex] = useState(0)

  const [waiting, setWaiting] = useState(true);


  const [newGame, updateNewGame] = useState({
    "name":"", "rating":"", "publisher":"", "imageLink":""
  })

  const db = useSQLiteContext();
  const [games, setGames] = useState([]);

  const insertNewGame = async (name, uri, rating, publisher) => {
    console.log(name, uri, rating, publisher)
    await db.runAsync(`
      INSERT INTO games (name, rating, publisher, imageLink) VALUES (?, ?, ?, ?)`, name,rating,publisher,uri);
    }

  const updateGames = async (name, uri, rating,  publisher, gameToReplace) => {
    console.log(name, uri, rating, publisher)
    await db.runAsync(`
      UPDATE games SET name = ?, rating = ?,  publisher = ?, imageLink = ? WHERE name = ?`, name,rating,publisher,uri,gameToReplace);
    }

  const removeGame = async (name) => {
    await db.runAsync(`
      DELETE FROM games WHERE name = ? `, name)
  }

  useEffect(() => {
    async function setup() {
      const result = await db.getAllAsync('SELECT * FROM games');
      setGames(result);
      setWaiting(false);
    }
    setup();
  }, []);

if(!waiting){
 return (
    <View style={styles.container}>
     <Text>Game to Replace</Text>
     <Text style={styles.gameName}>{ games[index].name }</Text>
     <View style={styles.buttonBar}>
        <Button label={"Prev"} onPress={()=> setIndex(Math.max(index - 1, 0))}></Button>
        <Button label={'Next'} onPress={()=> setIndex(Math.min(index + 1, games.length - 1))}></Button>
     </View>
      <TextInput
        style={styles.input}
        placeholder="Paste Image URL here"
        onChangeText={image => updateNewGame({...newGame, imageLink:image})}
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="New Name"
        onChangeText={name => updateNewGame({...newGame, name:name})}
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="New Rating"
        onChangeText={rating => updateNewGame({...newGame, rating:rating})}
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="New Publisher"
        onChangeText={publisher => updateNewGame({...newGame, publisher:publisher})}
        placeholderTextColor="#888"
      />
      <View style={styles.buttonBar}>
        <Button label={"Submit"} onPress={() => {
          updateGames(newGame.name, newGame.imageLink, newGame.rating, newGame.publisher, games[index].name)
        }}></Button>
       </View>
      <View style={styles.buttonBar}>
        <Button label={"Add New Game"} onPress={() => {
          insertNewGame(newGame.name, newGame.imageLink, newGame.rating, newGame.publisher)
        }}></Button>
        <Button label={"Delete This Game"} onPress={() => {
          removeGame(games[index].name)
        }}></Button>
      </View>
    </View>
  );
  }
}

const styles = StyleSheet.create({
  label: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 13,
    borderRadius: 5,
    width: 200,
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightskyblue',
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '80%',
    backgroundColor: '#fff',
  },
  gameName: {
    fontWeight: "bold",
  },
  buttonBar: {
    flexDirection: "row",
    justifyContent: "space-around",
  }
});

export default update;