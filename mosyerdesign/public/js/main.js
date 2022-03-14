$(document).ready(function(){
    $('a.toggler-btn').on('click', (e) => {
        $('.layout-side-section').toggleClass('toggle-sidebar');
        $('.sidebar-item-label').toggleClass('hidden');
        $('.user-account').toggleClass('hidden');
        $('.settings').toggleClass('hidden');
        $('.support-img').toggleClass('hidden');
        $('.toolbar-user').toggleClass('user-settings-list');
    });
})