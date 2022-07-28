import CreateAlbumRequest from './requests/CreateAlbumRequest';
import CreateAlbumTrackRequest from './requests/CreateAlbumTrackRequest';
import DeleteAlbumTracksRequest from './requests/DeleteAlbumTracksRequest';
import UpdateAlbumTrackRequest from './requests/UpdateAlbumTrackRequest';
import AlbumResponse from './responses/AlbumResponse';

export default class StaccatoClient {
  constructor(private readonly apiUrl: string) {}

  getAlbums = async (): Promise<AlbumResponse[]> => {
    return await (
      await fetch(`${this.apiUrl}/api/albums`, {
        method: 'get',
      })
    ).json();
  };

  getAlbum = async (id: string): Promise<AlbumResponse> => {
    return await (
      await fetch(`${this.apiUrl}/api/albums/${id}`, {
        method: 'get',
      })
    ).json();
  };

  deleteAlbum = async (albumId: string): Promise<void> => {
    await fetch(`${this.apiUrl}/api/albums/${albumId}`, {
      method: 'delete',
    });
  };

  createAlbum = async (album: CreateAlbumRequest): Promise<AlbumResponse> => {
    return await (
      await fetch(`${this.apiUrl}/api/albums`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(album),
      })
    ).json();
  };

  createTrack = async (
    albumId: string,
    track: CreateAlbumTrackRequest,
  ): Promise<AlbumResponse> => {
    return await (
      await fetch(`${this.apiUrl}/api/albums/${albumId}/tracks`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(track),
      })
    ).json();
  };

  deleteTrack = async (albumId: string, trackId: string): Promise<void> => {
    await fetch(`${this.apiUrl}/api/albums/${albumId}/tracks/${trackId}`, {
      method: 'delete',
    });
  };

  updateTrack = async (
    albumId: string,
    trackId: string,
    track: UpdateAlbumTrackRequest,
  ): Promise<AlbumResponse> => {
    return await(
      await fetch(`${this.apiUrl}/api/albums/${albumId}/tracks/${trackId}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(track),
      })
    ).json();
  };

  deleteTracks = async (
    albumId: string,
    trackIds: DeleteAlbumTracksRequest,
  ): Promise<void> => {
    await fetch(`${this.apiUrl}/api/albums/${albumId}/tracks/`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(trackIds),
    });
  };
}
