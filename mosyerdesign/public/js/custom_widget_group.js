frappe.widget.WidgetGroup.prototype.make_container = function(){
    const widget_area = $(`<div class="widget-group ${this.class_name || ''}">
                                <div class="widget-group-head">
                                    <div class="widget-group-title"></div>
                                    <div class="widget-group-control"></div>
                                </div>
                                <div class="widget-group-body"> </div>
                            </div>`);
    this.widget_area = widget_area;
    if (this.hidden) this.widget_area.hide();
    this.title_area = widget_area.find(".widget-group-title");
    this.control_area = widget_area.find(".widget-group-control");
    this.body = widget_area.find(".widget-group-body");
    !this.widgets.length && this.widget_area.hide();
    widget_area.appendTo(this.container);
}