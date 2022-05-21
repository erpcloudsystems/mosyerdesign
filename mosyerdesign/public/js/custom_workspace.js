frappe.widget.widget_factory.shortcut.prototype.set_title = function(max_chars) {
    let base = this.label || this.name;
    let title = max_chars ? frappe.ellipsis(base, max_chars) : base;

    if (this.icon) {
        let icon = frappe.utils.icon(this.icon);
        this.title_field[0].innerHTML = `${icon} <span>${title}</span>`;
    } else {
        this.title_field[0].innerHTML = title;
        if (max_chars) {
            this.title_field[0].setAttribute('title', this.label);
        }
    }
    this.subtitle && this.subtitle_field.html(this.subtitle);
}

frappe.views.Workspace.prototype.make_sidebar = function() {
    this.build_sidebar_section("category", frappe.boot.sidebar_items);
}

frappe.views.Workspace.prototype.build_sidebar_section = function(title, items) {
        let sidebar_section = $(`<div class="standard-sidebar-section"></div>`);

        // DO NOT REMOVE: Comment to load translation
        // __("Modules") __("Domains") __("Places") __("Administration")
        $(`<div class="standard-sidebar-label">${__(title)}</div>`).appendTo(sidebar_section);

        const avatar = `<a href="/app/user" class="standard-sidebar-item " style="border-bottom: 1px solid #eee;">
                        <span>
                            <img src= "${ frappe.boot.user_info[frappe.session.user].image ? frappe.boot.user_info[frappe.session.user].image : "/assets/mosyerdesign/img/avatar-alt.jpg" }"
                            / >
                        </span>
                        <span class="sidebar-item-label"> ${ frappe.session.user_fullname }<span>
                        <p class="text-muted" style="font-size: 12px; margin-bottom:0"> ${frappe.session.user_email}</p>
                    </a>`;
        const supportImg = `<div class="text-center support-img"> 
                            <img src="/assets/mosyerdesign/img/support.jpg" alt="support image" style="width: 200px; height: 180px"
                        </div>
                        `
        let sett = ""
            // User Settings Options 
        frappe.boot.navbar_settings.settings_dropdown.forEach(item => {
            if (!item.hidden) {
                if (item.route) {
                    sett += `<a class="dropdown-item" href="${ item.route }"> ${__(item.item_label)} </a>`
                }
                if (item.action) {
                    sett += `<a class="dropdown-item" onclick="return ${item.action }"> ${__(item.item_label)} </a>`
                } else {
                    sett += `<div class="dropdown-divider"></div>`
                }
            }
        })
        const userSettings = `
                        <div class="nav-item dropdown dropdown-navbar-user dropdown-mobile mb-2">
                            <a class="nav-link" style="padding-left:12px; margin-top: 10px;" data-toggle="dropdown"
                            href="#" onclick="return false;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-three-dots"
                                    viewBox="0 0 16 16">
                                    <path
                                        d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                                </svg>
                                <span class="ml-2 settings" style="font-size: 18px;">${__("Settings")}</span>
                            </a>
                            
                            <div class="dropdown-menu dropdown-menu-right" id="toolbar-user" role="menu" style="max-height: 300px; overflow-y: auto;">
                                ${sett}
                            </div>
                        </div>
                        `
        const userAccount = `
                         <a class="nav-link nav-user-account" href="${frappe.boot.navbar_settings.settings_dropdown[0].route }">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-person-lines-fill" viewBox="0 0 16 16">
                                <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/>
                            </svg>
                            <span class="ml-2 user-account" style="font-size: 18px;">${__("My Account")}</span>
                        </a>
                        `
        const toggleBtn = `
                        <a class="toggler-btn text-muted">
                            <img src="/assets/mosyerdesign/img/toggler.svg" />
                            <span class="sidebar-item-label" style="font-size:13px !important; margin-left: 10px; font-weight:600;transition: all .3s ease-in-out !important;">${__("Toggle sidebar")}</span>
                        </a>
                        `
        sidebar_section.prepend(avatar)
        $(".overlay-sidebar").append(userSettings)
        $(".overlay-sidebar").append(supportImg)
        $(".overlay-sidebar").append(userAccount)
        $(".overlay-sidebar").append(toggleBtn)

        const get_sidebar_item = function(item) {
                return $(`
			<div class="side-item">
				<div class="flex align-items-center">
					<a href="#" style="flex:1" class="desk-sidebar-item standard-sidebar-item dropdown-btn" >
						<span style="pointer-events: none !important;">${frappe.utils.icon(item.icon || "folder-open", "lg")}</span>
						<span style="pointer-events: none !important;" class="sidebar-item-label">${__(item.label) || __(item.name)}<span>
					</a>
				</div>
				<div class="drop-down-menu">
					<ul class="drop-down-list"> 
						${item.child_items.map(el=>
							`<li class="flex align-items-center">
								<span class="icon">${frappe.utils.icon(el.icon || "folder-open", "md")}</span>
								<a href="/app/${el.route}" class="dropdown-item p-0" style="font-size:14px">${__(el.name)}</a>
								
							</li>`).join("")} 
					</ul>
				</div>
			</div>
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


frappe.views.Workspace.prototype.get_page_to_show = function() {
	let default_page;

	if (localStorage.current_workspace) {
		default_page = localStorage.current_workspace;
	} else if (this.workspaces) {
		default_page = this.workspaces["Modules"][0].name;
	} else if (frappe.boot.allowed_workspaces) {
		default_page = frappe.boot.allowed_workspaces[0].name;
	} else {
		default_page = "Build";
	}
	this.page_name = "Home"
	let page = frappe.get_route()[1] || default_page;
	return page == "Home"? "Home": frappe.set_route();
}

frappe.views.Workspace.prototype.get_data = function() {
	return frappe.xcall("frappe.desk.desktop.get_desktop_page", {
		page: "Home"
	}).then(data => {
		this.data = data;
		if (Object.keys(this.data).length == 0) return;

		return frappe.dashboard_utils.get_dashboard_settings().then(settings => {
			let chart_config = settings.chart_config ? JSON.parse(settings.chart_config) : {};
			if (this.data.charts.items) {
				this.data.charts.items.map(chart => {
					chart.chart_settings = chart_config[chart.chart_name] || {};
				});
			}
		});
	});
}

frappe.views.Workspace.prototype.make_page = function(page) {
    const $page = new DesktopPage({
        container: this.body,
        page_name: page
    });

    this.pages[page] = $page;
    return $page;
}

$(document).ready(function () { 
	$(".dropdown-btn").on("click", function(e){
		e.preventDefault();
		$(e.target).parent().next(".drop-down-menu").toggleClass("show-menu");
	})
 })

 class DesktopPage {
	constructor({ container, page_name }) {
		frappe.desk_page = this;
		this.container = container;
		this.page_name = 'Home';
		this.sections = {};
		this.allow_customization = false;
		this.reload();
	}

	show() {
		frappe.desk_page = this;
		this.page.show();
		if (this.sections.shortcuts) {
			this.sections.shortcuts.widgets_list.forEach(wid => {
				wid.set_actions();
			});
		}
	}

	hide() {
		this.page.hide();
	}

	reload() {
		this.in_customize_mode = false;
		this.page && this.page.remove();
		this.make();
	}

	make() {
		this.page = $(`<div class="desk-page" data-page-name=${this.page_name}></div>`);
		this.page.append(frappe.render_template('workspace_loading_skeleton'));
		this.page.appendTo(this.container);

		this.get_data().then(() => {
			if (Object.keys(this.data).length == 0) {
				delete localStorage.current_workspace;
				frappe.set_route("workspace");
				return;
			}
			this.refresh();
		}).finally(this.page.find('.workspace_loading_skeleton').remove);
	}

	refresh() {
		this.page.empty();
		this.allow_customization = this.data.allow_customization || false;

		if (frappe.is_mobile()) {
			this.allow_customization = false;
		}

		// this.data.onboarding && this.data.onboarding.items.length && this.make_onboarding();
        this.make_shortcuts();
		let has_charts = false;
		let has_latest = false;
		// this.data.latest = {
		// 	'items': ['a', 'b']
		// }

		if(this.data && this.data.charts && this.data.charts.items && this.data.charts.items.length > 0) has_charts = true
		if(this.data && this.data.latest && this.data.latest.items && Object.keys(this.data.latest.items).length > 0) has_latest = true

		if(has_charts && has_latest) this.page.append(`<div class="row"><div class="col-md-4 latest-parent"></div><div class="col-md-8 charts-parents"></div></div>`)
		
		if(has_charts && !has_latest) this.page.append(`<div class="row"><div class="col-md-12 charts-parents"></div></div>`)
		if(!has_charts && has_latest) this.page.append(`<div class="row"><div class="col-md-12 latest-parent"></div></div>`)
		
		this.make_charts();
		this.make_latest()
		// this.make_cards();
	}

	get_data() {
		return frappe.xcall("frappe.desk.desktop.get_desktop_page", {
			page: 'Home'
		}).then(data => {
			this.data = data;
			if (Object.keys(this.data).length == 0) return;

			return frappe.dashboard_utils.get_dashboard_settings().then(settings => {
				let chart_config = settings.chart_config ? JSON.parse(settings.chart_config) : {};
				if (this.data.charts.items) {
					this.data.charts.items.map(chart => {
						chart.chart_settings = chart_config[chart.chart_name] || {};
					});
				}
			});
		});
	}

	customize() {
		if (this.in_customize_mode) {
			return;
		}
		// We need to remove this as the  chart group will be visible during customization
		$('.widget.onboarding-widget-box').hide();

		Object.keys(this.sections).forEach(section => {
			this.sections[section].customize();
		});
		this.in_customize_mode = true;

	}

	save_customization() {
		frappe.dom.freeze();
		const config = {};

		if (this.sections.charts) config.charts = this.sections.charts.get_widget_config();
		if (this.sections.shortcuts) config.shortcuts = this.sections.shortcuts.get_widget_config();
		if (this.sections.cards) config.cards = this.sections.cards.get_widget_config();

		frappe.call('frappe.desk.desktop.save_customization', {
			page: 'Home',
			config: config
		}).then(res => {
			frappe.dom.unfreeze();
			if (res.message) {
				frappe.show_alert({ message: __("Customizations Saved Successfully"), indicator: "green" });
				this.reload();
			} else {
				frappe.throw({ message: __("Something went wrong while saving customizations"), indicator: "red" });
				this.reload();
			}
		});
	}

	reset_customization() {
		frappe.call('frappe.desk.desktop.reset_customization', {
			page: 'Home'
		}).then(() => {
			frappe.show_alert({ message: __("Removed page customizations"), indicator: "green" });
			this.reload();
		});
	}

	make_onboarding() {
		this.onboarding_widget = frappe.widget.make_widget({
			label: this.data.onboarding.label || __("Let's Get Started"),
			subtitle: this.data.onboarding.subtitle,
			steps: this.data.onboarding.items,
			success: this.data.onboarding.success,
			docs_url: this.data.onboarding.docs_url,
			user_can_dismiss: this.data.onboarding.user_can_dismiss,
			widget_type: 'onboarding',
			container: this.page,
			options: {
				allow_sorting: false,
				allow_create: false,
				allow_delete: false,
				allow_hiding: false,
				allow_edit: false,
				max_widget_count: 2,
			}
		});
	}

	make_charts() {
		this.sections["charts"] = new frappe.widget.WidgetGroup({
			container: this.page.find('.charts-parents'),
			type: "chart",
			columns: 1,
			class_name: "widget-charts",
			options: {
				allow_sorting: this.allow_customization,
				allow_create: this.allow_customization,
				allow_delete: this.allow_customization,
				allow_hiding: false,
				allow_edit: true,
				max_widget_count: 4,
			},
			widgets: this.data.charts.items || []
		});
	}
	make_latest(){
		this.page.find('.latest-parent').empty()
		Object.keys(this.data.latest.items).forEach(key => {
			console.log(key)
			let parent = $(`<div class="widget widget-shadow dashboard-widget-box" style="margin-top: 8px;">
				<div class="widget-head">
					<div>
						<div class="widget-title ellipsis" title="Clinical Procedures">${__(key)}</div>
					</div>
				</div>
				<div class="widget-body shorts-links"></div>
			</div>`)
			new frappe.widget.WidgetGroup({
				title: '',
				container: parent.find('.shorts-links'),
				type: "shortcut",
				class_name: "widget-shortcuts-latest",
				columns: 1,
				options: {},
				widgets: this.data.latest.items[`${key}`] || []
			});
			this.page.find('.latest-parent').append(parent)
		})
	}

	make_shortcuts() {
		this.sections["shortcuts"] = new frappe.widget.WidgetGroup({
			title: this.data.shortcuts.label || __('Your Shortcuts'),
			container: this.page,
			type: "shortcut",
            class_name: "widget-shortcuts",
			columns: 3,
			options: {
				allow_sorting: this.allow_customization,
				allow_create: this.allow_customization,
				allow_delete: this.allow_customization,
				allow_hiding: false,
				allow_edit: true,
			},
			widgets: this.data.shortcuts.items || []
		});
	}

	make_cards() {
		// let cards = new frappe.widget.WidgetGroup({
		// 	title: this.data.cards.label || __("Reports & Masters"),
		// 	container: this.page,
		// 	type: "links",
		// 	columns: 3,
		// 	options: {
		// 		allow_sorting: this.allow_customization,
		// 		allow_create: false,
		// 		allow_delete: false,
		// 		allow_hiding: this.allow_customization,
		// 		allow_edit: false,
		// 	},
		// 	widgets: this.data.cards.items
		// });

		// this.sections["cards"] = cards;
        this.sections["cards"] = []
	}
}