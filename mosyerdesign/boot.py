
from cmath import log
from operator import le
import frappe

def boot_session(bootinfo):
    bootinfo.doc_notification = get_doctypes_notification()
    bootinfo.enable_sys_controller = enable_system_controller()
    bootinfo.sidebar_items = get_sidebar_items()
    bootinfo.desk_settings = get_desk_settings()

def get_sidebar_items():
    system_controller = frappe.get_single('System Controller')
    labels = []
    if "Employee" in frappe.get_roles(frappe.session.user) and frappe.session.user != 'Administrator':
        if len(system_controller.employee_label):
            for row in system_controller.employee_label:
                labels.append({'label': row.label, 'name': row.label,'icon': row.icon, 'child_items':[]})

            for label in labels:
                for row in system_controller.employee_shortcuts:
                    route = ''
                    if row.type == 'Report':
                        route = 'query-report/' + row.doc_name
                    elif row.type == 'DocType':
                        route = '-'.join(row.doc_name.lower().split(' '))

                    if label.get('label') == row.parent_name:
                        label.get('child_items').append({'name':row.doc_name, 'label':row.label, 'icon':row.icon, 'route':route})    
        return labels

    else:
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
                        label.get('child_items').append({'name':row.doc_name, 'label':row.label, 'icon':row.icon, 'route':route})
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

def get_desk_settings():
    role_list = frappe.get_all("Role", fields=["*"], filters=dict(name=["in", frappe.get_roles()]))
    desk_settings = {}

    from frappe.core.doctype.role.role import desk_properties

    for role in role_list:
        for key in desk_properties:
            desk_settings[key] = desk_settings.get(key) or role.get(key)
    desk_settings['list_sidebar'] = 1
    desk_settings['form_sidebar'] = 1
    return desk_settings


# def get_doctypes_employee():
#     # system_controller = frappe.get_single('System Controller')
#     # docs_info = []
#     # if len(system_controller.employee_shortcuts):
#     #     for doc in system_controller.employee_shortcuts:
#     #         if frappe.has_permission(doctype=doc.title, user=frappe.session.user):
#     #             lst =  frappe.get_list(doc.title, fields=['*'], filters={'docstatus':1}, limit=5)
#     #             docs_info += lst
#     # return docs_info

#     system_controller = frappe.get_single('System Controller')
#     labels = []
#     if len(system_controller.employee_shortcuts):
#         for row in system_controller.employee_shortcuts:
#             labels.append({'title': row.title,'icon': row.icon, 'child_items':[]})

#         for label in labels:
#             for row in system_controller.employee_shortcuts:
#                 if frappe.has_permission(doctype=row.title, user=frappe.session.user):
#                     label.get('child_items').append({'icon':row.icon, 'title':row.title})
#     return labels