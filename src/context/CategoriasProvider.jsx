import { useState, createContext, useEffect } from "react";
import axios from "axios";

const CategoriasContext = createContext()

const CategoriasProvider = ({ children }) => {

    const [categorias,SetCategorias] = useState([])
    const obtenerCategorias = async () => {
        try {
            const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
            const {data} = await axios(url) 
            SetCategorias(data.drinks)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        obtenerCategorias()
    },[])
    return (
        <CategoriasContext.Provider
            value={{
                categorias
            }}
        >
            {children}
        </CategoriasContext.Provider>
    )
}

export { CategoriasProvider }

export default CategoriasContext