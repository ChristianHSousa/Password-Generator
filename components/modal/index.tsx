import { View, StyleSheet, Text } from "react-native";

export function ModalPassword() {

    return (
        <View style={styles.container}> 
            <View style={styles.content}>
                <Text style={styles.title}>Senha gerada</Text>
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"rgba(24,24,24,0.6)",
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    content:{
        backgroundColor:"#FFF",
        width:"85%",
        paddingTop:24,
        paddingBottom:24,
        alignItems:"center",
        borderRadius:8
    },
    title:{
        fontSize:20,
        fontWeight:"bold",
        color:"#000",
        marginBottom:24
    }
})