class CreateCourseEnrollments < ActiveRecord::Migration[7.1]
  def change
    create_table :course_enrollments do |t|
      t.references :user, null: false, foreign_key: true
      t.references :course, null: false, foreign_key: true
      t.date :enrollment_date
      t.string :status

      t.timestamps
    end
  end
end
