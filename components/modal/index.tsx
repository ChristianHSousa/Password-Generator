import { View, StyleSheet, Text, TouchableOpacity, Pressable } from "react-native";
import * as Clipboard from 'expo-clipboard'
import { useCategoryDatabase, CategoryDatabaseType } from '@/database/useCategoryDatabase';
import { usePasswordDatabase } from "@/database/usePasswordDatabase";
import { Picker } from "@react-native-picker/picker";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";

export function ModalPassword({ password, handleClose }: any) {
    const PasswordDatabase = usePasswordDatabase();
    const CategoryDatabase = useCategoryDatabase();
    const focused = useIsFocused;
    const [passwordAccount, setPasswordAccount] = useState(password)
    const [account, setAccount] = useState('chrishsouza@gmail.com')
    const [listCategories, setListCategories] = useState<CategoryDatabaseType[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('')

    async function handleCopyPassword() {
        const response = await CategoryDatabase.getIdByName(selectedCategory);
        const id_category = response[0].id
        setPasswordAccount(password)
        const PasswordAccountType = {
            id_category: id_category,
            account: account,
            password: passwordAccount
        }
        const create = await PasswordDatabase.create(PasswordAccountType)
        await Clipboard.setStringAsync(password)
    }

    const renderCategories = () => {
        return listCategories.map((categoria) => {
            return <Picker.Item label={categoria.name} value={categoria.name} />
        })
    }
    useEffect(() => {
        async function loadCategories() {
            setListCategories([]);
            const categories = await CategoryDatabase.getAllName();
            setListCategories(categories);

        }
        loadCategories();
    }, [focused])

    return (

        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Senha gerada</Text>

                <Pressable style={styles.innerPassword} onLongPress={handleCopyPassword}>
                    <Text style={styles.text}>{password}</Text>
                </Pressable>
                <Picker
                    style={styles.picker}
                    selectedValue={selectedCategory}
                    onValueChange={(value, index) => setSelectedCategory(value)}
                    mode="dropdown"
                >
                    {renderCategories()}
                </Picker>
                <View style={styles.buttonArea}>
                    <TouchableOpacity style={[styles.button, styles.buttonVoltar]} onPress={handleClose}>
                        <Text style={styles.buttonText}>Voltar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, styles.buttonSave]} onPress={handleCopyPassword}>
                        <Text style={[styles.buttonSaveText, styles.buttonText]}>Salvar</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(24,24,24,0.6)",
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    content: {
        backgroundColor: "#FFF",
        width: "85%",
        paddingTop: 24,
        paddingBottom: 24,
        alignItems: "center",
        borderRadius: 8
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 24,
    },
    innerPassword: {
        backgroundColor: "#0E0E0E",
        width: "90%",
        padding: 14,
        borderRadius: 8
    },
    text: {
        color: "#FFF",
        textAlign: "center",
    },
    buttonArea: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-around"
    },
    button: {
        alignItems: "center",
        width: "40%",
        marginTop: 14,
        marginBottom: 14,
        padding: 8,
        borderRadius: 8,
        justifyContent: "center",
        textAlign: "center",
    },
    buttonSave: {
        backgroundColor: "#392DE9",
    },
    buttonText: {
        fontWeight: "bold"
    },
    buttonSaveText: {
        color: "#FFF"
    },
    buttonVoltar: {
        backgroundColor: "rgba(219, 208, 210, 0.1)",
        borderWidth: 1,
    },
    picker: {
        height: 40,
        width: "90%",
        backgroundColor: "rgba(219, 208, 210, 0.5)",
        marginTop: 8,
    },
})