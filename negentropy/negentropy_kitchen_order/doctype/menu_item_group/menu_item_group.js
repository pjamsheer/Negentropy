// Copyright (c) 2019, Kaynes Technology India Pvt Ltd and contributors
// For license information, please see license.txt

frappe.ui.form.on('Menu Item Group', {
	// refresh: function(frm) {

	// }
});

frappe.ui.form.on('Menu Item Group List', {
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

	}

});