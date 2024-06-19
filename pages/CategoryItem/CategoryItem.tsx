
import { CategoryDatabaseType } from '@/database/useCategoryDatabase';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View, StyleSheet } from 'react-native';

export function CategoryItem( {data} ) {

    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>{data}</Text>
            <Pressable style={styles.icon}><Ionicons size={40} color={"white"} name='create'/></Pressable>
            <Pressable><Ionicons size={40} color={"red"} name='close'/></Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#000',
        marginBottom:10,
        width:"95%",
        flexDirection:"row",
        alignSelf:'center',
        borderRadius:8
    },
    textStyle:{
        width:"75%",
        paddingLeft:"5%",
        textAlignVertical:'center',
        fontSize:20,
        color:"#FFF"
    },
    icon: {
        marginRight:10
    }
})