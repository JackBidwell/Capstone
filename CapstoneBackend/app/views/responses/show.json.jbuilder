# app/views/responses/show.json.jbuilder
json.extract! @response, :id, :content, :user_id, :created_at, :updated_at
json.message do
  json.extract! @response.message, :id, :content, :user_id, :created_at, :updated_at
end
