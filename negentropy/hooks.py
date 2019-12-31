# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from . import __version__ as app_version

app_name = "negentropy"
app_title = "Negentropy"
app_publisher = "Kaynes Technology India Pvt Ltd"
app_description = "Additional features and customizations for ERPNext."
app_icon = "octicon octicon-file-directory"
app_color = "grey"
app_email = "govindsmenokee@kaynestechnology.net"
app_license = "MIT"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/negentropy/css/negentropy.css"
# app_include_js = "/assets/negentropy/js/negentropy.js"

# include js, css files in header of web template
# web_include_css = "/assets/negentropy/css/negentropy.css"
# web_include_js = "/assets/negentropy/js/negentropy.js"

# include js in page
# page_js = {"page" : "public/js/file.js"}
# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Website user home page (by function)
# get_website_user_home_page = "negentropy.utils.get_home_page"

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Installation
# ------------

# before_install = "negentropy.install.before_install"
# after_install = "negentropy.install.after_install"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "negentropy.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

permission_query_conditions = {
	"Kitchen Order": "negentropy.negentropy_kitchen_order.custom.get_permission_query_conditions",
    "Lunch Cancel Request": "negentropy.negentropy_kitchen_order.custom.get_permission_query_conditions1",
}
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# Document Events
# ---------------
# Hook on document methods and events

doc_events = {
	"Kitchen Order": {
		"on_submit": "negentropy.negentropy_kitchen_order.custom.update_LCR"
	},
    # "Kitchen Order": {
	# 	"on_submit": "negentropy.negentropy_kitchen_order.doctype.kitchen_order.kitchen_order_list.refresh"
	# }
}

# Scheduled Tasks
# ---------------

scheduler_events = {
    "cron":{
        "50 14 * * *":[
            "negentropy.negentropy_kitchen_order.custom.change_status"
        ],
        # "0/2 * * * *":[
        #     "negentropy.negentropy_kitchen_order.doctype.kitchen_order.kitchen_order_list.page_refresh"
        # ],

    }
# 	"all": [
# 		"negentropy.tasks.all"
# 	],
# 	"daily": [
# 		"negentropy.tasks.daily"
# 	],
# 	"hourly": [
# 		"negentropy.tasks.hourly"
# 	],
# 	"weekly": [
# 		"negentropy.tasks.weekly"
# 	]
# 	"monthly": [
# 		"negentropy.tasks.monthly"
# 	]
}

# Testing
# -------

# before_tests = "negentropy.install.before_tests"

# Overriding Whitelisted Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "negentropy.event.get_events"
# }

