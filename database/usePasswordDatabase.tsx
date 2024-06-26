import { useSQLiteContext } from "expo-sqlite";

export type PasswordDatabaseType = {
    id: number
    id_category: number
    account: string
    password: string

}

export function usePasswordDatabase() {
    const database = useSQLiteContext();

    async function create(data:Omit<PasswordDatabaseType, "id">){
        const statement = await database.prepareAsync(
            "INSERT INTO account (id_category, account, password) VALUES ($id_category, $account, $password)"
        )

        try {
            // Verifica se ja existe

            const response = statement.executeAsync({
                $id_category: data.id_category,
                $account: data.account,
                $password: data.password
            })

            const localeId = (await response).lastInsertRowId.toLocaleString();
            return localeId;
        } catch (error) {
            throw error;
        } finally {
            await statement.finalizeAsync();
        }
    }

    async function getAllPasswords(){
        
        const query = "SELECT * FROM account"

        try {
            const response = await database.getAllAsync<PasswordDatabaseType>(query);

            return response;
        } catch (error) {
            throw error
        } 
    }

    return {
        getAllPasswords
    }
}