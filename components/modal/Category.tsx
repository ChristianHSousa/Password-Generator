import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Modal, KeyboardAvoidingView, Platform } from 'react-native'
import { NewCategoryModal } from './NewCategory';
import { useIsFocused } from "@react-navigation/native";
import useStorage from "@/hooks/useStorage";
export function CategoryModalPanel({ handleClose }: any) {
    const { getItem, saveItem, removeItem } = useStorage();
    const [listCategories, setListCategories] = useState([]);
    const [newCategoryCall, setVisibleNewCategory] = useState(false);
    const foused = useIsFocused;
    function callNewCategory() {
        setVisibleNewCategory(true);
    }
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} enabled={false}>

            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.titulo}>Categorias</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.button, styles.buttonAdd]} onPress={callNewCategory}>
                            <Ionicons name="add" color={"white"} size={100}></Ionicons>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.buttonVoltar} onPress={handleClose}>
                        <Text style={styles.buttonVoltarText}>Voltar</Text>
                    </TouchableOpacity>
                </View>
                <Modal visible={newCategoryCall} animationType='fade' transparent={true}>
                    <NewCategoryModal handleClose={() => setVisibleNewCategory(false)} />
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
        backgroundColor: "#C6C6C6",
        opacity: 0.5,
    },
    button: {
        height: 120,
        width: 120,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        margin: 15
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
        backgroundColor: "#392de9",
        width: "70%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        margin: "auto"
    },
    buttonVoltarText: {
        color: "#FFF",
        fontSize: 20
    },
    titulo: {
        fontSize: 25,
        fontWeight: "bold",
        padding: "5%"
    }
})