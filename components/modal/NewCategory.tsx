import * as React from 'react';
import { View, StyleSheet, Text, Pressable, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { useCategoryDatabase } from '@/database/useCategoryDatabase';
export function NewCategoryModal({ handleClose }: any) {
    const [name, onChangeName] = React.useState('');

    const CategoryDatabase = useCategoryDatabase();

    async function create() {
        try {
            const response = await CategoryDatabase.create({ name })
            onChangeName('');
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} enabled={false}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.titulo}>Nova categoria</Text>
                    <View style={styles.TextView}>
                        <TextInput
                            style={styles.textField}
                            onChangeText={onChangeName}
                            value={name}
                            placeholder="Digite o nome da categoria"
                            maxLength={25}
                            textAlign='center'
                        />
                    </View>
                    <View style={styles.containerButtom}>
                        <Pressable onPress={handleClose} style={styles.button}>
                            <Text>Cancelar</Text>
                        </Pressable>
                        <TouchableOpacity style={[styles.button, styles.buttonSalvar]} onPress={create}>
                            <Text style={styles.SaveText}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
        backgroundColor: "#FFF",
        width: "85%",
        paddingTop: 24,
        paddingBottom: 24,
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 8
    },
    textField: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10
    },
    TextView: {
        width: "90%",
        textAlign: 'center'
    },
    containerButtom: {
        width: '90%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonSalvar: {
        backgroundColor: "#392de9",
    },
    button: {
        flex: 1,
        alignItems: "center",
        marginTop: 5,
        marginBottom: 5,
        padding: 8,
        borderRadius: 8
    },
    SaveText: {
        color: "#FFF",
    },
    titulo: {
        fontSize: 25,
        fontWeight: "bold",
        padding: "1%"
    }
})