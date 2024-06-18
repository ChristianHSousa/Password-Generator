import { useSQLiteContext } from "expo-sqlite"

export type CategoryDatabase = {
    id: number
    name: string
}

export function useCategoryDatabase() {
    const database = useSQLiteContext();

    async function create(data: Omit<CategoryDatabase, "id">) {
        const statement = await database.prepareAsync(
            "INSERT INTO category (name) VALUES ($name)");

        try {
            const search = await searchByName(data.name);
            console.log(data.name);
            //const result = await statement.executeAsync({
            //    $name: data.name
            //})

        //const insertedRowId = result.lastInsertRowId.toLocaleString()

        //return { insertedRowId }
        } catch (error) {
            throw error
        }
    }

    async function searchByName(name: string){
        try {
            const query = "SELECT * FROM category"

            const response = await database.getAllAsync<CategoryDatabase>(query);
            
            return response;
        } catch (error) {
            throw error
        }
    }

    return {
        create,
        searchByName
    }
}