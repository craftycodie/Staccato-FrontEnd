import StaccatoClient from "../StaccatoClient";
import { useQuery } from '@tanstack/react-query'

const useAlbum = (id: string) => {
    const staccatoClient = new StaccatoClient(process.env.REACT_APP_API_URL!)

    return useQuery(['album'], async () => {
        return await staccatoClient.getAlbum(id);
    })
}

export default useAlbum;