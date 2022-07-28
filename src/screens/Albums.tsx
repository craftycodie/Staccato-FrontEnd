import { FunctionComponent } from "react";
import useAlbums from "../hooks/useAlbums";
import StaccatoClient from "../StaccatoClient";
import { useNavigate } from "react-router-dom";

const Albums: FunctionComponent = () => {
    const albums = useAlbums();
    const staccatoClient = new StaccatoClient(process.env.REACT_APP_API_URL!)
    const navigate = useNavigate();

    if (albums.isLoading || !albums.data) {
        return (
            <h1>Loading albums...</h1>
        )
    }

    console.log({albums})

    return (
        <div>
            <h1>Staccato - All Albums</h1>
            <hr/>
            <button onClick={() => navigate("/albums/create")}>
                ✖️ Create Album
            </button>
            {albums.data?.map(album => (
                <div>
                    <h2>
                        {`${album.name} `}
                        <button onClick={async () => {
                            await staccatoClient.deleteAlbum(album.id)
                            albums.refetch()
                        }}>
                            ❌ Delete Album
                        </button>
                    </h2>
                    <ul>
                        {album.tracks.map(track => {
                            return (
                                <li>
                                    {`${track.name} - ${track.artist} (${track.genre}) `}
                                    <button onClick={async () => {
                                        navigate(`/albums/${album.id}/tracks/${track.id}`)
                                    }}>
                                        📝 Edit Track
                                    </button>
                                    <button onClick={async () => {
                                        await staccatoClient.deleteTrack(album.id, track.id)
                                        albums.refetch()
                                    }}>
                                        ❌ Delete Track
                                    </button>
                                </li>
                            )
                        })}
                        <li>
                            <button onClick={() => navigate(`/albums/${album.id}/tracks/create`)}>
                                ✖️ Add Track
                            </button>
                        </li>
                    </ul>
                </div>
            ))}
        </div>
    )

}

export default Albums