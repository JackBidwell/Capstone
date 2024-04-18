json.extract! @user, :id, :FirstName, :LastName, :email, :admin, :member, :trialuser, :instructor
json.url user_url(@user, format: :json)

