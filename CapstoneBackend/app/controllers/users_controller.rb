class UsersController < ApplicationController
  before_action :authenticate_admin, only: [:index]

  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
  end

  def create
    @user = User.new(user_params)
    if @user.save
      render json: @user, status: :created, notice: 'User was successfully created.'
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      render json: @user, status: :ok, notice: 'User was successfully updated.'
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @user = User.find(params[:id])
    if @user.destroy
      render json: { notice: 'User was successfully destroyed.' }, status: :ok
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  private

  def user_params
    # Adjusted to include nested structure if your frontend wraps parameters under :user
    params.permit(:FirstName, :LastName, :email, :password, :password_confirmation, :role, :profile_picture)
  end
end
