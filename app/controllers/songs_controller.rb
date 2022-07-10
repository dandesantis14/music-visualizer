class SongsController < ApplicationController

    def index
        render json: Song.findby(user_id:params[:id])
    end

    def create
        song = @current_user.songs.create(song_params)
    end


    private

    def song_params
        params.permit(:artist, :title, :track)
    end

    def render
end
