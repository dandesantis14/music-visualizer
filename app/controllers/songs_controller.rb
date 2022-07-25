class SongsController < ApplicationController

    # skip_before_action :authenticate_user

    def index
        songs = User.find(params[:id]).songs.map {|song| {"title": song.title, "artist": song.artist, "id": song.id}}
        render json: songs
    end

    def create
        songParams = song_params
        artist = songParams[:artist]
        title = songParams[:title]
        file = songParams[:file].read
        song = @current_user.songs.create(title: title, artist: artist, file: file)
        render json: {artist: artist, title: title, id: song.id}, status: :created
    end

    def destroy
        track = Track.find(params[:id])
        review.destroy
        head :no_content
    end

    def audio_file_test
        song_file = Song.find(23)
        send_data song_file.file, type: 'audio/mp4', disposition: 'inline'
    end

    def serve_audio
        song_file = Song.find(params[:id])
        send_data song_file.file, type: 'audio/mp4', disposition: 'inline'
    end

    
    private

    def song_params
        params.permit(:artist, :title, :file)
    end

end
