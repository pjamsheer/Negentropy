// Copyright (c) 2019, Sunil Govind and contributors
// For license information, please see license.txt
frappe.ui.form.on('Manufacturing Feasibility', {
    onload: function(frm) {
        set_field_properties(frm) // Function calling & Setting up field properties based on stage status
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

            // Fetching List of Question from DocType Review and setting into child tables ---Begins
            frappe.call({
                method: "negentropy.negentropy_core.utils.get_question_list",
                args: {
                    "doctype": frm.doc.doctype
                },
                async: false,
                callback: function(r) {
                    $.each(r.message, function(i, d) {
                        /* Adding question filter and storing into respective child table
                           based on question number and child table vairable name  */
                        if (d.question_no == 'MF_1') {
                            var child = frm.add_child("mf_1");
                            frappe.model.set_value(child.doctype, child.name, "element", d.question);
                            // can_delete field which indicates are predinfined Questions and user cannot be able to delete the same.
                            frappe.model.set_value(child.doctype, child.name, "can_delete", 1);
                            frm.refresh_field("element");
                        } else if (d.question_no == 'MF_2') {
                            var child = frm.add_child("mf_2");
                            frappe.model.set_value(child.doctype, child.name, "element", d.question);
                            frappe.model.set_value(child.doctype, child.name, "can_delete", 1);
                            frm.refresh_field("element");
                        } else if (d.question_no == 'MF_3') {
                            var child = frm.add_child("mf_3");
                            frappe.model.set_value(child.doctype, child.name, "element", d.question);
                            frappe.model.set_value(child.doctype, child.name, "can_delete", 1);
                            frm.refresh_field("element");
                        } else if (d.question_no == 'MF_4') {
                            var child = frm.add_child("mf_4");
                            frappe.model.set_value(child.doctype, child.name, "element", d.question);
                            frappe.model.set_value(child.doctype, child.name, "can_delete", 1);
                            frm.refresh_field("element");
                        } else if (d.question_no == 'MF_5') {
                            var child = frm.add_child("mf_5");
                            frappe.model.set_value(child.doctype, child.name, "element", d.question);
                            frappe.model.set_value(child.doctype, child.name, "can_delete", 1);
                            frm.refresh_field("element");
                        } else if (d.question_no == 'MF_6') {
                            var child = frm.add_child("mf_6");
                            frappe.model.set_value(child.doctype, child.name, "element", d.question);
                            frappe.model.set_value(child.doctype, child.name, "can_delete", 1);
                            frm.refresh_field("element");
                        } else if (d.question_no == 'MF_7') {
                            var child = frm.add_child("mf_7");
                            frappe.model.set_value(child.doctype, child.name, "element", d.question);
                            frappe.model.set_value(child.doctype, child.name, "can_delete", 1);
                            frm.refresh_field("element");
                        } else if (d.question_no == 'MF_8') {
                            var child = frm.add_child("mf_8");
                            frappe.model.set_value(child.doctype, child.name, "element", d.question);
                            frappe.model.set_value(child.doctype, child.name, "can_delete", 1);
                            frm.refresh_field("element");
                        } else if (d.question_no == 'MF_9') {
                            ;
                            var child = frm.add_child("mf_9");
                            frappe.model.set_value(child.doctype, child.name, "element", d.question);
                            frappe.model.set_value(child.doctype, child.name, "can_delete", 1);
                            frm.refresh_field("element");
                        } else if (d.question_no == 'MF_10') {
                            var child = frm.add_child("mf_10");
                            frappe.model.set_value(child.doctype, child.name, "element", d.question);
                            frappe.model.set_value(child.doctype, child.name, "can_delete", 1);
                            frm.refresh_field("element");
                        } // end of else if condition
                    }) // end of $.each loop
                } // end of call back 
            }); // end of frappe call
            // Fetching List of Question from DocType Review and setting into child tables ---End


            // Fetching Opportunity Creation Date of Opportunity number 
            if (frm.doc.opportunity_number) {
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
                        // Converting Opportunity Creation from unformatted DateTime to Date format 
                        var opportunity_date = creation_date.getDate() + "-" + creation_month + "-" + creation_date.getFullYear();
                        frm.doc.opportunity_date = opportunity_date;
                        refresh_field("opportunity_date");

                        // Updating Opportunity stage date while mapping from Opportunity module to Manufacturing feasibility --Begins
                        var opportunity = frm.doc.opportunity_number;
                        if (opportunity.includes("OPP")) {
                            var current_date = new Date();
                            var current_month = parseInt(current_date.getMonth() + 1);
                            var opportunity_stage_date = current_date.getDate() + "-" + current_month + "-" + current_date.getFullYear();

                            frm.doc.stage = "Opportunity Stage";
                            frm.doc.opportunity_stage_date = opportunity_stage_date;

                            refresh_field("stage");
                            refresh_field("opportunity_stage_date");
                        } // end of if condition
                        // Updating Opportunity stage date while mapping from Opportunity module to Manufacturing feasibility --End
                    } // end of callback 
                }); //end of frappe call
            } // end of if(frm.doc.opportunity_number) 
        } // end of if condition doc.__islocal
    }, //end of function..
    refresh: function(frm) {
        set_field_properties(frm) //  Function calling & Setting up field properties based on stage status
        set_mfg_fields_toggle_reqd(frm) // Function calling & Setting up mandatory fields based on stage status

        // Adding Custom button based on doc status
        if (frm.doc.status === "Stage 1 Pending") {
            frm.add_custom_button(__('Risk Analysis'), function() {
                create_risk_analysis(frm);
            }, __('Create'));
        }
    }, // end of refresh function

    before_save: function(frm) {
        set_mfg_fields_toggle_reqd(frm) // Setting up mandatory fields based on stage status
    },

    // Based on Opportunity number field changes ,here we are fetching Opportunity creation date
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
                // Converting Opportunity Creation from unformatted DateTime to Date format 
                var opportunity_date = creation_date.getDate() + "-" + creation_month + "-" + creation_date.getFullYear();
                frm.doc.opportunity_date = opportunity_date;
                refresh_field("opportunity_date");

                // Updating Opportunity stage date while mapping from Opportunity module to Manufacturing feasibility --Begins
                var opportunity = frm.doc.opportunity_number;
                if (opportunity.includes("OPP")) {
                    var current_date = new Date();
                    var current_month = parseInt(current_date.getMonth() + 1);
                    var opportunity_stage_date = current_date.getDate() + "-" + current_month + "-" + current_date.getFullYear();

                    frm.doc.stage = "Opportunity Stage";
                    frm.doc.opportunity_stage_date = opportunity_stage_date;

                    refresh_field("stage");
                    refresh_field("opportunity_stage_date");
                } // end of if
            } // end of callback
        }) // end of frappe call
    }, // end of function

    

}); // end of Parent frappe.ui.form.on


