import { useState, useEffect } from "react"
import { View, Text, StyleSheet } from "react-native"
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context"
import { useIsFocused } from "@react-navigation/native"
import useStorage from "@/hooks/useStorage"; '../../hooks/useStorage'

export function Password() {
    const [listPassword, setListPasswords] = useState([])
    const focused = useIsFocused();
    const {getItem,saveItem,removeItem}:any = useStorage();
    useEffect(() => {
        async function loadPasswords(){
            const passwords = await getItem("@pass")
            console.log(passwords)
        }

        loadPasswords();
    },[focused])
    return (
        <SafeAreaProvider style={{ flex: 1 }}>
            <SafeAreaView>
                <View style={styles.header}>

                    <Text style={styles.title}>Minhas senhas</Text>
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
    title:{
        fontSize:25,
        color:"#FFF",
        fontWeight:"bold"
    }
})