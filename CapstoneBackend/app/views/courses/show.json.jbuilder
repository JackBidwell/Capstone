json.extract! @course, :id, :title, :description, :start_time, :end_time
json.instructor @course.instructor.FirstName + " " + @course.instructor.LastName
json.enrollments course.enrollments
