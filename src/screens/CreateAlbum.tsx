import { FunctionComponent, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import CreateAlbumTrackRequest from "../requests/CreateAlbumTrackRequest";
import StaccatoClient from "../StaccatoClient";

interface LocationState {
    track?: CreateAlbumTrackRequest
}
  

const CreateAlbum: FunctionComponent = () => {
    const staccatoClient = new StaccatoClient(process.env.REACT_APP_API_URL!)
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm();

    // Naf typing, react-router v6 removed the generic and encourages any apparently...
    // https://github.com/remix-run/react-router/pull/7326#issuecomment-626418225
    const { state }: { state: LocationState } 
        = useLocation() as any; // r-r v6 removed the generic arg...

    const { track } = state; // Read values passed on state

    const tracks: CreateAlbumTrackRequest[] = track ? [ track ] : []

    return (
        <div>
            <h1>Staccato - Create Album</h1>
            <hr/>
            <form onSubmit={handleSubmit(async (data) => {
                await staccatoClient.createAlbum({ name: data.name, tracks }, )
                navigate("/albums")
            })}>
                Name: <input {...register('name')} name="name" type="text"/>
                <br/>
                {track && (
                    <p>With track: {`${track.name} - ${track.artist} (${track.genre})`}</p>
                )}
                <input type="submit" value="💾 Create"/>
            </form>
            
        </div>
    )

}

export default CreateAlbum