frappe.views.ListSidebar.prototype.make = function () {
    var sidebar_content = frappe.render_template("list_sidebar", {
        allowed_doctypes: frappe.boot.allowed_doctypes
    });

    this.sidebar = $('<div class="list-sidebar overlay-sidebar hidden-xs hidden-sm"></div>')
        .html(sidebar_content)
        .appendTo(this.page.sidebar.empty());

    // do not remove
    // used to trigger custom scripts
    $(document).trigger('list_sidebar_setup');

     this.sidebar.find('a.toggler-btn').on('click', () => {        $('.layout-side-section').toggleClass('toggle-sidebar');
        $('.nav-app-logo').toggle();
        $('.cus-app-logo').toggleClass('hidden');
        $('.sidebar-item-label').toggleClass('hidden');
        $('.user-account').toggleClass('hidden');
        $('.settings').toggleClass('hidden');
        $('.support-img').toggleClass('hidden');
        $('.toolbar-user').toggleClass('user-settings-list');
        $('.sidebar-reports').toggleClass('sm-nav');
        $('a.toggler-btn').toggleClass('toggle-side-sm-btn');$('.toolbar-user').toggleClass('user-settings-list');
     });
}