// Document mapping from Manufaturing Feasibility to Risk Analysis in custom button (Create --> Risk Analysis)
function create_risk_analysis(frm) {
    var opportunity_id = frm.doc.opportunity_number;
    var risk_analysis = fetch_risk_analysis_status(opportunity_id);
    if (risk_analysis == undefined) {
        frappe.model.open_mapped_doc({
            method: "negentropy.negentropy_crm.doctype.manufacturing_feasibility.manufacturing_feasibility.make_risk_analysis",
            frm: frm
        })
    } else if (risk_analysis.status == 0) {
        frappe.msgprint(risk_analysis.name + " Risk Analysis is made for this Manufacturing Feasibility and it is needs to Submit");
        frappe.set_route("Form", "Risk Analysis", risk_analysis.name);
        return false;
    } else if (risk_analysis.status == 1) {
        frappe.msgprint(risk_analysis.name + " Risk Analysis is made for this Manufacturing Feasibility");
        frappe.set_route("Form", "Risk Analysis", risk_analysis.name);
        return false;
    }
};

// fetching risk analysis transaction status using in-build frappe API
function fetch_risk_analysis_status(opportunity_id) {
    var status = {};
    frappe.call({
        method: "frappe.client.get_value",
        args: {
            doctype: "Risk Analysis",
            filters: {
                opportunity_number: ["=", opportunity_id],
                docstatus: ["!=", 2]

            },
            fieldname: ["name", "docstatus"]
        },
        async: false,
        callback: function(r) {
            if (r.message) {
                status = {
                    "status": r.message.docstatus,
                    "name": r.message.name
                };
            } else {
                status = undefined;
            }

        }
    });
    return status;
};

