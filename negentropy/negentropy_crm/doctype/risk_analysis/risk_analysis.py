# -*- coding: utf-8 -*-
# Copyright (c) 2019, Sunil Govind and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from frappe.model.mapper import get_mapped_doc

class RiskAnalysis(Document):
	pass

# Level of Risk Description of HTML format is sending to Risk Analysis module of child tables
@frappe.whitelist()
def get_risk_details(doctype,risk_element):
	risk_description = ''
	elements = frappe.get_doc("DocType Review", doctype)
	for element in elements.doctype_review_details:
		if element.question == risk_element:
			risk_description = '''<table class="table table-bordered">	
									<tbody>
										<tr>
											<td border: 1px solid black;padding: 15px><strong> (1) Low Risk - {0}</strong></td>
										</tr>
										<tr >
											<td border: 1px solid black;padding: 15px><strong> (2) Medium Risk - {1}</strong></td>
										</tr>
										<tr>
											<td border: 1px solid black;padding: 15px><strong> (3) High Risk - {2}</strong></td>
										</tr>
									</tbody>
					</table>'''.format(element.low_risk,element.medium_risk,element.high_risk)	
	return risk_description

# Document mapping from Risk Analysis module to Risk Mitigation Plan module
@frappe.whitelist()
def make_risk_mitigation_plan(source_name, target_doc=None):
	doclist = get_mapped_doc("Risk Analysis", source_name, {
		"Risk Analysis": {
			"doctype": "Risk Mitigation Plan",
			"field_map": {
				"risk_analysis" : "name"
			}	
		},
		
	}, target_doc)

	return doclist


# Before submitting Risk Analysis it will check Risk Mitigation transcation status based on Risk Analysis condition
@frappe.whitelist()
def get_risk_mitigation_status(risk_analysis):
	elements = []
	elements = frappe.get_all("Risk Mitigation Plan", fields=["docstatus", "name"], filters={"risk_analysis":risk_analysis}, order_by="risk_analysis")
	return elements