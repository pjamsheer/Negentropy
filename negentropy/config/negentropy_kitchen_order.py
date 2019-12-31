from __future__ import unicode_literals
from frappe import _

def get_data():
	return [
		{
			"label": _("Kitchen Order"),
			"icon": "fa fa-star",
			"items": [
				{
					"type": "doctype",
					"name": "Kitchen Order",
					"description": _("Database of Kitchen Order."),
					"onboard": 1,
				},
				{
					"type": "doctype",
					"name": "Lunch Cancel Request",
					"description": _("Database of Lunch Cancel Request."),
					"onboard": 1,
				},
				{
					"type": "doctype",
					"name": "Employee Salary Deduction",
					"description": _("Employee Salary Deduction database."),
					"onboard": 1,
				},
			]
		},
		{
			"label": _("Settings"),
			"icon": "fa fa-cog",
			"items": [
				{
					"type": "doctype",
					"label": _("Menu Item"),
					"name": "Menu Item",
					"icon": "fa fa-sitemap",
					"link": "List/Menu Item",
					"description": _("Manage Menu Item."),
					"onboard": 1,
				},
				{
					"type": "doctype",
					"label": _("Menu Item Group"),
					"name": "Menu Item Group",
					"icon": "fa fa-sitemap",
					"link": "List/Menu Item Group",
					"description": _("Manage Menu Item Group."),
					"onboard": 1,
				},
                {
					"type": "doctype",
					"label": _("Order Location"),
					"name": "Order Location",
					"icon": "fa fa-sitemap",
					"link": "List/Order Location",
					"description": _("Manage Order Location."),
					"onboard": 1,
				},
				{
					"type": "doctype",
					"label": _("Purpose of Order"),
					"name": "Purpose of Order",
					"icon": "fa fa-sitemap",
					"link": "List/Purpose of Order",
					"description": _("Manage Purpose of Order."),
					"onboard": 1,
				},
			]
		},
	]
