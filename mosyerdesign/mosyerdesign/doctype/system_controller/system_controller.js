// Copyright (c) 2022, Tahir Zaqout and contributors
// For license information, please see license.txt

frappe.ui.form.on('System Controller', {
	refresh: function(frm) {
		frm.fields_dict['system_admin_shortcuts'].grid.get_field("title").get_query = function(doc, cdt, cdn) {
			return {
				filters: {'issingle': 0}
			}
		};
		frm.fields_dict['hr_manager_shortcuts'].grid.get_field("title").get_query = function(doc, cdt, cdn) {
			return {
				filters: {'issingle': 0}
			}
		};
		frm.fields_dict['hr_user_shortcuts'].grid.get_field("title").get_query = function(doc, cdt, cdn) {
			return {
				filters: {'issingle': 0}
			}
		};
		frm.fields_dict['notifications'].grid.get_field("title").get_query = function(doc, cdt, cdn) {
			return {
				filters: {'issingle': 0}
			}
		}
	}
});
