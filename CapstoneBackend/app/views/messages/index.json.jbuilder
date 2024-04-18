json.array! @messages do |message|
  json.extract! message, :id, :content, :sent_at
  json.sender message.user.FirstName + " " + message.user.LastName
end
