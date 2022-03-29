
import frappe

def boot_session(bootinfo):
    bootinfo.allowed_doctypes = get_allowed_doctypes()
    bootinfo.doc_notification = get_doctypes_notification()
    bootinfo.enable_sys_controller = enable_system_controller()

def get_allowed_doctypes():
    system_controller = frappe.get_single('System Controller')
    allowed_doctypes = []
    for doctype in system_controller.doctypes:
        if frappe.has_permission(doctype=doctype.doctype_name, user=frappe.session.user):
            allowed_doctypes.append({'name': doctype.doctype_name, 'category': doctype.category,
                                    'icon': doctype.icon, 'label': doctype.label, 'module': doctype.module})
    return allowed_doctypes

def get_doctypes_notification():
    system_controller = frappe.get_single('System Controller')
    if len(system_controller.notifications):
        docs_info = []
        for doc in system_controller.notifications:
            if frappe.has_permission(doctype=doc.title, user=frappe.session.user):
                lst =  frappe.get_list(doc.title, fields=['*'], limit=5)
                docs_info += lst
        return docs_info

def enable_system_controller():
    system_controller = frappe.get_single('System Controller')
    return system_controller.enable
