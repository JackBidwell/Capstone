# app/views/courses/show.json.jbuilder
json.extract! @course, :id, :title, :description, :start_time, :end_time
json.instructor do
  json.first_name @course.instructor.FirstName
  json.last_name @course.instructor.LastName
end
