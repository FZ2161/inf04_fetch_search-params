import axios from "axios";
import { useEffect, useState } from "react";

const PhotoGalery = () => {

    //states
    const [photos, setPhotos] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState("")

    //fetch
    const fetchPhotos = async () => {
        try{
            const response = 
            await axios.get("https://jsonplaceholder.typicode.com/photos?_limit=10")
            console.log("response", response)
            setPhotos(response.data)
            setIsLoading(false)

        } catch (err) {
            setIsLoading(false)
            setErrorMessage("error: ...")
            console.error(err)
        }
    }
    //useeffect
    useEffect(()=>{
        fetchPhotos();
    }, [])

    //loading...
    if(isLoading) return <p>loading...</p>
    if(errorMessage) return <p style={{color: 'red'}} >{errorMessage}</p>

    return (
        
        <section>
            {console.log('photos2', photos)}
            <h1>photos</h1>
            {photos.map((photo)=>{
                {console.log(`photo nr ${photo.id}:`,photo)}
                // <section key={photo.id}>
                <h2>{photo.title}</h2>
                // </section>
            })}
        </section>
    )
}
export default PhotoGalery;