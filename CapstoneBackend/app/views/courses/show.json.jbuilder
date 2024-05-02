json.extract! @course, :id, :title, :description, :start_time, :end_time

if @course.course_picture.attached?
  json.course_picture url_for(@course.profile_picture)
else
  json.course_picture nil
end

json.instructor do
  json.first_name @course.instructor.FirstName
  json.last_name @course.instructor.LastName
end
