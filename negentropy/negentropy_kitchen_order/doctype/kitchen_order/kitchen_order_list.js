frappe.listview_settings['Kitchen Order'] = {
	refresh: function(me) {
        if(frappe.user.has_role("Kitchen Admin")){
            frappe.call({
                "method": "negentropy.negentropy_kitchen_order.custom.alarm",
                args:{
                    "doc_name": "Kitchen Order"
                },
                callback: function(r){
                }
            })
        }
        // if(frappe.user.has_role("Kitchen Admin")){
        //     setTimeout(function () { location.reload() }, 60000);
        // }
        // cur_list.refresh()
		// me.page.set_title(__("Notes"));
	},
	// add_fields: ["status", "order_type"],
}
