require 'net/http'
require 'json'
class Fund < ApplicationRecord
	def add_fund(params)
		self.purchase_date = params["purchase_date"].to_date + 1
		self.amount = params["amount"]
		price_per_old_unit, price_per_new_unit = get_old_and_new_value(self)
		self.price_per_unit = price_per_old_unit["value"].to_d.round(2)
		self.units = (self.amount/self.price_per_unit).round(2)
		self.price_per_unit_today = price_per_new_unit["value"].to_d.round(2)
		self.investment_today = (self.units * self.price_per_unit_today).round(2)
		self.save
		return self
	end

	def get_old_and_new_value(_self)
		data = calculate_units(_self)
		return data.first,data.last
	end

	def calculate_units(_self)
		url = 'http://portal.amfiindia.com/DownloadNAVHistoryReport_Po.aspx?mf=53&tp=1&frmdt='+_self.purchase_date.strftime("%d-%^b-%Y")+'&todt='+Time.now.strftime("%d-%^b-%Y")
		uri = URI(url)
		response = Net::HTTP.get(uri)
		data = response.split("\r\n")
		finalData = Array.new

		data.each do |d|
			if d.include? "120502"
				newData = Hash.new
				temp = d.split(";")
				newData["date"] = temp[7]
				newData["value"] = temp[4]
				finalData << newData
			end
		end
		return finalData
	end
end
