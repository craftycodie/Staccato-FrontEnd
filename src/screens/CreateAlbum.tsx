import { FunctionComponent, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import StaccatoClient from "../StaccatoClient";

const CreateAlbum: FunctionComponent = () => {
    const staccatoClient = new StaccatoClient(process.env.REACT_APP_API_URL!)
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm();

    return (
        <div>
            <h1>Staccato - Create Album</h1>
            <hr/>
            <form onSubmit={handleSubmit(async (data) => {
                await staccatoClient.createAlbum({ name: data.name })
                navigate("/albums")
            })}>
                Name: <input {...register('name')} name="name" type="text"/>
                <br/>
                <input type="submit" value="💾 Create"/>
            </form>
            
        </div>
    )

}

export default CreateAlbum