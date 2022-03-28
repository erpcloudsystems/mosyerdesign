from __future__ import unicode_literals
import frappe
from frappe import _, DoesNotExistError


@frappe.whitelist()
@frappe.read_only()
def get_desktop_page(page):
    """ Applies permissions, customizations and returns the configruration for a page on desk.
		Args: page (string): page name
		Returns: dict: dictionary of cards, charts and shortcuts to be displayed on website
    """
    try:
        sys_controller = frappe.get_single('System Controller')
        shortcuts_items = []
        wspace_shortcuts = {}
        wspace_charts = {}
        charts_items = []

        for ch in sys_controller.home_charts:
            charts_items.append(
                {"chart_name": ch.chart, "label": ch.chart, "chart_settings": {}})
        wspace_charts = {'label': None, 'items': charts_items}

        if 'Administrator' in frappe.get_roles():
            user_shortcuts = sys_controller.system_admin_shortcuts
            for shcut in user_shortcuts:
                doc_len = len(frappe.get_list(shcut.title))
                shortcuts_items.append({
                    'type': 'DocType', 'link_to': shcut.title, 'doc_view': 'List', 'count': doc_len,
                    'label': shcut.title, 'icon': shcut.icon})
            wspace_shortcuts = {'label': None, 'items': shortcuts_items}

        if 'HR Manager' in frappe.get_roles():
            user_shortcuts = sys_controller.hr_manager_shortcuts
            for shcut in user_shortcuts:
                doc_len = len(frappe.get_list(shcut.title))
                shortcuts_items.append({
                    'type': 'DocType', 'link_to': shcut.title, 'doc_view': 'List', 'count': doc_len,
                    'label': shcut.title, 'icon': shcut.icon})
            wspace_shortcuts = {'label': None, 'items': shortcuts_items}

        if 'HR User' in frappe.get_roles():
            user_shortcuts = sys_controller.hr_user_shortcuts
            for shcut in user_shortcuts:
                doc_len = len(frappe.get_list(shcut.title))
                shortcuts_items.append({
                    'type': 'DocType', 'link_to': shcut.title, 'doc_view': 'List', 'count': doc_len,
                    'label': shcut.title, 'icon': shcut.icon})
            wspace_shortcuts = {'label': None, 'items': shortcuts_items}

        wspace_cards = {'label': None, 'items': []}
        return {
            'shortcuts': wspace_shortcuts,
            'charts': wspace_charts,
            'cards': wspace_cards,
            'onboarding': None,
            'allow_customization': False
        }
    except DoesNotExistError:
        frappe.log_error(frappe.get_traceback())
        return {}
