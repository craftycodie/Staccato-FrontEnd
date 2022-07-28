import CreateAlbumTrackRequest from './CreateAlbumTrackRequest';

export default interface CreateAlbumRequest {
  name: string;
  tracks?: CreateAlbumTrackRequest[];
}
