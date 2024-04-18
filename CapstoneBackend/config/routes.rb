Rails.application.routes.draw do
  # Defines the root path route ("/")
  # root "articles#index"

  # User routes
  resources :users

  # Course routes
  resources :courses

  # Message routes
  resources :messages, except: [:update, :edit]

  # Course Enrollments routes
  resources :course_enrollments, only: [:index, :new, :create, :destroy]

  resources :sessions

end
