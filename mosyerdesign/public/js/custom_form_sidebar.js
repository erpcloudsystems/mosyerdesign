
frappe.ui.form.Sidebar.prototype.make = function(){
    var sidebar_content = frappe.render_template("form_sidebar", {
        allowed_doctypes: frappe.boot.allowed_doctypes
    });

    this.sidebar = $('<div class="form-sidebar overlay-sidebar hidden-xs hidden-sm"></div>')
        .html(sidebar_content)
        .appendTo(this.page.sidebar.empty());
}