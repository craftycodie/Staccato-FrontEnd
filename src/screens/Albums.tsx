import React, { FunctionComponent, useState } from "react";
import useAlbums from "../hooks/useAlbums";
import StaccatoClient from "../StaccatoClient";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Albums: FunctionComponent = () => {
    const albums = useAlbums();
    const staccatoClient = new StaccatoClient(process.env.REACT_APP_API_URL!)
    const navigate = useNavigate();

    const [ selectedTracks, updateSelectedTracks ] = useState<{ [albumId: string ]: string[] }>({})

    if (albums.isLoading || !albums.data) {
        return (
            <h1>Loading albums...</h1>
        )
    }


    const handleTrackSelectChange = (e: React.ChangeEvent<HTMLInputElement>, albumId: string, trackId: string) => {
        const selected = e.target.checked;
        const trackInSelectedList = albumId in selectedTracks && selectedTracks[albumId].includes(trackId)

        if (trackInSelectedList && !selected) {
            updateSelectedTracks({
                ...selectedTracks,
                [albumId]: selectedTracks[albumId].filter(selectedTrackId => selectedTrackId !== trackId)
            })
        } else if (!trackInSelectedList && selected) {
            if (!(albumId in selectedTracks)) {
                updateSelectedTracks({
                    ...selectedTracks,
                    [albumId]: [trackId]
                })
            } else {
                updateSelectedTracks({
                    ...selectedTracks,
                    [albumId]: [...selectedTracks[albumId], trackId]
                })
            }
        }
    }

    const deleteSelectedTracks = async () => {
        await Promise.all(Object.keys(selectedTracks).map(async albumId => {
            if (selectedTracks[albumId].length > 0) {
                return staccatoClient.deleteTracks(albumId, { trackIds: selectedTracks[albumId] })
            }
        }))
        albums.refetch()
    }

    return (
        <div>
            <h1>Staccato - All Albums ({albums.data!.length})</h1>
            <hr/>
            <button onClick={() => navigate("/albums/create")}>
                ✖️ Create Album
            </button>
            {` `}
            <button onClick={deleteSelectedTracks}>
                ❌ Delete Selected Tracks
            </button>
            {albums.data?.map(album => (
                <div key={album.id}>
                    <h2>
                        {`${album.name} (${album.tracks.length} tracks) `}
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
                                <li key={track.id}>
                                    <input 
                                        onChange={e => handleTrackSelectChange(
                                            e,
                                            album.id,
                                            track.id
                                        )} 
                                        type="checkbox" 
                                    />

                                    <b>{`${track.name} - ${track.artist} `}</b>

                                    <button onClick={async () => {
                                        navigate(`/albums/${album.id}/tracks/${track.id}`)
                                    }}>
                                        📝 Edit Track
                                    </button>
                                    {` `}
                                    <button onClick={async () => {
                                        await staccatoClient.deleteTrack(album.id, track.id)
                                        albums.refetch()
                                    }}>
                                        ❌ Delete Track
                                    </button>
                                    <br/>
                                    <i>{`(${track.genre}) `}</i>
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