// Copyright (c) 2022, Tahir Zaqout and contributors
// For license information, please see license.txt

frappe.ui.form.on('System Controller', {
	refresh: function(frm) {
		frm.trigger('prepare_sidebar_lables');

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
	prepare_sidebar_lables: function(frm) {
		let labels = '\n';
		let items = frm.doc['sidebar_labels'] || []
		let final_labels = []
		items.forEach(row => {
			if(row.label) final_labels.push(row.label) 
		});
		labels = final_labels.join("\n")
		console.log(labels);
		frm.fields_dict.sidebar_item.grid.update_docfield_property('parent_name', 'options', labels);
	}
});
frappe.ui.form.on('Sidebar Label', {
	sidebar_labels_add(frm, cdt, cdn){frm.trigger('prepare_sidebar_lables');},
	sidebar_labels_delete(frm, cdt, cdn){frm.trigger('prepare_sidebar_lables');},
	label(frm, cdt, cdn){ frm.trigger('prepare_sidebar_lables');}
})
