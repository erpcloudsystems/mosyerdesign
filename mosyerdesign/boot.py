
import frappe


def boot_session(bootinfo):
    bootinfo.allowed_doctypes = get_allowed_doctypes()

def get_allowed_doctypes():
    system_controller = frappe.get_single('System Controller')
    allowed_doctypes = []
    for doctype in system_controller.doctypes:
        if frappe.has_permission(doctype=doctype.doctype_name, user=frappe.session.user):
            allowed_doctypes.append({'name': doctype.doctype_name, 'category': doctype.category,
                                    'icon': doctype.icon, 'label': doctype.label, 'module': doctype.module})
    return allowed_doctypes
