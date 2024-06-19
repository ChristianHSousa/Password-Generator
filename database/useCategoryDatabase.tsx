import { useSQLiteContext } from "expo-sqlite"

export type CategoryDatabaseType = {
    id: number
    name: string
}

export function useCategoryDatabase() {
    const database = useSQLiteContext();

    async function create(data: Omit<CategoryDatabaseType, "id">) {
        const statement = await database.prepareAsync(
            "INSERT INTO category (name) VALUES ($name)");

        try {
            const search = await searchByName(data.name);
            const result = await statement.executeAsync({
                $name: data.name
            })

        const insertedRowId = result.lastInsertRowId.toLocaleString()

        return { insertedRowId }
        } catch (error) {
            throw error
        } finally {
            await statement.finalizeAsync()
        }
    }

    async function searchByName(name: string){
        try {
            const query = "SELECT * FROM category"

            const response = await database.getAllAsync<CategoryDatabaseType>(query);
            
            return response;
        } catch (error) {
            throw error
        }
    }

    async function getAllName(){
        try {
            const query = "SELECT name FROM category"

            const response = await database.getAllAsync<CategoryDatabaseType>(query);
            
            return response;
        } catch (error) {
            throw error
        }
    }


    async function deleteAll(){
        const statement = database.prepareAsync("DELETE FROM category;")
        try {

            const response = (await statement).executeAsync();
        } catch (error) {
            throw error;
        } finally{
            (await statement).finalizeAsync()
        }
    }

    return {
        create,
        searchByName,
        deleteAll,
        getAllName
    }
}