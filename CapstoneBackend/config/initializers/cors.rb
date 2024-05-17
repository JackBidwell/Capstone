Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'http://localhost:5173', 'https://jackbidwellactualizecapstone.onrender.com'  # Add both origins here

    resource '*',
      headers: :any,
      methods: [:get, :post, :patch, :put, :delete, :options, :head],
      credentials: true  # Set to false if you don't need to pass cookies with the requests
  end
end
