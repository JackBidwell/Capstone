class RemoveSentAt < ActiveRecord::Migration[7.1]
  def change
    remove_column :messages, :sent_at, :datetime
  end
end
