# app/views/users/show.json.jbuilder

json.extract! @user, :id, :FirstName, :LastName, :email, :role

json.profile_picture @user.profile_picture.url

json.course_enrollments @user.course_enrollments do |enrollment|
  json.extract! enrollment, :id, :status
  json.course do |course|
    course = enrollment.course
    json.extract! course, :id, :title, :description, :start_time, :end_time
  end
end

json.messages @user.messages do |message|
  json.extract! message, :id, :content
end
