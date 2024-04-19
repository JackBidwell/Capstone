json.array! @users do |user|
  json.extract! user, :id, :FirstName, :LastName, :email, :role
  json.course_enrollments user.course_enrollments do |enrollment|
    json.extract! enrollment, :id, :status, :enrollment_date
    json.course do
      json.extract! enrollment.course, :id, :title, :description
    end
  end
    json.messages user.messages do |message|
    json.extract! message, :id, :content, :sent_at
  end
end
