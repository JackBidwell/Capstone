# app/models/course.rb
class Course < ApplicationRecord
  belongs_to :instructor, class_name: 'User', foreign_key: 'instructor_id'
  has_many :course_enrollments
  # has_one_attached :course_picture

end
