import StaccatoClient from "../StaccatoClient";
import { useQuery } from '@tanstack/react-query'

const useAlbums = () => {
    const staccatoClient = new StaccatoClient(process.env.REACT_APP_API_URL!)

    return useQuery(['albums'], async () => {
        return await staccatoClient.getAlbums();
    })
}

export default useAlbums;