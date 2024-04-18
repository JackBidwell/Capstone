class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :FirstName
      t.string :LastName
      t.string :email
      t.string :password_digest
      t.integer :role, default: 0

      t.timestamps
    end
  end
end
