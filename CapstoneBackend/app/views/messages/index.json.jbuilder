# app/views/messages/index.json.jbuilder
json.array! @messages do |message|
  json.extract! message, :id, :content, :user_id
  json.responses message.responses, :id, :content, :user_id, :created_at
end