// Setting up Child table column property based on Stage status
function set_field_properties(frm) {
    // Hide/Disable Custom buttons of Child tables(add_row,delete_row,insert_below and insert_above)..
    frm.toggle_enable('mf_1', false);
    frm.toggle_enable('mf_2', false);
    frm.toggle_enable('mf_3', false);
    frm.toggle_enable('mf_4', false);
    frm.toggle_enable('mf_5', false);
    frm.toggle_enable('mf_6', false);
    frm.toggle_enable('mf_7', false);
    frm.toggle_enable('mf_8', false);
    frm.toggle_enable('mf_9', false);
    frm.toggle_enable('mf_10', false);
    refresh_field("status");
    refresh_field("stage");
    refresh_field("order_handling_stage_date");
    if (frm.doc.stage == "Opportunity Stage" && frm.doc.status !== "Stage 1 Completed") {
        var col_1 = frappe.meta.get_docfield("Manufacturing Feasibility Detail", "opportunity_stage", frm.doc.name);
        var col_2 = frappe.meta.get_docfield("Manufacturing Feasibility Detail", "opportunity_stage_remarks", frm.doc.name);
        var col_3 = frappe.meta.get_docfield("Manufacturing Feasibility Detail", "order_handling_stage", frm.doc.name);
        var col_4 = frappe.meta.get_docfield("Manufacturing Feasibility Detail", "order_handling_stage_remarks", frm.doc.name);
        col_1.read_only = 0;
        col_2.read_only = 0;
        col_1.required = 1;
        col_2.required = 1;
        col_3.read_only = 1;
        col_4.read_only = 1;
        col_1.in_list_view = 1;
        col_1.in_grid_view = 1;
        refresh_field("opportunity_stage");
        refresh_field("opportunity_stage_remarks");
        refresh_field("order_handling_stage");
        refresh_field("order_handling_stage_remarks");
        refresh_field("mf_1");
        refresh_field("mf_2");
        refresh_field("mf_3");
        refresh_field("mf_4");
        refresh_field("mf_5");
        refresh_field("mf_6");
        refresh_field("mf_7");
        refresh_field("mf_8");
        refresh_field("mf_9");
        refresh_field("mf_10");
    } else if (frm.doc.stage == "Order Handling Stage" && frm.doc.status !== "Stage 2 Completed") {
        var col_1 = frappe.meta.get_docfield("Manufacturing Feasibility Detail", "opportunity_stage", frm.doc.name);
        var col_2 = frappe.meta.get_docfield("Manufacturing Feasibility Detail", "opportunity_stage_remarks", frm.doc.name);
        var col_3 = frappe.meta.get_docfield("Manufacturing Feasibility Detail", "order_handling_stage", frm.doc.name);
        var col_4 = frappe.meta.get_docfield("Manufacturing Feasibility Detail", "order_handling_stage_remarks", frm.doc.name);
        col_1.read_only = 1;
        col_2.read_only = 1;
        col_3.read_only = 0;
        col_4.read_only = 0;
        col_3.required = 1;
        col_4.required = 1;
        col_1.in_list_view = 1;
        col_2.in_list_view = 1;
        col_3.in_list_view = 1;
        col_4.in_list_view = 1;
        col_1.in_grid_view = 1;
        col_2.in_grid_view = 1;
        col_3.in_grid_view = 1;
        col_4.in_grid_view = 1;
        refresh_field("opportunity_stage");
        refresh_field("opportunity_stage_remarks");
        refresh_field("order_handling_stage");
        refresh_field("order_handling_stage_remarks");
        refresh_field("mf_1");
        refresh_field("mf_2");
        refresh_field("mf_3");
        refresh_field("mf_4");
        refresh_field("mf_5");
        refresh_field("mf_6");
        refresh_field("mf_7");
        refresh_field("mf_8");
        refresh_field("mf_9");
        refresh_field("mf_10");
    }
}

