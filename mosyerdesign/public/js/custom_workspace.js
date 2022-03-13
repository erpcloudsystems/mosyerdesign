frappe.views.Workspace.prototype.make_sidebar = function () {
    this.build_sidebar_section('category', frappe.boot.allowed_doctypes);
}

frappe.views.Workspace.prototype.build_sidebar_section = function (title, items) {
    let sidebar_section = $(`<div class="standard-sidebar-section"></div>`);

    // DO NOT REMOVE: Comment to load translation
    // __("Modules") __("Domains") __("Places") __("Administration")
    $(`<div class="standard-sidebar-label">${__(title)}</div>`)
        .appendTo(sidebar_section);
    const logo = ` <a class="navbar-brand navbar-home mb-3" href="/app" style="border-bottom: 1px solid #eee; margin-right: 0; width: 100%;">
                    <img class="app-logo" style="width: 125px; min-height: 50px !important;"
                        src="${ frappe.boot.app_logo_url }">
                </a>`;
    const avatar = `<a href="/app/user/${frappe.session.user_email}" class="desk-sidebar-item standard-sidebar-item " style="border-bottom: 1px solid #eee;">
                    <span>
                        <img src= "${ frappe.boot.user_info[frappe.session.user].image ? frappe.boot.user_info[frappe.session.user].image : '/assets/mosyerdesign/img/avatar-alt.jpg' }"
                        style="width: 30px; border-radius: 50%; margin-right: 27px"/ >
                    </span>
                    <span class="sidebar-item-label"> ${ frappe.session.user_fullname }<span>
                </a>`;
    const supportImg = `<div class="text-center"> 
                            <img src="/assets/mosyerdesign/img/support.jpg" alt="support image" style="width: 200px"
                        </div>
                        `
    let sett = ''
    // User Settings Options 
    frappe.boot.navbar_settings.settings_dropdown.forEach(item => {
            if (!item.hidden) {
                if (item.route) {
                    sett += `<a class="dropdown-item" href="${ item.route }"> ${__(item.item_label)} </a>`
                }
                if (item.action) {
                    sett += `<a class="dropdown-item" onclick="return ${item.action }"> ${__(item.item_label)} </a>`
                }
                else {
                    sett += `<div class="dropdown-divider"></div>`
                }
            }
    })
    const userSettings = `
                <div class="nav-item dropdown dropdown-navbar-user dropdown-mobile mb-2">
                    <a class="nav-link" style="padding: 0.5rem;" data-toggle="dropdown" href="#" onclick="return false;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots"
                            viewBox="0 0 16 16">
                            <path
                                d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                        </svg>
                        <span class="ml-2">Settings</span>
                    </a>
                    
                    <div class="dropdown-menu dropdown-menu-right" id="toolbar-user" role="menu" style='max-height: 300px; overflow-y: auto;'>
                        ${sett}
                    </div>
                </div>
                `
    const userAccount = `
                         <a class="nav-link" style="padding: 0.5rem;" href="${frappe.boot.navbar_settings.settings_dropdown[0].route }">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots"
                                viewBox="0 0 16 16">
                                <path
                                    d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                            </svg>
                            <span class="ml-2">My Account</span>
                        </a>
                        `
    sidebar_section.prepend(avatar)
    sidebar_section.prepend(logo)
    $('.overlay-sidebar').append(userSettings)
    $('.overlay-sidebar').append(supportImg)
    $('.overlay-sidebar').append(userAccount)

    const get_sidebar_item = function (item) {
        return $(`
				<a href="/app/${frappe.router.slug(item.name)}"
					class="desk-sidebar-item standard-sidebar-item " >
					<span>${frappe.utils.icon(item.icon || "folder-normal", "md")}</span>
					<span class="sidebar-item-label">${item.label || item.name}<span>
				</a>
			`);
    };

    const make_sidebar_category_item = item => {
        if (item.name == this.get_page_to_show()) {
            item.selected = true;
            this.current_page_name = item.name;
        }

        let $item = get_sidebar_item(item);

        $item.appendTo(sidebar_section);
        this.sidebar_items[item.name] = $item;
    };

    items.forEach(item => make_sidebar_category_item(item));

    sidebar_section.appendTo(this.sidebar);
}