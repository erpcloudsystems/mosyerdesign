
frappe.ui.Page.prototype.add_main_section = function(){
    $(frappe.render_template("page", {})).appendTo(this.wrapper);
        let pageActions = `
                            <div class="container-fluid flex page-actions row my-4 justify-content-between">
                                <div class="col-md-2 col-xs-4 flex fill-width title-area">
                                    <h3 class="ellipsis title-text"></h3>
                                </div>
                                <div class="col-md-5 col-xs-6 flex widget-boxs justify-content-between"></div>
                                <!-- buttons -->
                                <div class="col-md-4 col-xs-12 actions-btn flex justify-content-end">
                                    <div class="custom-actions hide hidden-xs hidden-md"></div>
                                    <div class="standard-actions flex">
                                        <span class="page-icon-group hide hidden-xs hidden-sm"></span>
                                        <div class="menu-btn-group hide">
                                            <button type="button" class="btn btn-default icon-btn" data-toggle="dropdown"
                                                aria-expanded="false">
                                                <span>
                                                    <span class="menu-btn-group-label">
                                                        <svg class="icon icon-sm">
                                                            <use xlink:href="#icon-dot-horizontal">
                                                            </use>
                                                        </svg>
                                                    </span>
                                                </span>
                                            </button>
                                            <ul class="dropdown-menu dropdown-menu-right" role="menu"></ul>
                                        </div>
                                        <button class="btn btn-secondary btn-default btn-sm hide"></button>
                                        <div class="actions-btn-group hide">
                                            <button type="button" class="btn btn-primary btn-sm" data-toggle="dropdown"
                                                aria-expanded="false">
                                                <span class="hidden-xs">
                                                    <span class="actions-btn-group-label">${__("Actions") }</span>
                                                    <svg class="icon icon-xs">
                                                        <use xlink:href="#icon-select">
                                                        </use>
                                                    </svg>
                                                </span>
                                            </button>
                                            <ul class="dropdown-menu dropdown-menu-right" role="menu">
                                            </ul>
                                        </div>
                                        <button class="btn btn-primary btn-sm hide primary-action"></button>
                                    </div>
                                </div>
                            </div>
                            `
        if (this.single_column) {
            // nesting under col-sm-12 for consistency
            this.add_view("main", `<div class="row layout-main">
					<div class="col-md-12 layout-main-section-wrapper">
                        ${pageActions}
						<div class="layout-main-section"></div>
						<div class="layout-footer hide"></div>
					</div>
				</div>`);
        } else {
            this.add_view("main", `
				<div class="row layout-main">
					<div class="col-lg-2 layout-side-section"></div>
					<div class="col layout-main-section-wrapper">
                        ${pageActions}
						<div class="layout-main-section"></div>
						<div class="layout-footer hide"></div>
					</div>
				</div>
			`);
        }
        this.setup_page();
}

frappe.views.Container.prototype.change_to = function(label) {
    cur_page = this;
    if(this.page && this.page.label === label) {
        $(this.page).trigger('show');
    }
    var me = this;
    if(label.tagName) {
        // if sent the div, get the table
        var page = label;
    } else {
        var page = frappe.pages[label];
    }
    if(!page) {
        console.log(__('Page not found')+ ': ' + label);
        return;
    }
    // hide dialog
    if(window.cur_dialog && cur_dialog.display && !cur_dialog.keep_open) {
        if (!cur_dialog.minimizable) {
            cur_dialog.hide();
        } else if (!cur_dialog.is_minimized) {
            cur_dialog.toggle_minimize();
        }
    }
    // hide current
    if(this.page && this.page != page) {
        $(this.page).hide();
        $(this.page).trigger('hide');
    }
    // show new
    if(!this.page || this.page != page) {
        this.page = page;
        // $(this.page).fadeIn(300);
        $(this.page).show();
    }
    $(document).trigger("page-change");

    this.page._route = frappe.router.get_sub_path();
    $(this.page).trigger('show');
    !this.page.disable_scroll_to_top && frappe.utils.scroll_to(0);
    frappe.breadcrumbs.update();

    let currentDoc = frappe.get_route()[1]
        let listCurrentDoc = frappe.get_route()[0]
        if (currentDoc == 'Employee' && listCurrentDoc == 'List'){
            async function totalInactive(status) {
                let total = await frappe.db.get_list('Employee', {filters:{'status': status}})
                let template = `
                                <div class="status-box ${status == 'Active'? 'active-status': status == 'Inactive'? 'inactive-status': status == 'On Leave'? 'leave-status': 'bg-yellow'}" >
                                    <div> 
                                        <p style="font-size: 16px;font-weight: 600;">${__(status)} </p>
                                        <p style="font-size: 18px; font-weight: 800;"> ${total.length} </p>
                                    </div>
                                    <div class="status-box-body flex align-items-center justify-content-around">
                                        <svg style="margin-left:15px;" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                                        </svg>
                                    </div>
                                </div>
                                `
                $('.widget-boxs').prepend(template)
            }
            totalInactive('Active')
            totalInactive('Inactive')
            totalInactive('Left')
        }else{
            $('.widget-boxs').empty();
        }

    return this.page;
}