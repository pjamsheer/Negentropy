# -*- coding: utf-8 -*-
# Copyright (c) 2019, Sunil Govind and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from frappe import utils


class RiskMitigationPlan(Document):
	def validate(self):
		# Target date cannot be past date
		for row in self.risk_mitigation_plan_details:
			if row.target_date < utils.today():
				frappe.throw("Target Date can not be past Date, Row {0}".format(row.idx))

#Fetching total risk value of the Risk analysis
@frappe.whitelist()
def get_total_risk_value(risk_analysis):
	ret_list= []
	ret_list = frappe.get_doc("Risk Analysis", risk_analysis)
	return ret_list

# Fetching List of Risk element,remarks and net risk score from Risk Analysis child tables only when total risk value is greater than 1.50
@frappe.whitelist()
def get_all_risk_elements(risk_analysis):
	ret_list= []
	elements = frappe.get_doc("Risk Analysis",risk_analysis)
	child_tables = [elements.ra_1, elements.ra_2, elements.ra_3, elements.ra_4, elements.ra_5, elements.ra_6, elements.ra_7] 
	for child_table in child_tables:
		for field in child_table:
			ret = {'risk_element': field.risk_element, 'remarks': field.remarks, 'net_risk_score': field.net_risk_score}
			ret_list.append(ret)
	return ret_list

# Fetching List of Risk element,remarks and net risk score from Risk Analysis child tables with checking only which is having net risk score value 9
@frappe.whitelist()
def get_main_risk_elements(risk_analysis):
	ret_list= []
	elements = frappe.get_doc("Risk Analysis",risk_analysis)
	child_tables = [elements.ra_1, elements.ra_2, elements.ra_3, elements.ra_4, elements.ra_5, elements.ra_6, elements.ra_7]
	for child_table in child_tables:
		for field in child_table:
			if field.net_risk_score == 9: 
				ret = {'risk_element': field.risk_element, 'remarks': field.remarks, 'net_risk_score': field.net_risk_score}
				ret_list.append(ret)
	return ret_list

@frappe.whitelist()
def fetch_employee_list(doctype,txt,searchfield,start,page_len,filters):
	elements = frappe.db.sql(""" SELECT 
			name 
		FROM 
		`tabEmployee` 
		WHERE 
			company = %s
			""",filters.get('company',None))
	return elements