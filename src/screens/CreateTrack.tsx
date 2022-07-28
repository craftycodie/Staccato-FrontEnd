import { FunctionComponent, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import StaccatoClient from "../StaccatoClient";

const CreateTrack: FunctionComponent = () => {
    const staccatoClient = new StaccatoClient(process.env.REACT_APP_API_URL!)
    const navigate = useNavigate();
    const { albumId } = useParams();

    const { register, handleSubmit } = useForm();

    return (
        <div>
            <h1>Staccato - Create Track</h1>
            <hr/>
            <form onSubmit={handleSubmit(async (data) => {
                await staccatoClient.createTrack(albumId!, { 
                    name: data.name,
                    artist: data.artist,
                    genre: data.genre.split(',')
                })
                navigate("/albums")
            })}>
                Name: <input {...register('name')} name="name" type="text"/>
                <br/>
                Artist: <input {...register('artist')} name="artist" type="text"/>
                <br/>
                Genre: <input {...register('genre')} name="genre" type="text"/>
                <br/>
                <input type="submit" value="💾 Create"/>
            </form>
            
        </div>
    )

}

export default CreateTrack