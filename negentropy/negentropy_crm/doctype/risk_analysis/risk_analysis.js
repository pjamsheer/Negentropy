// Copyright (c) 2019, Sunil Govind and contributors
// For license information, please see license.txt
frappe.ui.form.on('Risk Analysis', {
    onload: function(frm) {
        var total_weightage = 0;
        // Toggle enable false will eliminate all Add_row, Delete_row, insert_below and insert_above custom button in defined child tables
        frm.toggle_enable('ra_1', false);
        frm.toggle_enable('ra_2', false);
        frm.toggle_enable('ra_3', false);
        frm.toggle_enable('ra_4', false);
        frm.toggle_enable('ra_5', false);
        frm.toggle_enable('ra_6', false);
        frm.toggle_enable('ra_7', false);
        frm.toggle_enable('ra_8', false);

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
            // To prevent Employee Doctype Role permission to Sales User, Fetching list of employee details using get query -- End 
            frappe.call({
                method: "negentropy.negentropy_core.utils.get_question_list",
                args: {
                    "doctype": frm.doc.doctype
                },
                async: false,
                callback: function(r) {
                    frm.clear_table("ra_1");
                    frm.clear_table("ra_2");
                    frm.clear_table("ra_3");
                    frm.clear_table("ra_4");
                    frm.clear_table("ra_5");
                    frm.clear_table("ra_6");
                    frm.clear_table("ra_7");
                    frm.refresh_field();
                    $.each(r.message, function(i, d) {
                        /* Adding question filter and storing into respective child table
                        based on question number and child table vairable name  */
                        if (d.question_no == 'RA_1') {
                            var child = frm.add_child("ra_1");
                            total_weightage = parseInt(total_weightage) + parseInt(d.weightage);
                            frappe.model.set_value(child.doctype, child.name, "risk_element", d.question);
                            // can_delete field which indicates are predinfined Questions and user cannot be able to delete the same.
                            frappe.model.set_value(child.doctype, child.name, "can_delete", 1);
                            frappe.model.set_value(child.doctype, child.name, "weightage", d.weightage);
                            var risk_description = fetch_risk_description(frm.doc.doctype, d.question)
                            frappe.model.set_value(child.doctype, child.name, "risk_description", risk_description);
                            frm.refresh_field("risk_element");
                        } else if (d.question_no == 'RA_2') {
                            var child = frm.add_child("ra_2");
                            total_weightage = parseInt(total_weightage) + parseInt(d.weightage);
                            frappe.model.set_value(child.doctype, child.name, "risk_element", d.question);
                            frappe.model.set_value(child.doctype, child.name, "can_delete", 1);
                            frappe.model.set_value(child.doctype, child.name, "weightage", d.weightage);
                            var risk_description = fetch_risk_description(frm.doc.doctype, d.question)
                            frappe.model.set_value(child.doctype, child.name, "risk_description", risk_description);
                            frm.refresh_field("risk_element");
                        } else if (d.question_no == 'RA_3') {
                            var child = frm.add_child("ra_3");
                            total_weightage = parseInt(total_weightage) + parseInt(d.weightage);
                            frappe.model.set_value(child.doctype, child.name, "risk_element", d.question);
                            frappe.model.set_value(child.doctype, child.name, "can_delete", 1);
                            frappe.model.set_value(child.doctype, child.name, "weightage", d.weightage);
                            var risk_description = fetch_risk_description(frm.doc.doctype, d.question)
                            frappe.model.set_value(child.doctype, child.name, "risk_description", risk_description);
                            frm.refresh_field("risk_element");
                        } else if (d.question_no == 'RA_4') {
                            var child = frm.add_child("ra_4");
                            total_weightage = parseInt(total_weightage) + parseInt(d.weightage);
                            frappe.model.set_value(child.doctype, child.name, "risk_element", d.question);
                            frappe.model.set_value(child.doctype, child.name, "can_delete", 1);
                            frappe.model.set_value(child.doctype, child.name, "weightage", d.weightage);
                            var risk_description = fetch_risk_description(frm.doc.doctype, d.question)
                            frappe.model.set_value(child.doctype, child.name, "risk_description", risk_description);
                            frm.refresh_field("risk_element");
                        } else if (d.question_no == 'RA_5') {
                            var child = frm.add_child("ra_5");
                            total_weightage = parseInt(total_weightage) + parseInt(d.weightage);
                            frappe.model.set_value(child.doctype, child.name, "risk_element", d.question);
                            frappe.model.set_value(child.doctype, child.name, "can_delete", 1);
                            frappe.model.set_value(child.doctype, child.name, "weightage", d.weightage);
                            var risk_description = fetch_risk_description(frm.doc.doctype, d.question)
                            frappe.model.set_value(child.doctype, child.name, "risk_description", risk_description);
                            frm.refresh_field("risk_element");
                        } else if (d.question_no == 'RA_6') {
                            var child = frm.add_child("ra_6");
                            total_weightage = parseInt(total_weightage) + parseInt(d.weightage);
                            frappe.model.set_value(child.doctype, child.name, "risk_element", d.question);
                            frappe.model.set_value(child.doctype, child.name, "can_delete", 1);
                            frappe.model.set_value(child.doctype, child.name, "weightage", d.weightage);
                            var risk_description = fetch_risk_description(frm.doc.doctype, d.question)
                            frappe.model.set_value(child.doctype, child.name, "risk_description", risk_description);
                            frm.refresh_field("risk_element");
                        } else if (d.question_no == 'RA_7') {
                            var child = frm.add_child("ra_7");
                            total_weightage = parseInt(total_weightage) + parseInt(d.weightage);
                            frappe.model.set_value(child.doctype, child.name, "risk_element", d.question);
                            frappe.model.set_value(child.doctype, child.name, "can_delete", 1);
                            frappe.model.set_value(child.doctype, child.name, "weightage", d.weightage);
                            var risk_description = fetch_risk_description(frm.doc.doctype, d.question);
                            frappe.model.set_value(child.doctype, child.name, "risk_description", risk_description);
                            frm.refresh_field("risk_element");
                        }
                    }) // end of $.each loop
                    // Fetching List of Question from DocType Review and storing into child tables End
                    frm.doc.total_weightage = total_weightage; // calculating Total weightage in above iteration 
                } // End of callback 
            }); // End of frappe call
        } // End of if condition doc.__islocal
    }, // End of Onload 

    // Fetching Opportunity creation date based on Opportunity number -- Begin
    opportunity_number: function(frm) {
        frappe.call({
            method: "frappe.client.get_value",
            args: {
                doctype: "Opportunity",
                filters: {
                    name: frm.doc.opportunity_number
                },
                fieldname: ["creation"]
            },
            callback: function(r) {
                var creation_date = new Date(r.message.creation);
                var creation_month = parseInt(creation_date.getMonth() + 1);
                //Converting from Creation "DateTime" format to Creation "Date" format
                var opportunity_date = creation_date.getDate() + "-" + creation_month + "-" + creation_date.getFullYear();
                frm.doc.opportunity_date = opportunity_date;
                refresh_field("opportunity_date");
            } // end of call back
        }) // end of frappe call
    }, // Fetching Opportunity creation date based on Opportunity number -- End

    refresh: function(frm) {
        // Toggle enable false will eliminate all Add_row, Delete_row, insert_below and insert_above custom button in defined child tables
        frm.toggle_enable('ra_1', false);
        frm.toggle_enable('ra_2', false);
        frm.toggle_enable('ra_3', false);
        frm.toggle_enable('ra_4', false);
        frm.toggle_enable('ra_5', false);
        frm.toggle_enable('ra_6', false);
        frm.toggle_enable('ra_7', false);
        frm.toggle_enable('ra_8', false);
    }, // end of refresh function

    before_submit: function(frm) {
        var risk_analysis_id = frm.doc.name;
        var risk_mitigation_plan = fetch_risk_mitigation_status(risk_analysis_id);
        /*Check Risk Mitigation transaction status and if does not exist, Risk Mitigation Plan will be create as based on below 
          below condition */
        if (risk_mitigation_plan == undefined) {
            if (frm.doc.total_risk > 1.50) {
                //if Total Risk is greater than 1.50 then Risk Mitigation to be done for all risk elements
                frm.add_custom_button(__('Risk Mitigation Plan'), function() {
                    create_risk_mitigation_plan(frm);
                }, );
                frappe.msgprint("This Document is having High Risk Value, Risk Mitigation Plan needs to be done.");
                frappe.validated = false;
            } else if (frm.doc.total_risk <= 1.50) {
                //if Total Risk is lesser than 1.50 then Risk Mitigation to be done for few risk elements which is having 9 value
                frappe.call({
                    method: "negentropy.negentropy_crm.doctype.risk_mitigation_plan.risk_mitigation_plan.get_main_risk_elements",
                    args: {
                        "risk_analysis": frm.doc.name
                    },
                    async: false,
                    callback: function(r) {
                        if (r.message.length > 0) {
                            frm.add_custom_button(__('Risk Mitigation Plan'), function() {
                                create_risk_mitigation_plan(frm);
                            }, );
                            frappe.msgprint("One of the question element is having a high risk value, Risk Mitigation Plan needs to be done.");
                            frappe.validated = false;
                        } // end of callback
                    }
                }); //end of frappe call
            }
        } // end of if (risk_mitigation_plan == undefined)
    }, // end of Before_submit function
}); //end of Parent function


