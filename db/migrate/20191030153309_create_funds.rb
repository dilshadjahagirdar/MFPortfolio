class CreateFunds < ActiveRecord::Migration[5.1]
  def change
    create_table :funds do |t|
      t.column :purchase_date, :date
      t.column :amount, :decimal
      t.column :units, :decimal
      t.column :investment_today, :decimal
      t.column :price_per_unit, :decimal
      t.column :price_per_unit_today, :decimal
      t.column :fund_name, :text
      t.column :fund_code, :text
      t.timestamps
    end
  end
end
