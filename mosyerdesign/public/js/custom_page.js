frappe.ui.Page.prototype.add_main_section = function(){
        $(frappe.render_template("page", {})).appendTo(this.wrapper);
        if (this.single_column) {
            // nesting under col-sm-12 for consistency
            this.add_view("main", '<div class="row layout-main">\
					<div class="col-md-12 layout-main-section-wrapper">\
						<div class="layout-main-section"></div>\
						<div class="layout-footer hide"></div>\
					</div>\
				</div>');
        } else {
            this.add_view("main", `
				<div class="row layout-main">
					<div class="col-lg-2 layout-side-section"></div>
					<div class="col layout-main-section-wrapper">
                        <div class="flex page-actions justify-content-end bg-white my-2 pr-2" style="height: 50px; border-radius: 8px;box-shadow: 0px 1px 2px rgba(25,39,52,0.05), 0px 0px 4px rgba(25,39,52,0.1)"> 
                        <!-- buttons -->
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
                                            <span class="actions-btn-group-label">{%= __("Actions") %}</span>
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
						<div class="layout-main-section"></div>
						<div class="layout-footer hide"></div>
					</div>
				</div>
			`);
        }
        this.setup_page();
}