// Document mapping from Risk Analysis to Risk Mitigation Plan
function create_risk_mitigation_plan(frm) {
    frappe.model.open_mapped_doc({
        method: "negentropy.negentropy_crm.doctype.risk_analysis.risk_analysis.make_risk_mitigation_plan",
        frm: frm
    })
}

// checking risk mitigation plan status 
function fetch_risk_mitigation_status(risk_analysis_id) {
    var status = {};
    frappe.call({
        method: "frappe.client.get_value",
        args: {
            doctype: "Risk Mitigation Plan",
            filters: {
                risk_analysis: risk_analysis_id,
                docstatus: ["!=", 2]
            },
            fieldname: ["name"]
        },
        async: false,
        callback: function(r) {
            if (r.message) {
                status = {
                    "name": r.message.name
                };
            } else {
                status = undefined;
            }
        }
    });
    return status;

}

//Fetching Risk Description 
function fetch_risk_description(doctype, risk_element) {
    var data = {};
    frappe.call({
        method: "negentropy.negentropy_crm.doctype.risk_analysis.risk_analysis.get_risk_details",
        args: {
            "doctype": doctype,
            "risk_element": risk_element
        },
        async: false,
        callback: function(r) {
            data = r.message;
        }
    }) //end of frappe call
    return data;
}

