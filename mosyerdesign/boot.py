
from cmath import log
from operator import le
import frappe

def boot_session(bootinfo):
    bootinfo.doc_notification = get_doctypes_notification()
    bootinfo.enable_sys_controller = enable_system_controller()
    bootinfo.sidebar_items = get_sidebar_items()

def get_sidebar_items():
    system_controller = frappe.get_single('System Controller')
    labels = []
    if len(system_controller.sidebar_labels):
        for row in system_controller.sidebar_labels:
            labels.append({'label': row.label, 'name': row.label,'icon': row.icon, 'child_items':[]})

        for label in labels:
            for row in system_controller.sidebar_item:
                route = ''
                if row.type == 'Report':
                    route = 'query-report/' + row.doc_name
                elif row.type == 'DocType':
                    route = '-'.join(row.doc_name.lower().split(' '))

                if label.get('label') == row.parent_name:
                    label.get('child_items').append({'route':route, 'name':row.doc_name, 'label':row.label, 'icon':row.icon, 'route':route})
    return labels

def get_doctypes_notification():
    system_controller = frappe.get_single('System Controller')
    docs_info = []
    if len(system_controller.notifications):
        for doc in system_controller.notifications:
            if frappe.has_permission(doctype=doc.title, user=frappe.session.user):
                lst =  frappe.get_list(doc.title, fields=['*'], filters={'docstatus':1}, limit=5)
                docs_info += lst
    return docs_info

def enable_system_controller():
    system_controller = frappe.get_single('System Controller')
    return system_controller.enable
