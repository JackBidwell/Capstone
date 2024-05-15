class AddUrlPictures < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :profile_picture_url, :string
    add_column :courses, :course_picture_url, :string
  end
end
