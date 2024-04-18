class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :FirstName
      t.string :LastName
      t.string :email
      t.string :password_digest
      t.boolean :admin
      t.boolean :member
      t.boolean :trialuser
      t.boolean :instructor

      t.timestamps
    end
  end
end