// Child table Section Starts
frappe.ui.form.on('Risk Analysis Detail', {
    // adding validation : Pre-defined questions cannot be deleted by User 
    before_ra_1_remove: function(frm, cdt, cdn) {
        var row = locals[cdt][cdn];
        var deleted_row = frappe.get_doc(cdt, cdn);

        if (deleted_row.can_delete == 1) {
            frappe.throw("Cannot Delete Pre-defined Question");
        }

    },

    before_ra_2_remove: function(frm, cdt, cdn) {
        var row = locals[cdt][cdn];
        var deleted_row = frappe.get_doc(cdt, cdn);

        if (deleted_row.can_delete == 1) {
            frappe.throw("Cannot Delete Pre-defined Question");
        }

    },

    before_ra_3_remove: function(frm, cdt, cdn) {
        var row = locals[cdt][cdn];
        var deleted_row = frappe.get_doc(cdt, cdn);

        if (deleted_row.can_delete == 1) {
            frappe.throw("Cannot Delete Pre-defined Question");
        }

    },

    before_ra_4_remove: function(frm, cdt, cdn) {
        var row = locals[cdt][cdn];
        var deleted_row = frappe.get_doc(cdt, cdn);

        if (deleted_row.can_delete == 1) {
            frappe.throw("Cannot Delete Pre-defined Question");
        }

    },

    before_ra_5_remove: function(frm, cdt, cdn) {
        var row = locals[cdt][cdn];
        var deleted_row = frappe.get_doc(cdt, cdn);

        if (deleted_row.can_delete == 1) {
            frappe.throw("Cannot Delete Pre-defined Question");
        }

    },

    before_ra_6_remove: function(frm, cdt, cdn) {
        var row = locals[cdt][cdn];
        var deleted_row = frappe.get_doc(cdt, cdn);

        if (deleted_row.can_delete == 1) {
            frappe.throw("Cannot Delete Pre-defined Question");
        }

    },

    before_ra_7_remove: function(frm, cdt, cdn) {
        var row = locals[cdt][cdn];
        var deleted_row = frappe.get_doc(cdt, cdn);

        if (deleted_row.can_delete == 1) {
            frappe.throw("Cannot Delete Pre-defined Question");
        }

    },

    // Anticipated value range should be [1,2,3]
    anticipated_risk_value: function(frm, cdt, cdn) {
        var row = locals[cdt][cdn];
        var risk_element = row.risk_element;
        var risk_weightage = row.weightage;
        var risk_anticipated = row.anticipated_risk_value;
        var total_net_risk_score = 0;
        var total_risk = 0;

        var temp_list = [1, 2, 3];
        if (!temp_list.includes(risk_anticipated)) {
            frm.set_value(risk_anticipated, 3);
            refresh_field("risk_anticipated");
            frappe.msgprint("Risk Anticipated values range should be 1 to 3 !!");
            frappe.validated = false;
        }

        row.net_risk_score = parseInt(row.weightage) * parseInt(risk_anticipated);
        // Calculating Total Risk 
        $.each(frm.doc.ra_1, function(i, d) {
            total_net_risk_score = parseInt(total_net_risk_score) + parseInt(d.net_risk_score);
        }); //end of each...
        $.each(frm.doc.ra_2, function(i, d) {
            total_net_risk_score = parseInt(total_net_risk_score) + parseInt(d.net_risk_score);
        }); //end of each...
        $.each(frm.doc.ra_3, function(i, d) {
            total_net_risk_score = parseInt(total_net_risk_score) + parseInt(d.net_risk_score);
        }); //end of each...
        $.each(frm.doc.ra_4, function(i, d) {
            total_net_risk_score = parseInt(total_net_risk_score) + parseInt(d.net_risk_score);
        }); //end of each...
        $.each(frm.doc.ra_5, function(i, d) {
            total_net_risk_score = parseInt(total_net_risk_score) + parseInt(d.net_risk_score);
        }); //end of each...
        $.each(frm.doc.ra_6, function(i, d) {
            total_net_risk_score = parseInt(total_net_risk_score) + parseInt(d.net_risk_score);
        }); //end of each...
        $.each(frm.doc.ra_7, function(i, d) {
            total_net_risk_score = parseInt(total_net_risk_score) + parseInt(d.net_risk_score);
        }); //end of each...
        frm.doc.total_net_risk_score = total_net_risk_score;
        total_risk = parseInt(total_net_risk_score) / parseInt(frm.doc.total_weightage);
        frm.doc.total_risk = total_risk;
        refresh_field("ra_1");
        refresh_field("ra_2");
        refresh_field("ra_3");
        refresh_field("ra_4");
        refresh_field("ra_5");
        refresh_field("ra_6");
        refresh_field("ra_7");
        refresh_field("total_net_risk_score");
        refresh_field("total_risk");
    } //end of anticipated_risk_value
});
// Child table Section End

//End of Program