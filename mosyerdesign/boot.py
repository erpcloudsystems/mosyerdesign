
from cmath import log
import frappe

def boot_session(bootinfo):
    bootinfo.doc_notification = get_doctypes_notification()
    bootinfo.enable_sys_controller = enable_system_controller()
    bootinfo.sidebar_items = get_sidebar_items()

def get_sidebar_items():
    system_controller = frappe.get_single('System Controller')
    sidebar_items = []
    child_items = []
    for row in system_controller.sidebar_item:
        route = ''
        if row.type == 'Report':
            route = 'query-report/' + row.doc_name
        else:route = '-'.join(row.doc_name.lower().split(' '))

        if not row.parent_name:
            sidebar_items.append({'name': row.doc_name , 'icon':row.icon,'module': '', 'label': row.label,'route':route, 'items':[]})
        else:
            child_items.append({'name':row.doc_name, 'parent_name': row.parent_name, 'route':route})
    
    for ch_itm in child_items:
        for itm in sidebar_items:
            if ch_itm.get('parent_name') == itm.get('name'):
                itm.get('items').append({'name':ch_itm.get('name'), 'route':ch_itm.get('route')})
    return sidebar_items

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
