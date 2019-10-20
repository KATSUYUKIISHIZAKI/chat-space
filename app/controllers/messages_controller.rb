class MessagesController < ApplicationController
  before_action :set_group


  def index
    @message = Message.new
    #表示させるため
    @messages = @group.messages.includes(:user)
    #過去の履歴の残すため
  end

  def create
    @message = @group.messages.new(message_params)
    #保存するため
    if @message.save
      respond_to do |format|
        format.html{redirect_to group_messages_path(@group), notice: 'メッセージが送信されました'}
        format.json
      end
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください。'
      render :index
    end
  end

  private

  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end