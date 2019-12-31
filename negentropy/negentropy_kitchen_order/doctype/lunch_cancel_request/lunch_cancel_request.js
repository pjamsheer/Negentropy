// Copyright (c) 2019, Kaynes Technology India Pvt Ltd and contributors
// For license information, please see license.txt

frappe.ui.form.on('Lunch Cancel Request', {
	before_save: function(frm){
		var child = frm.doc.kitchen_order_employee
		var total = child.length
		frm.set_value("employee_count",total);
	},
	validate: function(frm){
		frm.trigger("time_checker");
	},
	refresh: function(frm){
		// window.open("http://localhost:8003/desk#List/Kitchen%20Order/Kanban/Kitchen%20Order%20Management","_self");
		if(frm.doc.__islocal){
			frm.set_value("date",frappe.datetime.nowdate())
			var today = new Date();
			var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
			frm.set_value("time",time)
			frm.trigger("time_checker");
		}
		if(frm.doc.status == "Approved" && frappe.user.has_role("Kitchen User")){
			frappe.call({
				"method": "frappe.client.get_list",
				args:{
					"doctype": "Kitchen Order",
					filters:{
						"lcr_id": frm.doc.name,
					}
				},
				callback: function(r){
					if(r.message.length == 0){
						frm.add_custom_button("Apply Kitchen Order", function() {
							frappe.set_route("Form", "Kitchen Order","New Kitchen Order",{"order_type":"Personal","lcr_status":"Approved","purpose_of_order":"Self","lcr_id":frm.doc.name});
						});
					}
				}
			})
			
		}
	},
	time_checker: function(frm){
		if(frm.doc.time >= "11:00:00"){
			frappe.validated = false
			frappe.msgprint("Time Crossed")
		}
	}
});


frappe.ui.form.on('Kitchen Order Employee', {
	employee_id: function(frm, cdt, cdn){
		var child = locals[cdt][cdn];
		var emp_id = child.employee_id;
		// var result = myFunction("Employee",emp_id)
		// console.log(myFunction("Employee",emp_id))
		frappe.call({
	        "method": "frappe.client.get",
	        args:{
	            "doctype": "Employee",
	            "name": child.employee_id
	        },
	        callback: function(r){
				frappe.model.set_value(child.doctype, child.name, "employee_name", r.message.employee_name);
				frappe.model.set_value(child.doctype, child.name, "department", r.message.department);
	        }
	    })

	},
	

});