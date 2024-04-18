json.array! @course_enrollments do |enrollment|
  json.extract! enrollment, :id, :enrollment_date, :status
  json.course enrollment.course.title
  json.user enrollment.user.FirstName + " " + enrollment.user.LastName
end
