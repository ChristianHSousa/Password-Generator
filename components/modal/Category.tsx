import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Modal, KeyboardAvoidingView, FlatList, Pressable } from 'react-native'
import { NewCategoryModal } from './NewCategory';
import { useIsFocused } from "@react-navigation/native";
import { useCategoryDatabase, CategoryDatabaseType } from '@/database/useCategoryDatabase';
import { CategoryItem } from '@/pages/CategoryItem/CategoryItem';

export function CategoryModalPanel({ handleClose }: any) {
    const [listCategories, setListCategories] = useState<CategoryDatabaseType[]>([]);
    const [newCategoryCall, setVisibleNewCategory] = useState(false);
    const CategoryDatabase = useCategoryDatabase();
    const focused = useIsFocused;

    function callNewCategory() {
        setVisibleNewCategory(true);
    }
    async function refresh() {
        const categories = await CategoryDatabase.getAllName();
        
        if (categories.length === listCategories.length) {
            for (let v = 0; v < categories.length; v++) {
                if (categories[v].name != listCategories[v].name) {
                    setListCategories([]);
                    console.log("Entrou")
                    setListCategories(categories);
                    break
                }
            }
        }else{
            setListCategories(categories);
        }
    }
    useEffect(() => {
        async function loadCategories() {
            const categories = await CategoryDatabase.getAllName();

            setListCategories(categories);
        }
        loadCategories();
    }, [focused, newCategoryCall])

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} enabled={false}>

            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.titulo}>Categorias</Text>
                    <View style={styles.buttonContainer}>

                        <FlatList
                            style={{ paddingTop: 14 }}
                            data={listCategories}
                            renderItem={({ item }) => <CategoryItem data={item.name} estado={() => refresh()}
                            />
                            }
                        />
                    </View>

                    <View style={styles.footer}>
                        <TouchableOpacity style={[styles.button, styles.buttonVoltar]} onPress={handleClose}>
                            <Text style={styles.buttonVoltarText}>Voltar</Text>
                        </TouchableOpacity>
                        <Pressable style={[styles.button, styles.buttonAdd]} onPress={callNewCategory}><Ionicons size={40} color={"white"} name='add' /></Pressable>
                    </View>
                </View>
                <Modal visible={newCategoryCall} animationType='fade' transparent={true}>
                    <NewCategoryModal title={"Nova Categoria"} handleClose={() => setVisibleNewCategory(false)} />
                </Modal>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(24,24,24,0.6)",
        alignItems: "center",
        justifyContent: 'center',
    },
    content: {
        width: "80%",
        height: "80%",
        backgroundColor: "#FFF",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonAdd: {
        backgroundColor: "#392de9",
    },
    button: {
        width: "40%",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        marginTop: 8,
        marginBottom: 8,
    },
    buttonContainer: {
        width: "100%",
        height: "80%",
        borderBottomColor: "#C6C6C6",
        borderBottomWidth: 1,
        borderTopColor: "#C6C6C6",
        borderTopWidth: 1
    },
    buttonVoltar: {
        backgroundColor: "rgba(219, 208, 210, 0.1)",
        borderWidth: 1,
    },
    buttonVoltarText: {
        color: "#000",
        fontSize: 20,
        fontWeight: "bold"
    },
    titulo: {
        fontSize: 25,
        fontWeight: "bold",
        padding: "5%"
    },
    footer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: 'space-around'
    }
})