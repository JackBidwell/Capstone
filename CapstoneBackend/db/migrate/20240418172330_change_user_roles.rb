class ChangeUserRoles < ActiveRecord::Migration[7.0]
  def change
    # Remove the existing boolean columns
    remove_column :users, :admin, :boolean
    remove_column :users, :member, :boolean
    remove_column :users, :trialuser, :boolean
    remove_column :users, :instructor, :boolean

    # Add the new integer column for role
    add_column :users, :role, :integer, default: 0
  end
end
