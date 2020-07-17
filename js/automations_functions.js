function new_automation_form() {

}

function test_request() {
    let current_value = $("#request_route").val();
    let origin = $("#origin_target").val();
    let request_route = db.routes[Number(current_value)].route;
    let method = $("#request_type").val();
    let data = editor.getValue() ? JSON.parse(editor.getValue()) : "";
    request_route = "http://" + origin + '/' + request_route;

    if (!origin || !current_value || !method) {
        alertify.error("Please fill the request fields.");
        return false;
    }

    let ajax_request_data = {
        method: method,
        url:  request_route,
        data: data,
        success: (data, textStatus, request) => {
        },
        error: (data, textStatus, request) => {
        },
        complete: (data, textStatus, request) => {
            let response_area = $("#response");
            let response = moment().format('DD/MM/YYYY HH:mm:ss') + " Status: " + textStatus + " - " + data.status + "\n\n";
            if (!data.responseText) data.responseText = "No Server Response";
            response += data.responseText;
            response_area.val(response);
            M.updateTextFields();
            M.textareaAutoResize(response_area);
        }
    };

    if (method.toLowerCase() === "get") {
        ajax_request_data.params = data;
    } else {
        ajax_request_data.data = $.param(data);
    }

    $.ajax(ajax_request_data);
}

function change_new_automation_action() {

}

function add_automation_action(number = 0) {
    // TODO update template id's by number
    let templates = [
        $("#template_automation_action_type_selection"),
        $("#template_automation_stop_condition_action"),
        $("#template_automation_sleep_action"),
        $("#template_automation_request_action"),
        $("#template_automation_add_action_button")
    ];


}