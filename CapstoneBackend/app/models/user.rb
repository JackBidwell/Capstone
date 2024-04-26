class User < ApplicationRecord
  enum role: { admin: 0, member: 1, trialuser: 2, instructor: 3 }
  has_secure_password


  has_one_attached :profile_picture
  has_many :messages
  has_many :taught_classes, class_name: 'Course', foreign_key: 'instructor_id'
  has_and_belongs_to_many :enrolled_classes, class_name: 'Course', join_table: 'course_enrollments'
  has_many :course_enrollments
end
