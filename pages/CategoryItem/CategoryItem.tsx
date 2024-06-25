
import { CategoryDatabaseType } from '@/database/useCategoryDatabase';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View, StyleSheet, Modal, } from 'react-native';
import { useCategoryDatabase } from '@/database/useCategoryDatabase';
import { NewCategoryModal } from '@/components/modal/NewCategory';
import { useState } from 'react';

export function CategoryItem({ data, estado}:any) {
    const CategoryDatabase = useCategoryDatabase();
    const [name, setName] = useState(data);
    const [editItem, setEditItem] = useState(false);

    function edit(){
        setEditItem(true)
    }
    function exit(){
        setEditItem(false);
        estado();
    }

    async function deleteByName(name:any){
        const result = await CategoryDatabase.deleteByName(data);
        estado();
    }
    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>{name}</Text>
            <Pressable style={styles.icon} onPress={edit}><Ionicons size={40} color={"white"} name='create' /></Pressable>
            <Pressable><Ionicons size={40} color={"red"} name='close' onPress={deleteByName}/></Pressable>
            <Modal transparent={true} visible={editItem} animationType='fade'>
                <NewCategoryModal title={"Editar categoria"} data={name} handleClose={() => exit()} />
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        marginBottom: 10,
        width: "95%",
        flexDirection: "row",
        alignSelf: 'center',
        borderRadius: 8
    },
    textStyle: {
        width: "75%",
        paddingLeft: "5%",
        textAlignVertical: 'center',
        fontSize: 20,
        color: "#FFF"
    },
    icon: {
        marginRight: 10
    }
})