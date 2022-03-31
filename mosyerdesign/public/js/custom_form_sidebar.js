
frappe.ui.form.Sidebar.prototype.make = function(){
    var sidebar_content = frappe.render_template("form_sidebar", {
        allowed_doctypes: frappe.boot.allowed_doctypes
    });

    this.sidebar = $('<div class="form-sidebar overlay-sidebar hidden-xs hidden-sm"></div>')
        .html(sidebar_content)
        .appendTo(this.page.sidebar.empty());
        
        this.sidebar.find('a.toggler-btn').on('click', () => {
            $('.layout-side-section').toggleClass('toggle-sidebar');
            $('.nav-app-logo').toggle();
            $('.cus-app-logo').toggleClass('hidden');
            $('.sidebar-item-label').toggleClass('hidden');
            $('.user-account').toggleClass('hidden');
            $('.settings').toggleClass('hidden');
            $('.support-img').toggleClass('hidden');
            $('.toolbar-user').toggleClass('user-settings-list');
        });
}