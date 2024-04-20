# app/views/messages/index.json.jbuilder
json.array! @messages do |message|
  json.id message.id
  json.content message.content
  json.sender do
    json.FirstName message.user.FirstName
    json.LastName message.user.LastName
    json.Role message.user.role
  end
  json.responses message.responses do |response|
    json.extract! response, :id, :content, :created_at
    json.sender do
      json.FirstName response.user.FirstName
      json.LastName response.user.LastName
      json.Role response.user.role
    end
  end
end
