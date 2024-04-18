# app/views/courses/index.json.jbuilder
json.array! @courses do |course|
  json.extract! course, :id, :title, :description, :start_time, :end_time
  json.instructor do
    json.first_name course.instructor.FirstName
    json.last_name course.instructor.LastName
  end
end
