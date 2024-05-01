Rails.application.routes.draw do
  # Defines the root path route ("/")
  # root "articles#index"

  # User routes
  resources :users
  delete "users/:id", to: "users#destroy"

  resources :responses

  # Course routes
  resources :courses

  # Message routes
  resources :messages
  delete "messages/:id", to: "messages#destroy"

  # Course Enrollments routes
  resources :course_enrollments, only: [:index, :new, :create, :destroy]
  delete "course_enrollments/:id", to: "course_enrollments#destroy"

  resources :sessions

  get "article_of_the_day", to: "articles#show"



end
