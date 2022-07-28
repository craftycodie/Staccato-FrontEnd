import { FunctionComponent } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
  } from "react-router-dom";
import CreateTrack from "./screens/CreateTrack";
import UpdateTrack from "./screens/UpdateTrack";
import CreateAlbum from "./screens/CreateAlbum";
import Albums from "./screens/Albums";

const AppRoutes: FunctionComponent = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/albums/:albumId/tracks/:trackId" element={<UpdateTrack/>}/>
                <Route path="/albums/:albumId/tracks/create" element={<CreateTrack/>}/>
                <Route path="/albums/create" element={<CreateAlbum/>}/>
                <Route path="/albums" element={<Albums/>}/>

                <Route path="*" element={<Navigate to="/albums"/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes