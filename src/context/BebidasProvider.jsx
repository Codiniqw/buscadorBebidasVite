import { useState, createContext, useEffect } from "react";
import axios from "axios";

const BebidasContext = createContext()

const BebidasProvider = ({ children }) => {
    const [bebidas, setBebidas] = useState([])
    const [modal, setModal] = useState(false)
    const [bebidaId, setBebidaId] = useState(null)
    const [receta, setReceta] = useState({})
    const [spinner,setSpinner] = useState(false)

    useEffect(() => {
        setSpinner(true)
        const obtenerReceta = async () => {
            if (!bebidaId) return

            try {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${bebidaId}`
                const { data } = await axios(url)
                setReceta(data.drinks[0])
            } catch (error) {
                console.log(error)
            } finally{
                setSpinner(false)
            }
        }
        obtenerReceta()
    }, [bebidaId])

    const consultarBebida = async datos => {
        const category = `${datos.categoria}`.toString()
        let result = category.replace(/\s/g, '_')
        console.log(result)
        try {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${datos.nombre}&c=${result}`
            const { data } = await axios(url)
            console.log(url)
            setBebidas(data.drinks)
        } catch (error) {
            console.log(error)

        }
    }
    const handleModalClick = () => {
        setModal(!modal)
    }
    const handlebebidaIdClick = id => {
        setBebidaId(id)
    }
    return (
        <BebidasContext.Provider
            value={{
                bebidas,
                modal,
                receta,
                spinner,
                consultarBebida,
                handleModalClick,
                handlebebidaIdClick,

            }}
        >
            {children}
        </BebidasContext.Provider>
    )
}

export { BebidasProvider }

export default BebidasContext