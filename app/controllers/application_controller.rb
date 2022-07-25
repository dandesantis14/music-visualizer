class ApplicationController < ActionController::API
  include ActionController::Cookies

rescue_from ActiveRecord::RecordInvalid, with: :invalid_record
  
  before_action :authenticate_user

  private

  def current_user
    @current_user = User.find_by(id: session[:user_id])
  end

  def authenticate_user
    return render json: { error: "Not Authorized" }, status: :unauthorized unless current_user
  end

  def invalid_record(invalid)
    render json: {error: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end
end
