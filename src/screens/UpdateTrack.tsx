import { FunctionComponent, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import useAlbum from "../hooks/useAlbum";
import useAlbums from "../hooks/useAlbums";
import StaccatoClient from "../StaccatoClient";

const UpdateTrack: FunctionComponent = () => {
    const staccatoClient = new StaccatoClient(process.env.REACT_APP_API_URL!)
    const navigate = useNavigate();
    const { albumId, trackId } = useParams();
    const album = useAlbum(albumId!);
    const albums = useAlbums();

    const { register, handleSubmit, setValue } = useForm();

    const [ initializedForm, setInitializedForm ] = useState(false);

    if (album.isLoading || albums.isLoading) {
        return <h1>Loading track...</h1>
    }

    const track = album.data?.tracks?.some(track => track.id === trackId)
        ? album.data?.tracks.filter(track => track.id === trackId)[0]
        : undefined;

    if (track !== undefined && !initializedForm) {
        setValue("name", track?.name)
        setValue("artist", track?.artist)
        setValue("genre", track?.genre.join(','))
        setInitializedForm(true);
    }

    if (!track) {
        return <h1>Loading track...</h1>
    }

    return (
        <div>
            <h1>Staccato - Update Track</h1>
            <hr/>
            <form onSubmit={handleSubmit(async (data) => {
                await staccatoClient.updateTrack(albumId!, trackId!, {
                    name: data.name!,
                    artist: data.artist!,
                    genre: data.genre!.split(',')
                })
                navigate("/albums")
            })}>
                Name: <input {...register('name')} name="name" type="text"/>
                <br/>
                Artist: <input {...register('artist')} name="artist" type="text"/>
                <br/>
                Genre: <input {...register('genre')} name="genre" type="text"/>
                <br/>
                <input type="submit" value="💾 Save"/>
                <br/>
                <br/>


            </form>
            <form onSubmit={handleSubmit(async (data) => {
                if (data.albumId === "NEW") {
                    navigate("/albums/create", {
                        state: {
                            track: {
                                name: track.name,
                                artist: track.artist,
                                genre: track.genre
                            }
                        }
                    })
                } else {
                    await staccatoClient.createTrack(data.albumId, {
                        name: track.name,
                        artist: track.artist,
                        genre: track.genre
                    }!)
                    navigate("/albums")
                }
            })}>
                <select {...register('albumId')}>
                    <option value="NEW">New Album</option>
                    {albums.data?.filter(album => album.id !== albumId).map(album => {
                        return (
                            <option value={album.id}>{album.name}</option>
                        )
                    })}
                </select>
                <input type="submit" value="💾 Copy To"/>
            </form>
            
        </div>
    )

}

export default UpdateTrack