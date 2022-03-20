$(document).ready(function(){
    $('a.toggler-btn').on('click', (e) => {
        $('.layout-side-section').toggleClass('toggle-sidebar');
        $('.sidebar-item-label').toggleClass('hidden');
        $('.user-account').toggleClass('hidden');
        $('.settings').toggleClass('hidden');
        $('.support-img').toggleClass('hidden');
        $('.toolbar-user').toggleClass('user-settings-list');
    });
    
    if (frappe.boot.home_shortcuts.length > 0){
        $('.layout-main-section').prepend(`<div class="shortcut-boxes mb-4"> </div>`)
        frappe.boot.home_shortcuts.forEach(el => {
            make_shortcuts(el.title, el.count, el.icon)
        });
        function make_shortcuts(title, count, icon){
            let template = `
                            <div class="status-box bg-purple">
                                <div> 
                                    <p>${title} </p>
                                    <p style="font-size: 18px; font-weight: 800;"> ${count} </p>
                                </div>
                                <div class="status-box-body flex align-items-center justify-content-around">
                                    <svg style="margin-left:15px; width:40px; height: 40px" class="icon icon-md">
                                    <use class="" href="#icon-${icon}"></use>
                                    </svg>
                                </div>
                            </div>
                            `
        $('.shortcut-boxes').append(template)
        }
    }
    async function getEmployeeAttendance(){
        let employees = await frappe.db.get_list('Employee', {filters:{'status': 'Active'}})
        let totalEmpPresent = await frappe.db.get_list('Attendance', {filters:{'status':'Present', 'attendance_date':frappe.datetime.now_date()}})
        let absent = await frappe.db.get_list('Attendance', {filters:{'status':'Absent', 'attendance_date':frappe.datetime.now_date()}})
        let earlyLeave = await frappe.db.get_list('Attendance', {filters:{'status':'Present', 'attendance_date':frappe.datetime.now_date(), 'early_exit':1}})
        let late = await frappe.db.get_list('Attendance', {filters:{'status':'Present', 'attendance_date':frappe.datetime.now_date(), 'late_entry':1}})
        let early = await frappe.db.get_list('Attendance', {filters:{'status':'Present', 'attendance_date':frappe.datetime.now_date(), 'late_entry':0, 'early_exit':0}})
        let totalPresent = `<p style="font-weight: 500"> ${totalEmpPresent.length} Employees Attended out of ${employees.length} </p>`
        let absentBtn =  `<button class="btn btn-danger btn-sm"> Absent <span class="count"> ${absent.length}</span></button>`
        let earlyLeaveBtn = `<button class="btn btn-secondary btn-sm"> Early Leave <span class="count"> ${earlyLeave.length}</span></button>`
        let lateBtn = `<button class="btn btn-warning btn-sm"> Late <span class="count"> ${late.length}</span></button>`
        let earlyBtn = `<button class="btn btn-success btn-sm"> Early <span class="count"> ${early.length}</span></button>`
        
        $('.attendance-head').append(totalPresent)
        $('.attendance-state').append(earlyBtn)
        $('.attendance-state').append(absentBtn)
        $('.attendance-state').append(lateBtn)
        $('.attendance-state').append(earlyLeaveBtn)
        
    }
    getEmployeeAttendance()

    let attendanceState = ` <div class="container-fluid row main-content">
                                <div class="notification-content bg-white col-lg-8 col-xs-12" style="border-radius: 6px; margin-top: 10px;">
                                    <div class="attendance-head pb-2"> </div>
                                    <div class="attendance-state flex align-items-center justify-content-between"> </div>
                                    <div class="attendance-notification" style="position: relative;border-radius: 6px; border: 1px solid #eee; margin-top: 10px; padding:10px;  box-shadow: 0px 0px 9px rgb(0 0 0 / 7%);">
                                        <span class="remove" style="position: absolute; right:5px; cursor: pointer;"> 
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x notification-close" viewBox="0 0 16 16">
                                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                            </svg>
                                        </span>
                                        <div> 
                                            <h5> Arrived Erly ... </h5>
                                            <h6 class="pt-2"> <span class="text-muted">Date at :</span> ${frappe.datetime._date('YYYY-MMMM-DD')} </h6>
                                            <div class="user mt-4"> 
                                                <a href="/app/user/${frappe.session.user_email}" class="mt-2" style="text-decoration: none;">
                                                    <span>
                                                        <img src= "${ frappe.boot.user_info[frappe.session.user].image ? frappe.boot.user_info[frappe.session.user].image : '/assets/mosyerdesign/img/avatar-alt.jpg' }"
                                                        style="width: 30px; border-radius: 50%; margin-right: 27px"/ >
                                                    </span>
                                                    <span class="sidebar-item-label"> ${ frappe.session.user_fullname }<span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `
    let chartsContainer = `<div class="chart-content col-lg-4 col-xs-12"></div>`
    $('.layout-main-section').append(attendanceState)
    $('.main-content').append(chartsContainer)
  
    // Render Charts
      async function get_chart(){
        let charts = await frappe.db.get_list('Home Chart Table', {fields:['chart']})
        charts.forEach(chart => {
            $('.chart-content').append(
                new frappe.widget.WidgetGroup({
                    container: $('.chart-content'),
                    type: "chart",
                    columns: 1,
                    class_name: "widget-charts",
                    hidden: false,
                    options: {
                        allow_sorting: false,
                        allow_create: false,
                        allow_delete: false,
                        allow_hiding: false,
                        allow_edit: false,
                        max_widget_count: 2,
                    },
                    widgets: [{
                        "chart_name": chart.chart,
                        "label": chart.chart
                    }]
                })
            )
        })
    }
    get_chart()

    $('.notification-close').on('click', function(e){
        $(this).parent().parent().remove()
    })
})
