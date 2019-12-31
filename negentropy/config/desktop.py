# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from frappe import _

def get_data():
	return [
		{
			"module_name": "Negentropy Kitchen Order",
			"category": "Modules",
			"label": _("Negentropy Kitchen Order"),
			"color": "#EF4DB6",
			"icon": "octicon octicon-broadcast",
			"type": "module",
			"description": "Kitchen Order Details."
		},
		{
			"module_name": "Negentropy Shift Scheduling",
			"category": "Modules",
			"label": _("Negentropy Shift Scheduling"),
			"color": "#EF4DB6",
			"icon": "octicon octicon-broadcast",
			"type": "module",
			"description": "Negentropy Shift Scheduling Details."
		},
	]
