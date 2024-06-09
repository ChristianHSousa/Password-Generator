import AsyncStorage from "@react-native-async-storage/async-storage"

const useStorage = () => {
    //Buscar itens salvos
    async function getItem (key) {
        try{
            const password = await AsyncStorage.getItem(key);
            return JSON.parse(password) || [];
        }catch(error){
            console.log("Erro ao buscar: ", error)
            return [];
        }
    }

    //Salvar um item no storage
    async function saveItem (key:any, value:any) {
        try {
            let passwords = await getItem(key);
            passwords.push(value);

            await AsyncStorage.setItem(key, JSON.stringify(passwords))
        } catch (error) {
            console.log("Erro ao salvar: ",error)
        }
    }

    //Remover um item do storage
    const removeItem = async (key:any, item:any) => {
        try {
            let passwords = await getItem(key);

            let myPasswords = passwords.filter( (password:any) => {
                return (password !== item)
            })

            await AsyncStorage.setItem(key,JSON.stringify(myPasswords))
            return myPasswords;
        } catch (error) {
            console.log("Erro ao deletar: ", error)
        }
    }

    return(
        //getItem,
        saveItem
        //removeItem
    )
}

export default useStorage;