class ResponsesController < ApplicationController
  before_action :authenticate_user
  before_action :set_response, only: [:show, :destroy]

  def index
    @responses = Response.includes(:message).all
    render :index
  end

  def show
    render json: @response
  end

  def create
    @response = Response.new(response_params)
    if @response.save
      redirect_to @response, notice: 'Response was successfully created.'
    else
      render :new, status: :unprocessable_entity
    end
  end

  def destroy
    @response.destroy
    redirect_to responses_url, notice: 'Response was successfully destroyed.'
  end

  private

  def set_response
    @response = Response.find(params[:id])
  end

  def response_params
    params.require(:response).permit(:content, :message_id, :user_id)
  end
end
