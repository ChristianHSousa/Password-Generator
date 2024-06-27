import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { usePasswordDatabase, PasswordDatabaseType } from "@/database/usePasswordDatabase";
import * as Clipboard from 'expo-clipboard'

export function PasswordItem( data:PasswordDatabaseType, { removePassword }: any) {

    async function handleCopyPassword() {
        await Clipboard.setStringAsync(data.password)
    }

    return (

        <Pressable onLongPress={removePassword} style={styles.container} onPress={handleCopyPassword}>
            <Text style={styles.text}>{data.account}</Text>
            <Text style={styles.text}>{data.password}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0E0E0E',
        padding: 14,
        width: "100%",
        marginBottom: 14,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    text: {
        color: '#FFF'
    }
})