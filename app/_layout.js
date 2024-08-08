import { Slot } from 'expo-router';
import NavBar from '../components/NavBar';
import { SQLiteProvider } from 'expo-sqlite';
import * as SQLite from 'expo-sqlite';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fab, fas);

export default function HomeLayout() {

    return (
        <SQLiteProvider databaseName='games.db' onInit= { initializeDatabase }>
            <Slot />
            <NavBar />
        </SQLiteProvider>
    );
}

async function initializeDatabase() {
    const db = await SQLite.openDatabaseAsync('games.db');
    await db.execAsync(`
        PRAGMA journal_mode = 'wal';
        CREATE TABLE IF NOT EXISTS games (name TEXT PRIMARY KEY NOT NULL, imageLink TEXT NOT NULL, rating TEXT NOT NULL, publisher TEXT NOT NULL);
    `);

    const result = await db.getAllAsync('SELECT * FROM games');
    if (result.length == 0) {
        await db.runAsync(`INSERT INTO games (name, rating, publisher, imageLink) VALUES (?, ?, ?, ?)`, "Assassins Creed Black Flag", "9/10", "Ubisoft", "https://upload.wikimedia.org/wikipedia/en/thumb/2/28/Assassin%27s_Creed_IV_-_Black_Flag_cover.jpg/220px-Assassin%27s_Creed_IV_-_Black_Flag_cover.jpg");
        await db.runAsync(`INSERT INTO games (name, rating, publisher, imageLink) VALUES (?, ?, ?, ?)`, "Assassins Creed Unity", "7/10", "Ubisoft", "https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Assassin%27s_Creed_Unity_cover.jpg/220px-Assassin%27s_Creed_Unity_cover.jpg");
        await db.runAsync(`INSERT INTO games (name, rating, publisher, imageLink) VALUES (?, ?, ?, ?)`, "Assassins Creed Valhalla", "7/10", "Ubisoft", "https://upload.wikimedia.org/wikipedia/en/thumb/f/ff/Assassin%27s_Creed_Valhalla_cover.jpg/220px-Assassin%27s_Creed_Valhalla_cover.jpg");
    }
}



