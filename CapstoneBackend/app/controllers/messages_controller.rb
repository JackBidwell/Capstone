class MessagesController < ApplicationController
  before_action :authenticate_user

  def index
    @messages = Message.all
  end

  def show
    @message = Message.find(params[:id])
    render json: @message
  end


  def create
    @message = Message.new(message_params)
    @message.user_id = current_user.id
    if @message.save
      redirect_to @message, notice: 'Message was successfully created.'
    else
      render :show
    end
  end

  def destroy
    @message = Message.find(params[:id])
    @message.destroy
    redirect_to messages_url, notice: 'Message was successfully destroyed.'
  end

  private

  def message_params
    params.permit(:content, :user_id)
  end
end
