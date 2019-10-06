Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'
  resources :users, only: [:edit, :update]
  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]
  end
<<<<<<< HEAD

=======
>>>>>>> parent of b7a2af7... Merge pull request #5 from KATSUYUKIISHIZAKI/Asynchronous-message-sending-function
end