class Remove < ActiveRecord::Migration[7.1]
  def change
    remove_column :course_enrollments, :enrollment_date, :date
  end
end
