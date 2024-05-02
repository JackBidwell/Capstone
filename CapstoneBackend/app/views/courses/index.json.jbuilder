# app/views/courses/index.json.jbuilder
json.array! @courses do |course|
  json.extract! course, :id, :title, :description, :start_time, :end_time
  json.instructor do
    json.first_name course.instructor.FirstName
    json.last_name course.instructor.LastName
  end
  if @course.course_picture.attached?
  course.profile_picture url_for(@course.profile_picture)
else
  course.profile_picture nil
end
end
