import { NavigationContainer } from "@react-navigation/native"
import { Routes } from '../../components/route'
import { SQLiteProvider } from "expo-sqlite"
import { InitializeDataBase } from "@/database/InitializeDataBase"
export default function App() {
    return (

        <SQLiteProvider databaseName="myDataBase.db" onInit={InitializeDataBase}>
            <NavigationContainer independent={true}>
                <Routes />
            </NavigationContainer>
        </SQLiteProvider>
    )
}