//Setting up the Mandatory fields based on the Document stage
function set_mfg_fields_toggle_reqd(frm) {
    frm.fields_dict.mf_1.grid.toggle_reqd("opportunity_stage", frm.doc.stage == "Opportunity Stage");
    frm.fields_dict.mf_1.grid.toggle_reqd("opportunity_stage_remarks", frm.doc.stage == "Opportunity Stage");

    frm.fields_dict.mf_2.grid.toggle_reqd("opportunity_stage", frm.doc.stage == "Opportunity Stage");
    frm.fields_dict.mf_2.grid.toggle_reqd("opportunity_stage_remarks", frm.doc.stage == "Opportunity Stage");

    frm.fields_dict.mf_3.grid.toggle_reqd("opportunity_stage", frm.doc.stage == "Opportunity Stage");
    frm.fields_dict.mf_3.grid.toggle_reqd("opportunity_stage_remarks", frm.doc.stage == "Opportunity Stage");

    frm.fields_dict.mf_4.grid.toggle_reqd("opportunity_stage", frm.doc.stage == "Opportunity Stage");
    frm.fields_dict.mf_4.grid.toggle_reqd("opportunity_stage_remarks", frm.doc.stage == "Opportunity Stage");

    frm.fields_dict.mf_5.grid.toggle_reqd("opportunity_stage", frm.doc.stage == "Opportunity Stage");
    frm.fields_dict.mf_5.grid.toggle_reqd("opportunity_stage_remarks", frm.doc.stage == "Opportunity Stage");

    frm.fields_dict.mf_6.grid.toggle_reqd("opportunity_stage", frm.doc.stage == "Opportunity Stage");
    frm.fields_dict.mf_6.grid.toggle_reqd("opportunity_stage_remarks", frm.doc.stage == "Opportunity Stage");

    frm.fields_dict.mf_7.grid.toggle_reqd("opportunity_stage", frm.doc.stage == "Opportunity Stage");
    frm.fields_dict.mf_7.grid.toggle_reqd("opportunity_stage_remarks", frm.doc.stage == "Opportunity Stage");

    frm.fields_dict.mf_8.grid.toggle_reqd("opportunity_stage", frm.doc.stage == "Opportunity Stage");
    frm.fields_dict.mf_8.grid.toggle_reqd("opportunity_stage_remarks", frm.doc.stage == "Opportunity Stage");

    frm.fields_dict.mf_9.grid.toggle_reqd("opportunity_stage", frm.doc.stage == "Opportunity Stage");
    frm.fields_dict.mf_9.grid.toggle_reqd("opportunity_stage_remarks", frm.doc.stage == "Opportunity Stage");

    frm.fields_dict.mf_10.grid.toggle_reqd("opportunity_stage", frm.doc.stage == "Opportunity Stage");
    frm.fields_dict.mf_10.grid.toggle_reqd("opportunity_stage_remarks", frm.doc.stage == "Opportunity Stage");

    frm.fields_dict.mf_1.grid.toggle_reqd("order_handling_stage", frm.doc.stage == "Order Handling Stage");
    frm.fields_dict.mf_1.grid.toggle_reqd("order_handling_stage_remarks", frm.doc.stage == "Order Handling Stage");

    frm.fields_dict.mf_2.grid.toggle_reqd("order_handling_stage", frm.doc.stage == "Order Handling Stage");
    frm.fields_dict.mf_2.grid.toggle_reqd("order_handling_stage_remarks", frm.doc.stage == "Order Handling Stage");

    frm.fields_dict.mf_3.grid.toggle_reqd("order_handling_stage", frm.doc.stage == "Order Handling Stage");
    frm.fields_dict.mf_3.grid.toggle_reqd("order_handling_stage_remarks", frm.doc.stage == "Order Handling Stage");

    frm.fields_dict.mf_4.grid.toggle_reqd("order_handling_stage", frm.doc.stage == "Order Handling Stage");
    frm.fields_dict.mf_4.grid.toggle_reqd("order_handling_stage_remarks", frm.doc.stage == "Order Handling Stage");

    frm.fields_dict.mf_5.grid.toggle_reqd("order_handling_stage", frm.doc.stage == "Order Handling Stage");
    frm.fields_dict.mf_5.grid.toggle_reqd("order_handling_stage_remarks", frm.doc.stage == "Order Handling Stage");

    frm.fields_dict.mf_6.grid.toggle_reqd("order_handling_stage", frm.doc.stage == "Order Handling Stage");
    frm.fields_dict.mf_6.grid.toggle_reqd("order_handling_stage_remarks", frm.doc.stage == "Order Handling Stage");

    frm.fields_dict.mf_7.grid.toggle_reqd("order_handling_stage", frm.doc.stage == "Order Handling Stage");
    frm.fields_dict.mf_7.grid.toggle_reqd("order_handling_stage_remarks", frm.doc.stage == "Order Handling Stage");

    frm.fields_dict.mf_8.grid.toggle_reqd("order_handling_stage", frm.doc.stage == "Order Handling Stage");
    frm.fields_dict.mf_8.grid.toggle_reqd("order_handling_stage_remarks", frm.doc.stage == "Order Handling Stage");

    frm.fields_dict.mf_9.grid.toggle_reqd("order_handling_stage", frm.doc.stage == "Order Handling Stage");
    frm.fields_dict.mf_9.grid.toggle_reqd("order_handling_stage_remarks", frm.doc.stage == "Order Handling Stage");

    frm.fields_dict.mf_10.grid.toggle_reqd("order_handling_stage", frm.doc.stage == "Order Handling Stage");
    frm.fields_dict.mf_10.grid.toggle_reqd("order_handling_stage_remarks", frm.doc.stage == "Order Handling Stage");
    refresh_field("opportunity_stage");
    refresh_field("opportunity_stage_remarks");
    refresh_field("order_handling_stage");
    refresh_field("order_handling_stage_remarks");
}

