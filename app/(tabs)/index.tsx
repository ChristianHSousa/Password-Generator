import { NavigationContainer } from "@react-navigation/native"
import { Routes } from '../../components/route'
export default function App() {
    return (

        <NavigationContainer independent={true}>
            <Routes />
        </NavigationContainer>
    )
}

