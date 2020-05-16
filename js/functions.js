function request_route_changed() {
    let current_value = $("#request_route").val();
    let current_data = db.routes[Number(current_value)];
    $("#request_type").val(current_data.type.toLowerCase());
    $("#origin_target").val(current_data.origin);
    editor.setValue(current_data.default_json, -1);
    $('select').formSelect();
    M.updateTextFields();
}

function send_request() {
    let current_value = $("#request_route").val();
    let request_route = db.routes[Number(current_value)].route;
    $.ajax({
        method: $("#request_type").val(),
        url: $("#origin_target").val() + '/' + request_route,
        data: JSON.parse(editor.getValue()),
        success: (data, textStatus, request) => {
        },
        error: (data, textStatus, request) => {
        },
        complete: (data, textStatus, request) => {
            let response_area = $("#response");
            let response = moment().format('DD/MM/YYYY HH:mm:ss') + " Status: " + textStatus + " - " + data.status + "\n\n";
            response += data.responseText;
            response_area.val(response);
            M.updateTextFields();
            M.textareaAutoResize(response_area);
        }
    })
}