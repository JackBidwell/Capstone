class CourseEnrollment < ApplicationRecord
  belongs_to :user
  belongs_to :study_class
end
