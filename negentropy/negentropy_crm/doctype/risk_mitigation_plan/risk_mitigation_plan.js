// Copyright (c) 2019, Sunil Govind and contributors
// For license information, please see license.txt
frappe.ui.form.on('Risk Mitigation Plan', {
    onload: function(frm) {
        frm.toggle_enable('risk_mitigation_plan_details', false);
        if (frm.doc.__islocal) {
            // To prevent Employee Doctype Role permission to Sales User, Fetching list of employee details using get query -- Begins
            frm.fields_dict["marketing_member"].get_query = function(doc) {
                return {
                    query: "negentropy.negentropy_crm.utils.get_employee_list",
                    filters: {
                        department_name: "Marketing",
                        company: frm.doc.company
                    }
                }
            }
            frm.fields_dict["purchase_member"].get_query = function(doc) {
                return {
                    query: "negentropy.negentropy_crm.utils.get_employee_list",
                    filters: {
                        department_name: "Purchase",
                        company: frm.doc.company
                    }
                }
            }
            frm.fields_dict["production_member"].get_query = function(doc) {
                return {
                    query: "negentropy.negentropy_crm.utils.get_employee_list",
                    filters: {
                        department_name: "Production",
                        company: frm.doc.company
                    }
                }
            }
            frm.fields_dict["quality_member"].get_query = function(doc) {
                return {
                    query: "negentropy.negentropy_crm.utils.get_employee_list",
                    filters: {
                         department_name: "Quality Management",
                        company: frm.doc.company
                    }
                }
            }
            frm.fields_dict["engineering_member"].get_query = function(doc) {
                return {
                    query: "negentropy.negentropy_crm.utils.get_employee_list",
                    filters: {
                        department_name: "Research & Development",
                        company: frm.doc.company
                    }
                }
            }
            frm.fields_dict["commercial_member"].get_query = function(doc) {
                return {
                    query: "negentropy.negentropy_crm.utils.get_employee_list",
                    filters: {
                        department_name: "Customer Service",
                        company: frm.doc.company
                    }
                }
            }
            frm.fields_dict["technical_member"].get_query = function(doc) {
                return {
                    query: "negentropy.negentropy_crm.utils.get_employee_list",
                    filters: {
                        department_name: "Operations",
                        company: frm.doc.company
                    }
                }
            }
            frm.fields_dict["risk_mitigation_plan_details"].grid.get_field("responsibility").get_query = function(doc) {
                return {
                    query: "negentropy.negentropy_crm.doctype.risk_mitigation_plan.risk_mitigation_plan.fetch_employee_list",
                    filters: {
                        company: frm.doc.company
                    }
                }
            }
            // To prevent Employee Doctype Role permission to Sales User, Fetching list of employee details using get query -- End 
            if (frm.doc.risk_analysis) {
                frappe.call({
                    method: "negentropy.negentropy_crm.doctype.risk_mitigation_plan.risk_mitigation_plan.get_total_risk_value",
                    args: {
                        "risk_analysis": frm.doc.risk_analysis
                    },
                    async: false,
                    callback: function(r) {
                        var risk_analysis_value = 0;
                        risk_analysis_value = r.message.total_risk;
                        if (risk_analysis_value > 1.50) {
                            frappe.call({
                                method: "negentropy.negentropy_crm.doctype.risk_mitigation_plan.risk_mitigation_plan.get_all_risk_elements",
                                args: {
                                    "risk_analysis": frm.doc.risk_analysis
                                },
                                async: false,
                                callback: function(r) {
                                    frm.clear_table("risk_mitigation_plan_details");
                                    $.each(r.message, function(i, d) {
                                        var child = frm.add_child("risk_mitigation_plan_details");
                                        frappe.model.set_value(child.doctype, child.name, "risk_element", d.risk_element);
                                        frappe.model.set_value(child.doctype, child.name, "net_risk_score", d.net_risk_score);
                                        frappe.model.set_value(child.doctype, child.name, "remarks", d.remarks);
                                        frappe.model.set_value(child.doctype, child.name, "can_delete", 1);
                                        frm.refresh_field("risk_element");
                                    }) //end of for loop...                    
                                    refresh_field("risk_mitigation_plan_details");
                                }
                            }); //end of frappe call
                        } else if (risk_analysis_value <= 1.5) {
                            frappe.call({
                                method: "negentropy.negentropy_crm.doctype.risk_mitigation_plan.risk_mitigation_plan.get_main_risk_elements",
                                args: {
                                    "risk_analysis": frm.doc.risk_analysis
                                },
                                async: false,
                                callback: function(r) {
                                    frm.clear_table("risk_mitigation_plan_details");
                                    $.each(r.message, function(i, d) {
                                        var child = frm.add_child("risk_mitigation_plan_details");
                                        frappe.model.set_value(child.doctype, child.name, "risk_element", d.risk_element);
                                        frappe.model.set_value(child.doctype, child.name, "net_risk_score", d.net_risk_score);
                                        frappe.model.set_value(child.doctype, child.name, "remarks", d.remarks);
                                        frappe.model.set_value(child.doctype, child.name, "can_delete", 1);
                                        refresh_field("risk_element");
                                    }) //end of for loop...                    
                                    refresh_field("risk_mitigation_plan_details");
                                }
                            }); //end of frappe call
                        } // end of if risk analysis value

                    }
                }) // end of frappe call get total risk value
            }
        } //end of if(frm.doc.__islocal)
    }, // end of onload
});

// End of Program