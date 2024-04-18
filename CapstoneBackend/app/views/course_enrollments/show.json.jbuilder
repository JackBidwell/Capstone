json.array! @courses do |course|
  json.extract! course, :id, :title, :description, :start_time, :end_time
  json.instructor course.instructor.FirstName + " " + course.instructor.LastName
  json.course_enrollments course.course_enrollments
end

