import { SQLiteDatabase } from "expo-sqlite";

export const DATABASE_NAME = 'app.db';
export const TB_USERS_NAME = 'users';
export const TB_LOCATIONS_NAME = 'locations';
export const CURRENT_USER = {
    user_id: 0
};
const DATABASE_VERSION = 1;

const CREATE_TB_USERS = `
    CREATE TABLE ${TB_USERS_NAME} (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        logado BIT NOT NULL,
        created_at DATE NULL,
        updated_at DATE NULL
    )
`;

const CREATE_TB_LOCATIONS = `
    CREATE TABLE ${TB_LOCATIONS_NAME} (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        latitude TEXT NOT NULL,
        longitude TEXT NOT NULL,
        markerColor TEXT NOT NULL,
        user_id INTEGER NOT NULL,
        created_at DATE NULL,
        updated_at DATE NULL
    )
`;

export const SELECT_USER_LOGGED = `SELECT * FROM ${TB_USERS_NAME} where logado = 1`

export async function migrateDB(db: SQLiteDatabase) {
    try {
        let response = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
        let { user_version: dbVersion } = response ?? { user_verion: 0 };

        if (dbVersion >= DATABASE_VERSION) return;
        if (dbVersion === 0) {
            await db.execAsync(`${CREATE_TB_USERS}`)
            await db.execAsync(`${CREATE_TB_LOCATIONS}`)
            console.log(`migrate: Banco criado`)
        }
        // if (dbVersion < DATABASE_VERSION) {
        //migrate uodate
        // }
        await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
    } catch (error) {
        console.log(`Erro ao criar DB: ${error}`)
    };

}
