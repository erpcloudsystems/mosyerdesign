frappe.listview_settings['Employee'] = {
    get_indicator: function (doc) {
        if (doc.status === "Active") {
            return [__("Active"), "green", "status,=,Active"];

        } else if (doc.status === "Iactive") {
            return [__("Iactive"), "dark", "status,=,Iactive"];

        } else if (doc.status === "Suspended") {
            return [__("Suspended"), "red", "status,=,Suspended"];
        } 
    },
    onload: function (listview) {}
};