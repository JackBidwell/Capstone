class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception, unless: -> { request.format.json? }

  # Retrieve the current user from the token in the Authorization header
  def current_user
    auth_headers = request.headers["Authorization"]
    if auth_headers.present? && auth_headers[/(?<=\A(Bearer ))\S+\z/]
      token = auth_headers[/(?<=\A(Bearer ))\S+\z/]
      begin
        decoded_token = JWT.decode(
          token,
          Rails.application.credentials.fetch(:secret_key_base),
          true,
          { algorithm: "HS256" }
        )
        User.find_by(id: decoded_token[0]["user_id"])
      rescue JWT::ExpiredSignature
        nil
      end
    end
  end

  # Ensure a user is logged in
  def authenticate_user
    unless current_user
      render json: { message: "Error: NOT LOGGED IN" }, status: :unauthorized
    end
  end

  # Ensure a user is an admin
  def authenticate_admin
    unless current_user && current_user.admin?
      render json: { message: "You are not authorized to do this" }, status: :unauthorized
    end
  end

  # Check if the current user is an admin
  def check_admin
    authenticate_admin
  end

  # Check if the current user is either an admin or an instructor
  def check_admin_or_instructor
    unless current_user && (current_user.admin? || current_user.instructor?)
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end
end
