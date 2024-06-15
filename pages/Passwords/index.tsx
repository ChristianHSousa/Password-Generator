import { useState, useEffect } from "react"
import { View, Text, StyleSheet, FlatList } from "react-native"
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context"
import { useIsFocused } from "@react-navigation/native"
import useStorage from "@/hooks/useStorage"; '../../hooks/useStorage'
import { PasswordItem } from './components/PasswordItem'
export function Password() {
    const [listPassword, setListPasswords] = useState([])
    const focused = useIsFocused();
    const {getItem,saveItem,removeItem}:any = useStorage();
    useEffect(() => {
        async function loadPasswords(){
            const passwords = await getItem("@pass")
            setListPasswords(passwords);
        }

        loadPasswords();
    },[focused])

    async function handleDeletePassword(item:any){
        const passwords = await removeItem("@pass",item)
        setListPasswords(passwords)
    }

    return (
        <SafeAreaProvider style={{ flex: 1 }}>
            <SafeAreaView>
                <View style={styles.header}>
                    <Text style={styles.title}>Minhas senhas</Text>
                </View>
                <View style={styles.content}>
                    <FlatList
                    style={{paddingTop:14}}
                    data={listPassword}
                    keyExtractor={ (item) => String(item)}
                    renderItem={({item}) => <PasswordItem data={item} removePassword={ () => handleDeletePassword(item) }/>}
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
    title:{
        fontSize:25,
        color:"#FFF",
        fontWeight:"bold"
    },
    content:{
        //flex:1,
        paddingLeft:14,
        paddingRight:14
    }
})