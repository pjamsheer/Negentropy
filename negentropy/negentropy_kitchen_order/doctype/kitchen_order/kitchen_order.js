// Copyright (c) 2019, Kaynes Technology India Pvt Ltd and contributors
// For license information, please see license.txt


cur_frm.fields_dict['purpose_of_order'].get_query = function(doc) {
	return {
		filters: {
			"order_type": doc.order_type
		}
	}
}


var items = []
frappe.ui.form.on('Kitchen Order', {
	refresh: function(frm) {
		if(frm.doc.order_type == "Personal"){
			cur_frm.fields_dict['kitchen_order_employee'].grid.wrapper.find('.grid-add-row').hide();
			cur_frm.fields_dict['kitchen_order_employee'].grid.wrapper.find('.grid-remove-rows').hide();
		}
		if(frm.doc.lcr_id && frm.doc.__islocal && frm.doc.order_type == "Personal"){
			frappe.call({
				"method": "frappe.client.get",
				args:{
					"doctype": "Lunch Cancel Request",
					"name": frm.doc.lcr_id
				},
				callback: function(r){
					var lcr_child = r.message.kitchen_order_employee
					frm.clear_table("kitchen_order_employee")
					for(var i=0;i<lcr_child.length;i++){
						var row = frappe.model.add_child(frm.doc, "Kitchen Order Employee", "kitchen_order_employee");					
						row.employee_id = lcr_child[i].employee_id;
						row.employee_name = lcr_child[i].employee_name;
						row.department = lcr_child[i].department;						
					}
					refresh_field("kitchen_order_employee")
				}
			})
		}
		if(frm.doc.__islocal){
			frm.set_value("date",frappe.datetime.nowdate())
			var today = new Date();
			var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
			frm.set_value("time",time)
			if(frm.doc.order_type == "Personal"){
				frm.trigger("time_checker");
			}
		}
		if(frm.doc.status == "Draft" && !frm.doc.text && !frm.doc.__islocal){
			var child = frm.doc.kitchen_order_items
			var text = "Token No: " + frm.doc.name +", \n Order Type: "+frm.doc.order_type +", \n Purpose of Order: "+frm.doc.purpose_of_order
			                  +", \n Order Location: "+frm.doc.order_location +", \n Items: "
			for(var i=0;i<child.length;i++){
				text += child[i].item_name + ", "
			}
			if(frm.doc.order_type == "Personal"){
				text += ", \n Total Amount: "+frm.doc.total_amount
			}
			frm.set_value("text",text)
			frm.save()
		}
	},
	validate: function(frm){
		if(frm.doc.order_type == "Personal"){
			frm.trigger("time_checker");
		}
	},
	time_checker: function(frm){
		if(frm.doc.time >= "13:00:00"){
			frappe.validated = false
			frappe.msgprint("Time Crossed")
		}
	},
	onload: function(frm){
		cur_frm.set_query("item_name", "kitchen_order_items", function(doc, cdt, cdn) {
			var d = locals[cdt][cdn];
			var d = new Date();
			var weekday = new Array(7);
			weekday[0] = "Sunday";
			weekday[1] = "Monday";
			weekday[2] = "Tuesday";
			weekday[3] = "Wednesday";
			weekday[4] = "Thursday";
			weekday[5] = "Friday";
			weekday[6] = "Saturday";
		
			var n = weekday[d.getDay()];
			frappe.call({
				"method": "frappe.client.get",
				args:{
					"doctype": "Menu Item Group",
					"name": n
				},
				async:false,
				callback: function(r){
					var migl = r.message.menu_item_group_list
					for(var i=0;i<migl.length;i++){
						items.push(migl[i].item_name)						
					}
				}
			})
			return {
				filters:[
						['Menu Item','item_name','in',items]
				]
			}			
		})
	},
	total: function(frm){
		var child = frm.doc.kitchen_order_items
		var total = 0;
		for(var i=0;i<child.length;i++){
			total += child[i].total_cost
		}
		frm.set_value("total_amount",total)
	},		
});

frappe.ui.form.on('Kitchen Order Items', {
	item_name: function(frm, cdt, cdn){
		var child = locals[cdt][cdn];
		frappe.call({
	        "method": "frappe.client.get",
	        args:{
	            "doctype": "Menu Item",
	            "name": child.item_name
	        },
	        callback: function(r){
	            frappe.model.set_value(child.doctype, child.name, "cost", r.message.cost);
	        }
	    })
	},
	quantity: function(frm, cdt, cdn){
		var child = locals[cdt][cdn];
		var tot = child.quantity * child.cost;
		frappe.model.set_value(child.doctype, child.name, "total_cost", tot);
	},
	cost: function(frm, cdt, cdn){
		var child = locals[cdt][cdn];
		var tot = child.quantity * child.cost;
		frappe.model.set_value(child.doctype, child.name, "total_cost", tot);
	},
	total_cost: function(frm){
		frm.trigger("total");
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



// function myFunction(doctype,name) {
// 	// var result = "";
// 	frappe.call({
// 		"method": "frappe.client.get",
// 		args:{
// 			"doctype": doctype,
// 			"name": name
// 		},
// 		callback: function(r){
// 			if(r.message){
// 				var value = r.message;
// 				// console.log(value)
// 				return value;
// 			}
// 			// result = r.message
// 			// console.log(result)
// 		}
// 	})
// 	// console.log(result)
// 	// return result;   // The function returns the product of p1 and p2
//   }