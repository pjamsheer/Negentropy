// Copyright (c) 2019, Kaynes Technology India Pvt Ltd and contributors
// For license information, please see license.txt

frappe.ui.form.on('Shift Plan', {
	plan_from: function(frm) {
		if(frm.doc.plan_to){
			frm.trigger("date_validation");
		}
	},
	plan_to: function(frm) {
		if(frm.doc.plan_from){
			frm.trigger("date_validation");
		}
	},
	date_validation: function(frm) {
		if(frm.doc.plan_from > frm.doc.plan_to){
			frappe.validated = false;
			frappe.msgprint("Plan From Date must be less than To Date")
		}
	},
	validate: function(frm) {
		frm.trigger("date_validation");
		frappe.call({
			"method": "frappe.client.get",
			args:{
				"doctype": "Shift Configuration",
				"name": frm.doc.shift_configuration
			},
			async: false,
			callback: function(r){
				var shift_configuration_child = r.message.shift_configuration_child;
				var no_of_employee_list = [];
				var highest_count = 0;
				for (var i = 0;i< shift_configuration_child.length;i++){
					no_of_employee_list.push(shift_configuration_child[i].noof_people)
				}
				highest_count = Math.max.apply(null, no_of_employee_list)
				if(shift_configuration_child.length <= highest_count || shift_configuration_child.length <= 7 ){
					frappe.validated = false;
					frappe.msgprint("Please add "+highest_count+" employees for optimal roster!")
				} else if(shift_configuration_child.length == 7 && shift_configuration_child.length > highest_count){
					frappe.validated = false;
					frappe.msgprint("Please add "+highest_count+1+" employees for optimal roster!")
				} else if(shift_configuration_child.length == 7 && shift_configuration_child.length > highest_count){
					frappe.validated = false;
					frappe.msgprint("Please add "+highest_count+1+" employees for optimal roster!")
				}
			}
		})
	},
});
