import { useEffect, useState } from "react";
import axios from "axios";

const ProductPrice = () => {

    const [exchangeRate, setExchangeRate] = useState();
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const fetchExchangeRate = async () => {
        try {
            const response = await 
            axios.get("https://api.nbp.pl/api/exchangerates/rates/a/usd/?format=json")
            setExchangeRate(response.data)
            setLoading(false)

        } catch (err) {
            setErrorMessage("Błąd")
            setLoading(false)
            console.error(err)
        }
    }

    useEffect(()=>{
        fetchExchangeRate();
        console.log(exchangeRate)
    }, [])

    if (loading) return <p>Ładowanie danych...</p>;
    if (errorMessage) return <p style={{ color: 'red' }}>{errorMessage}</p>;

    return(
        <section>
            <h1>{exchangeRate.rates[0].mid}</h1>
            {console.log(exchangeRate.rates[0].mid)}
        </section>
    )

}
export default ProductPrice;