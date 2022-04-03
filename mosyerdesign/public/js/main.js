$(document).ready(function(){
    $('body').addClass('anvil-custom-theme')
    $('a.toggler-btn').on('click', (e) => {
        $('.layout-side-section').toggleClass('toggle-sidebar');
        $('.nav-app-logo').toggle();
        $('.cus-app-logo').toggleClass('hidden');
        $('.sidebar-item-label').toggleClass('hidden');
        $('.user-account').toggleClass('hidden');
        $('.settings').toggleClass('hidden');
        $('.support-img').toggleClass('hidden');
        $('.toolbar-user').toggleClass('user-settings-list');
        $('.sidebar-reports').toggleClass('sm-nav');
        $('a.toggler-btn').toggleClass('toggle-side-sm-btn');
    });

    $(".lang-switcher").on('click', function (e) {
        if (frappe.boot.lang !== $(e.target).attr("data-lang")) {
            frappe.db.set_value("User", frappe.session.user, "language", $(e.target).attr("data-lang"))
                .then(() => { location.reload(); })
        }
    });

    $(window).resize(function() {
        if(window.innerWidth <= '991'  && $('div.col-lg-2.layout-side-section').hasClass('toggle-sidebar')){
            $('div.layout-side-section').removeClass('toggle-sidebar')
            $('a.toggler-btn').trigger( "click" );
        }
    })
});