class User < ApplicationRecord
  # enum role: [:admin, :member, :trialuser, :instructor]
  has_secure_password

  has_many :messages
  has_many :taught_classes, class_name: 'Course', foreign_key: 'instructor_id'
  has_and_belongs_to_many :enrolled_classes, class_name: 'Course', join_table: 'class_enrollments'
end
