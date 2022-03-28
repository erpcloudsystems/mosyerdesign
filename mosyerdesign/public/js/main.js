$(document).ready(function(){
    let box = $('div.dashboard-widget-box')
    $('.chart-content').append(box)
    $('body').addClass('anvil-custom-theme')
    $('a.toggler-btn').on('click', (e) => {
        $('.layout-side-section').toggleClass('toggle-sidebar');
        $('.sidebar-item-label').toggleClass('hidden');
        $('.user-account').toggleClass('hidden');
        $('.settings').toggleClass('hidden');
        $('.support-img').toggleClass('hidden');
        $('.toolbar-user').toggleClass('user-settings-list');
    });

    // async function getEmployeeAttendance(){
    //     let employees = await frappe.db.get_list('Employee', {filters:{'status': 'Active'}})
    //     let totalEmpPresent = await frappe.db.get_list('Attendance', {filters:{'status':'Present', 'attendance_date':frappe.datetime.now_date()}})
    //     let absent = await frappe.db.get_list('Attendance', {filters:{'status':'Absent', 'attendance_date':frappe.datetime.now_date()}})
    //     let earlyLeave = await frappe.db.get_list('Attendance', {filters:{'status':'Present', 'attendance_date':frappe.datetime.now_date(), 'early_exit':1}})
    //     let late = await frappe.db.get_list('Attendance', {filters:{'status':'Present', 'attendance_date':frappe.datetime.now_date(), 'late_entry':1}})
    //     let early = await frappe.db.get_list('Attendance', {filters:{'status':'Present', 'attendance_date':frappe.datetime.now_date(), 'late_entry':0, 'early_exit':0}})
    //     let totalPresent = `<p style="font-weight: 500"> ${totalEmpPresent.length} Employees Attended out of ${employees.length} </p>`
    //     let absentBtn =  `<button class="btn btn-danger btn-sm"> Absent <span class="count"> ${absent.length}</span></button>`
    //     let earlyLeaveBtn = `<button class="btn btn-secondary btn-sm"> Early Leave <span class="count"> ${earlyLeave.length}</span></button>`
    //     let lateBtn = `<button class="btn btn-warning btn-sm"> Late <span class="count"> ${late.length}</span></button>`
    //     let earlyBtn = `<button class="btn btn-success btn-sm"> Early <span class="count"> ${early.length}</span></button>`
        
    //     $('.attendance-head').append(totalPresent)
    //     $('.attendance-state').append(earlyBtn)
    //     $('.attendance-state').append(absentBtn)
    //     $('.attendance-state').append(lateBtn)
    //     $('.attendance-state').append(earlyLeaveBtn)
        
    // }
    // getEmployeeAttendance()
});