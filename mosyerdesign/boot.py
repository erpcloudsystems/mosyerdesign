
import frappe

def boot_session(bootinfo):
    bootinfo.allowed_doctypes = get_allowed_doctypes()
    bootinfo.reports = get_sidebar_reports()
    bootinfo.doc_notification = get_doctypes_notification()
    bootinfo.enable_sys_controller = enable_system_controller()

def get_allowed_doctypes():
    system_controller = frappe.get_single('System Controller')
    allowed_doctypes = []
    if len(system_controller.doctypes):
        for doctype in system_controller.doctypes:
            if frappe.has_permission(doctype=doctype.doctype_name, user=frappe.session.user):
                lst = [d.name for d in frappe.get_list(doctype.doctype_name)]
                allowed_doctypes.append({'name': doctype.doctype_name, 'category': doctype.category,
                                        'icon': doctype.icon, 'label': doctype.label,
                                        'module': doctype.module, 'items':lst})
    return allowed_doctypes

def get_sidebar_reports():
    system_controller = frappe.get_single('System Controller')
    reports = []
    if len(system_controller.reports):
        for report in system_controller.reports:
            doc = frappe.get_doc("Report", report.report)
            if frappe.has_permission(doc.ref_doctype, "report", user=frappe.session.user):
                r_name = report.report.split(' ')
                report_name = '%20'.join(r_name)
                reports.append({'name': report_name, 'label': report.report, 'icon': report.icon,
                            'category': 'Report',})
    return reports

def get_doctypes_notification():
    system_controller = frappe.get_single('System Controller')
    docs_info = []
    if len(system_controller.notifications):
        for doc in system_controller.notifications:
            if frappe.has_permission(doctype=doc.title, user=frappe.session.user):
                lst =  frappe.get_list(doc.title, fields=['*'], limit=5)
                docs_info += lst
    return docs_info

def enable_system_controller():
    system_controller = frappe.get_single('System Controller')
    return system_controller.enable
