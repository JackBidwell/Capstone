# app/views/users/index.json.jbuilder
json.array! @users do |user|
  json.extract! user, :id, :FirstName, :LastName, :email
  json.course_enrollments user.course_enrollments do |enrollment|
    json.extract! enrollment, :id, :status, :enrollment_date
    json.course do
      json.extract! enrollment.course, :id, :title, :description
    end
  end
end
