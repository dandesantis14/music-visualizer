class UsersController < ApplicationController

    skip_before_action :authenticate_user


    def index
        render json: User.all
    end

    def show
        if current_user
            render json: current_user, status: :ok
        else
            render json: "No current session stored.", status: :unauthorized
        end
    end

    def create
        user = User.create(user_params)
        if user.valid?
            session[:user_id] = user.id
            render json: user, status: :created
        else
            render json: user.errors.full_messages, status: :unprocessable_entity
        end
    end

    def destroy
        user = User.find(params[:id])
        user.destroy
        head :no_content
    end

    private

    def user_params
        params.permit(:email, :password)
    end
end
