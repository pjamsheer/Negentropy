from __future__ import unicode_literals
import frappe

@frappe.whitelist()
def get_employee_list(doctype,txt,searchfield,start,page_len,filters):
	elements = frappe.db.sql(""" SELECT 
			name 
		FROM 
		`tabEmployee` 
		WHERE 
			department IN ( SELECT name FROM `tabDepartment` WHERE department_name = %s ) 
			AND company = %s
			""",[
				filters.get('department_name',None), 
				filters.get('company',None)
			])
	return elements