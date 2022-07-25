Rails.application.routes.draw do
  
  get 'sessions/create'
  get '/me', to: 'users#show'
  get '/songs/index/:id', to: 'songs#index'
  post '/signup', to: 'users#create'
  post '/login', to: 'session#create'
  post '/newtrack', to: 'songs#create'
  delete '/logout', to: 'session#destroy'
  
  get '/test', to: 'songs#audio_file_test'
  get '/audio/:id', to: 'songs#serve_audio'

  resources :songs
  resources :users
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
