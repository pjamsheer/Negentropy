# from __future__ import unicode_literals
import os
# from frappe.model.document import Document
import frappe
from selenium import webdriver


@frappe.whitelist()
def alarm(doc_name):
    # driver = webdriver.Firefox()
    # driver.get("http://www.google.com")
    # driver.refresh()
    if doc_name == "Kitchen Order":
        kitchen_list = frappe.get_list("Kitchen Order", filters={"status": "Order Placed"}, fields=["status"])
        if len(kitchen_list) != 0:
            os.system('spd-say "you received new kitchen order"')
    elif doc_name == "LCR":
        lcr_list = frappe.get_list("Lunch Cancel Request", filters={"status": "Applied"}, fields=["status"])
        if len(lcr_list) != 0:
            os.system('spd-say "you received new Lunch Cancel Request"')

    

@frappe.whitelist()
def change_status():
    kitchen_list = frappe.get_list("Kitchen Order", filters={"status": "Out of Delivery","order_type":"Personal"}, fields=["name"])
    if kitchen_list:
        for kl in kitchen_list:
            doc = frappe.get_doc("Kitchen Order",kl.name)
            doc.update({
                "status":"Not Received"
            })
            frappe.errprint(doc.status)
            doc.save(ignore_permissions=True)

            doc_child = doc.kitchen_order_employee
            for dc in doc_child:
                new_esd = frappe.new_doc("Employee Salary Deduction")
                new_esd.update({
                    "employee_id": dc.employee_id,
                    "employee_name": dc.employee_name,
                    "department": dc.department,
                    "date": doc.date,
                    "amount": doc.total_amount / len(doc_child)
                })
                new_esd.save(ignore_permissions=True)
                new_esd.submit()
                frappe.db.commit()


@frappe.whitelist()
def update_LCR(doc,method):
    if doc.status == "Preparing" and doc.lcr_id:
        lcr = frappe.get_doc("Lunch Cancel Request",doc.lcr_id)
        lcr.update({
            "status": "Archived"
        })
        lcr.save(ignore_permissions=True)
    user = ""
    frappe.errprint(user)
    if not user: 
        user = frappe.session.user
    if "Kitchen Admin" in frappe.get_roles(user):
        frappe.errprint(user)
    alarm("Kitchen Order")
    
    # if doc_name == "Kitchen Order":
    #     kitchen_list = frappe.get_list("Kitchen Order", filters={"status": "Order Placed"}, fields=["status"])
    #     if len(kitchen_list) != 0:
    #         os.system('spd-say "you received new kitchen order"')
    # elif doc_name == "LCR":
    #     lcr_list = frappe.get_list("Lunch Cancel Request", filters={"status": "Applied"}, fields=["status"])
    #     if len(lcr_list) != 0:
    #         os.system('spd-say "you received new Lunch Cancel Request"')





@frappe.whitelist()
def get_permission_query_conditions(user):
    if not user: 
        user = frappe.session.user
    if "System Manager" in frappe.get_roles(user):
        return None
    if "Kitchen Admin" in frappe.get_roles(user):
        return None
    elif "Kitchen User" in frappe.get_roles(user):
        l = (""" `tabKitchen Order`.owner= '%s' """ % (user))
        return l


@frappe.whitelist()
def get_permission_query_conditions1(user):
    if not user: 
        user = frappe.session.user
    if "System Manager" in frappe.get_roles(user):
        return None
    if "Kitchen Admin" in frappe.get_roles(user):
        return None
    elif "Kitchen User" in frappe.get_roles(user):
        l = (""" `tabLunch Cancel Request`.owner= '%s' """ % (user))
        return l
