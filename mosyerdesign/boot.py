
import frappe


def boot_session(bootinfo):
    bootinfo.allowed_doctypes = get_allowed_doctypes()
    bootinfo.home_shortcuts = get_home_shortcuts()
    bootinfo.home_charts = get_home_charts()

def get_allowed_doctypes():
    system_controller = frappe.get_single('System Controller')
    allowed_doctypes = []
    for doctype in system_controller.doctypes:
        if frappe.has_permission(doctype=doctype.doctype_name, user=frappe.session.user):
            allowed_doctypes.append({'name': doctype.doctype_name, 'category': doctype.category,
                                    'icon': doctype.icon, 'label': doctype.label, 'module': doctype.module})
    return allowed_doctypes

def get_home_shortcuts():
    system_controller = frappe.get_single('System Controller')
    home_shortcuts = []
    if len(system_controller.home_shortcuts) > 0:
        for shcut in system_controller.home_shortcuts:
            doc_list = frappe.get_list(shcut.title)
            home_shortcuts.append({'title': shcut.title, 'count': len(doc_list), 'icon': shcut.icon})
    return home_shortcuts

def get_home_charts():
    system_controller = frappe.get_single('System Controller')
    home_charts = []
    if len(system_controller.home_charts) > 0:
        for chart in system_controller.home_charts:
            doc = frappe.get_doc('Dashboard Chart', chart.chart)
            home_charts.append(doc.name)
    return home_charts