// Child table Section --Starts
frappe.ui.form.on('Manufacturing Feasibility Detail', {

    // adding validation : Pre-defined questions cannot be deleted by User 
    before_mf_1_remove: function(frm, cdt, cdn) {
        var row = locals[cdt][cdn];
        var deleted_row = frappe.get_doc(cdt, cdn);

        if (deleted_row.can_delete == 1) {
            ffrappe.throw("Cannot Delete Pre-defined Question");
        }
    },
    before_mf_2_remove: function(frm, cdt, cdn) {
        var row = locals[cdt][cdn];
        var deleted_row = frappe.get_doc(cdt, cdn);

        if (deleted_row.can_delete == 1) {
            frappe.throw("Cannot Delete Pre-defined Question");
        }
    },
    before_mf_3_remove: function(frm, cdt, cdn) {
        var row = locals[cdt][cdn];
        var deleted_row = frappe.get_doc(cdt, cdn);

        if (deleted_row.can_delete == 1) {
            frappe.throw("Cannot Delete Pre-defined Question");
        }
    },
    before_mf_4_remove: function(frm, cdt, cdn) {
        var row = locals[cdt][cdn];
        var deleted_row = frappe.get_doc(cdt, cdn);

        if (deleted_row.can_delete == 1) {
            frappe.throw("Cannot Delete Pre-defined Question");
        }
    },
    before_mf_5_remove: function(frm, cdt, cdn) {
        var row = locals[cdt][cdn];
        var deleted_row = frappe.get_doc(cdt, cdn);

        if (deleted_row.can_delete == 1) {
            frappe.throw("Cannot Delete Pre-defined Question");
        }
    },
    before_mf_6_remove: function(frm, cdt, cdn) {
        var row = locals[cdt][cdn];
        var deleted_row = frappe.get_doc(cdt, cdn);

        if (deleted_row.can_delete == 1) {
            frappe.throw("Cannot Delete Pre-defined Question");
        }
    },
    before_mf_7_remove: function(frm, cdt, cdn) {
        var row = locals[cdt][cdn];
        var deleted_row = frappe.get_doc(cdt, cdn);

        if (deleted_row.can_delete == 1) {
            frappe.throw("Cannot Delete Pre-defined Question");
        }
    },
    before_mf_8_remove: function(frm, cdt, cdn) {
        var row = locals[cdt][cdn];
        var deleted_row = frappe.get_doc(cdt, cdn);

        if (deleted_row.can_delete == 1) {
            frappe.throw("Cannot Delete Pre-defined Question");
        }
    },
    before_mf_9_remove: function(frm, cdt, cdn) {
        var row = locals[cdt][cdn];
        var deleted_row = frappe.get_doc(cdt, cdn);

        if (deleted_row.can_delete == 1) {
            frappe.throw("Cannot Delete Pre-defined Question");
        }
    },
    before_mf_10_remove: function(frm, cdt, cdn) {
        var row = locals[cdt][cdn];
        var deleted_row = frappe.get_doc(cdt, cdn);

        if (deleted_row.can_delete == 1) {
            frappe.throw("Cannot Delete Pre-defined Question");
        }
    }
});
// Child table Section --End

// End of Program