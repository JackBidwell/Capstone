# app/models/course.rb
class Course < ApplicationRecord
  belongs_to :instructor, class_name: 'User'
  has_many :course_enrollments
end
