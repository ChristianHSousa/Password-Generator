import * as React from 'react';
import { View, StyleSheet, Text, Pressable, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { useCategoryDatabase } from '@/database/useCategoryDatabase';
export function NewCategoryModal({title, data, handleClose }: any) {
    const [name, onChangeName] = React.useState(data);
    const CategoryDatabase = useCategoryDatabase();

    async function create() {
        try {
            const response = await CategoryDatabase.create({ name })
            onChangeName('');
        } catch (error) {
            console.log(error);
        }
    }
    async function action() {
        if (title == "Editar categoria"){
            const response = await CategoryDatabase.updateByName(data,name);
            handleClose();
        } else {
            create();
        }
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} enabled={false}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.titulo}>{title}</Text>
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
                        <Pressable onPress={handleClose} style={[styles.button,styles.buttonVoltar]}>
                            <Text style={styles.Text}>Cancelar</Text>
                        </Pressable>
                        <TouchableOpacity style={[styles.button, styles.buttonSalvar]} onPress={action}>
                            <Text style={[styles.SaveText,styles.Text]}>Salvar</Text>
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
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonSalvar: {
        backgroundColor: "#392de9",
    },
    button: {
        width:"40%",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        textAlign:"center",
        marginTop: 8,
        padding:8,
        marginBottom: 8,
    },
    Text:{
        fontWeight:'bold'
    },
    SaveText: {
        color: "#FFF",
    },
    titulo: {
        fontSize: 25,
        fontWeight: "bold",
        padding: "1%"
    },
    buttonVoltar: {
        backgroundColor: "rgba(219, 208, 210, 0.1)",
        borderWidth:1,
    },
})