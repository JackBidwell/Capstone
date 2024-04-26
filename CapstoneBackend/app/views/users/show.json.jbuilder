# app/views/users/show.json.jbuilder
json.extract! @user, :id, :FirstName, :LastName, :email, :role

if @user.profile_picture.attached?
  json.profile_picture url_for(@user.profile_picture)
else
  json.profile_picture nil
end

json.course_enrollments @user.course_enrollments do |enrollment|
  json.extract! enrollment, :id, :status
  json.course do
    json.extract! enrollment.course, :id, :title, :description, :start_time, :end_time
  end
end
