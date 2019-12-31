# -*- coding: utf-8 -*-
# Copyright (c) 2019, Sunil Govind and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from frappe.model.mapper import get_mapped_doc
from frappe import utils


class ManufacturingFeasibility(Document):
	# Fields are mandotory based on Manufacturing stage, Begins.
	def validate(self):
		child_tables = [self.mf_1, self.mf_2, self.mf_3, self.mf_4, self.mf_5, self.mf_6, self.mf_7, self.mf_8, self.mf_9, self.mf_10] 
		# Validation checking for all Child tables
		if self.stage == 'Opportunity Stage' and self.status == 'Stage 1 Completed':
			for child_table in child_tables:
				for field in child_table:
					if field.opportunity_stage_remarks is None:
						frappe.throw("Opportunity Stage Remarks Mandatory fields required in table , Row {0}".format(field.idx))
		if self.stage == 'Order Handling Stage' and self.status == 'Stage 2 Completed':
			for child_table in child_tables:
				for field in child_table:
					if fields.order_handling_stage_remarks is None:
						frappe.throw("Order Handling Stage Remarks Mandatory fields required in table , Row {0}".format(field.idx))
	
	# Fields are mandotory based on Manufacturing stage, End.			
	def before_update_after_submit(self):
		child_tables = [self.mf_1, self.mf_2, self.mf_3, self.mf_4, self.mf_5, self.mf_6, self.mf_7, self.mf_8, self.mf_9, self.mf_10] 
		if self.stage == 'Opportunity Stage' and self.status == 'Stage 1 Completed':
			for child_table in child_tables:
				for field in child_table:
					if field.opportunity_stage_remarks is None:
						frappe.throw("Opportunity Stage Remarks Mandatory fields required in table , Row {0}".format(field.idx))
		if self.stage == 'Order Handling Stage' and self.status == 'Stage 2 Completed':
			for child_table in child_tables:
				for field in child_table:
					if field.order_handling_stage_remarks is None:
						frappe.throw("Order Handling Stage Remarks Mandatory fields required in table , Row {0}".format(field.idx))
	
	# Every Manufacturing feasibility should be have risk analysis transcation,so putting condition on submit, -- Begins.
	def on_submit(self):	
		risk_status = frappe.get_all("Risk Analysis", fields=["name", "docstatus"], 
									filters={"opportunity_number": self.opportunity_number}, order_by="name")
		if risk_status:
			if risk_status[0]['docstatus'] == 0:
				frappe.throw("Risk Analysis " + risk_status[0]['name'] + " should be submitted ")
		else:
			frappe.throw("Complete Risk Analysis before completing Stage 1.")
		# Every Manufacturing feasibility should be have risk analysis transcation, so putting condition on submit, -- End.

# Fetching Opportunity creation date for refernce in Manufaturing Feasibility Module
@frappe.whitelist()
def get_opportunity_detail(opportunity_number):
	detail = frappe.get_doc('Opportunity', opportunity_number)
	opportunity_date = detail.creation
	return opportunity_date

# Document Mapping from Manufacturing module to Risk Analysis module
@frappe.whitelist()
def make_risk_analysis(source_name, target_doc=None):
	doclist = get_mapped_doc("Manufacturing Feasibility", source_name, {
		"Manufacturing Feasibility": {
			"doctype": "Risk Analysis",
			"field_map": {
				"opportunity_number" : "opportunity_number"
			}
		},
		
	}, target_doc)

	return doclist

# Document Mapping from Opportunity module to Manufacturing Feasibility module
@frappe.whitelist()
def make_manufacturing_feasibility(source_name, target_doc=None):
	doclist = get_mapped_doc("Opportunity", source_name, {
		"Opportunity": {
			"doctype": "Manufacturing Feasibility",
			"field_map": {
				"opportunity_number": "name",
			}
		},
		
	}, target_doc)

	return doclist

# Using in Sales Order Module JS, Checking first stage status of Manufacturing feasibility
@frappe.whitelist()
def fetch_manufacturing_feasibility(sales_order_id):
	opportunity_number = frappe.db.sql(""" SELECT 
			name 
		FROM 
			`tabManufacturing Feasibility` 
		WHERE 
			opportunity_number 
		IN ( SELECT 
				opportunity 
		FROM 
			`tabQuotation` 
		WHERE name 	IN ( SELECT 
			prevdoc_docname # prevdoc_docname field is contain quotatation number reference in Sales Order screen
		FROM 
			`tabSales Order Item` 
		WHERE 
			parent =%s )
			)
		""", sales_order_id, as_dict=1)
						
	if opportunity_number:
		return opportunity_number[0]['name']
	else:
		frappe.throw("Manufacturing Feasibility Opportunity Stage is not found")

# Using in Sales Order Module JS, To fetch Opportunity number from Quotation Child table
@frappe.whitelist()
def fetch_opportunity_number(sales_order_id):
	opportunity_number = frappe.db.sql("""SELECT 
			opportunity 
		FROM 
			`tabQuotation` 
		WHERE 
			name 
		IN (SELECT 
			prevdoc_docname 
		FROM 
			`tabSales Order Item` 
		WHERE parent =%s
			)""", 
		sales_order_id, as_dict=1)
	if opportunity_number:
		return opportunity_number[0]['opportunity']

# Using in Sales Order Module, To update Manufacturing stage status from Opportunity stage to Order handling Stage
@frappe.whitelist()
def update_manufacturing_feasibility(name):
	doc = frappe.get_doc('Manufacturing Feasibility', name)
	doc.stage = 'Order Handling Stage'
	doc.order_handling_stage_date = utils.today()
	doc.status = 'Stage 2 Pending'
	doc.save()

# End Of Program