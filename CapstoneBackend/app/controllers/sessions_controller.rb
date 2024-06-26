class SessionsController < ApplicationController
  def create
      user = User.find_by(email: params[:email])
      if user && user.authenticate(params[:password])
        jwt = JWT.encode(
          {
            user_id: user.id, # the data to encode
            exp: 24.hours.from_now.to_i # the expiration time
          },
          Rails.application.credentials.fetch(:secret_key_base), # the secret key
          "HS256" # the encryption algorithm
        )
        render json: { name: user.FirstName, jwt: jwt, email: user.email, user_id: user.id, role: user.role, profile_picture: url_for(user.profile_picture) }, status: :created
      else
        render json: {}, status: :unauthorized
      end
    end
end
