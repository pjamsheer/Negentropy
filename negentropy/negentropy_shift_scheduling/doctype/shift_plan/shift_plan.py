# -*- coding: utf-8 -*-
# Copyright (c) 2019, Kaynes Technology India Pvt Ltd and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from frappe.utils import date_diff,add_days
import datetime
from datetime import date, timedelta, datetime
from argparse import ArgumentParser, FileType
from sys import argv, exit, stdout
from random import Random
import webbrowser
from selenium import webdriver
# from ConfigParser import ConfigParser

class ShiftPlan(Document):
    def onload(self):
        if not self.get("__islocal") :
            self.set('shift_plan_preview', [])
            days = date_diff(self.plan_to, self.plan_from) + 1
            for i in range(days):
                day = add_days(self.plan_from,i)
                weekday = day.strftime("%A")
                shift_config = frappe.get_doc("Shift Configuration",self.shift_configuration)
                shift_configuration_child = shift_config.shift_configuration_child
                for child in shift_configuration_child:
                    if child.day == weekday:               		
                        self.append('shift_plan_preview', {
                            "schedule_date":day,
                            "day": weekday,
                            "shift_type": child.shift_type,
                            "employee_list": ""
                        })
            self.save(ignore_permissions=True)
            webbrowser.refresh()
            # webbrowser.open("http://localhost:8003/desk#List/Kitchen%20Order/Kanban/Kitchen%20Order%20Management", new=0, autoraise=True)
            # webbrowser.open("http://localhost:8003/desk#List/Kitchen%20Order/Kanban/Kitchen%20Order%20Management",0)



    
