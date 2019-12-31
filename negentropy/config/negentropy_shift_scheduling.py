from __future__ import unicode_literals
from frappe import _

def get_data():
	return [
		{
			"label": _("Shift Scheduling"),
			"icon": "fa fa-star",
			"items": [
				{
					"type": "doctype",
					"name": "Shift Type",
					"description": _("Database of Shift Type."),
					"onboard": 1,
				},
				{
					"type": "doctype",
					"name": "Shift Configuration",
					"description": _("Database of Shift Configuration."),
					"onboard": 1,
				},
				{
					"type": "doctype",
					"name": "Shift Plan",
					"description": _("Employee Shift Plan database."),
					"onboard": 1,
				},
			]
		},
	]
