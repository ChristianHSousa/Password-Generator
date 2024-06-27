import { useState, useEffect } from "react"
import { View, Text, StyleSheet, FlatList } from "react-native"
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context"
import { useIsFocused } from "@react-navigation/native"
import { PasswordItem } from './components/PasswordItem'
import { usePasswordDatabase, PasswordDatabaseType } from "@/database/usePasswordDatabase";
export function Password() {
    const [listPassword, setListPasswords] = useState<PasswordDatabaseType[]>([])
    const focused = useIsFocused();
    const PasswordDatabase = usePasswordDatabase();

    useEffect(() => {
        async function loadPasswords() {
            const passwords = await PasswordDatabase.getAllPasswords();
            console.log(listPassword)
            setListPasswords(passwords);
        }

        loadPasswords();
    }, [focused])

    return (
        <SafeAreaProvider style={{ flex: 1 }}>
            <SafeAreaView>
                <View style={styles.header}>
                    <Text style={styles.title}>Minhas senhas</Text>
                </View>
                <View style={styles.content}>
                    <FlatList
                        style={{ paddingTop: 14 }}
                        data={listPassword}
                        keyExtractor={(item) => (item.password)}
                        renderItem={( {item} ) => <PasswordItem data={item}/>}
                    />
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}
const styles = StyleSheet.create({
    header: {
        backgroundColor: "#392de9",
        paddingTop: "10%",
        paddingBottom: 14,
        paddingLeft: 14,
        paddingRight: 14
    },
    title: {
        fontSize: 25,
        color: "#FFF",
        fontWeight: "bold"
    },
    content: {
        paddingLeft: 14,
        paddingRight: 14
    }
})