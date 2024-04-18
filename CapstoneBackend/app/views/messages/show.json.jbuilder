json.array! @users do |user|
  json.extract! user, :id, :FirstName, :LastName, :email, :admin, :member, :trialuser, :instructor
  json.url user_url(user, format: :json)
json.messages user.messages
end
