import {type SQLiteDatabase } from 'expo-sqlite';

export async function InitializeDataBase(database: SQLiteDatabase){
    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS category (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE
        );

        CREATE TABLE IF NOT EXISTS account (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_category INTEGER REFERENCES category(id),
        account TEXT,
        password TEXT NOT NULL
        );
        `)
}