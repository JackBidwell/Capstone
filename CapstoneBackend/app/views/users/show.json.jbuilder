# app/views/users/show.json.jbuilder
json.extract! @user, :id, :FirstName, :LastName, :email, :role, :profile_picture_url

json.course_enrollments @user.course_enrollments do |enrollment|
  json.extract! enrollment, :id, :status
  json.course do
    json.extract! enrollment.course, :id, :title, :description, :start_time, :end_time
  end
end
