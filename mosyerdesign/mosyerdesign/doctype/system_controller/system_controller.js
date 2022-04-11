// Copyright (c) 2022, Tahir Zaqout and contributors
// For license information, please see license.txt

frappe.ui.form.on('System Controller', {
	refresh: function(frm) {
		frm.trigger('set_parent_label_options');

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
		};
	},
	set_parent_label_options: function(frm) {
		frm.fields_dict.sidebar_item.grid.update_docfield_property(
			'parent_name', 'options', frm.events.get_parent_options(frm, "sidebar_item")
		);
	},
	get_parent_options: function(frm, table_field) {
		var items = frm.doc[table_field] || [];
		var main_items = [''];
		for (var i in items) {
			var d = items[i];
			if (d.type == 'Label') {
				main_items.push(d.label)
			};
		}
		return main_items.join('\n');
	},

	set_parent_options: function(frm, doctype, name) {
		var item = frappe.get_doc(doctype, name);
		if(item.parentfield === "sidebar_item") {
			frm.trigger('set_parent_label_options');
		}
	},

});
frappe.ui.form.on('SideBar Item Table', {
	sidebar_item_add(frm) {
		frm.events.set_parent_label_options(frm);
	},
	sidebar_item_delete(frm) {
		frm.events.set_parent_label_options(frm);
	},
	doc_name: function(frm, doctype, name) {
		frm.events.set_parent_options(frm, doctype, name);
	},
})
