
frappe.utils.icon = function(icon_name, size="sm", icon_class="", icon_style="", svg_class="") {
    let size_class = "";
    if (typeof size == "object") {
        icon_style += ` width: ${size.width}; height: ${size.height}`;
    } else {
        size_class = `icon-${size}`;
    }
    const faws_style = `${icon_name}`.startsWith('faws-') ? "fill: #171717;" : ""
    icon_style += faws_style
    return `<svg class="icon ${svg_class} ${size_class} ${icon_name}" style="${icon_style}">
        <use class="${icon_class}" href="#icon-${icon_name}"></use>
    </svg>`;
}