function update_materialize_inputs() {
    $('select').formSelect();
    M.updateTextFields();
}

/**
 * @param data:
 * {
 *     origin: __,
 *     type: __,
 *     route: [NUMBER],
 *     json: __
 * }
 */
function set_inputs_by_selection(data) {
    let request_route_field = $("#request_route");

    if (String(request_route_field.val()) !== String(data.route)) {
        request_route_field.val(data.route);
    }
    $("#request_type").val(data.type);
    $("#origin_target").val(data.origin);
    editor.setValue(JSON.stringify(data.json, null, 2), -1);
    update_materialize_inputs();
}

function request_route_changed() {
    let current_value = $("#request_route").val();
    let current_data = db.routes[Number(current_value)];

    let data = {
        origin: current_data.origin,
        type: current_data.type.toLowerCase(),
        route: current_value,
        json: current_data.default_json
    };
    set_inputs_by_selection(data);
}

function restore_request(cookies_list_name, number) {
    let selected_request = db[cookies_list_name][number];
    let data = {
        origin: selected_request.origin,
        type: selected_request.type.toLowerCase(),
        route: selected_request.route,
        json: selected_request.json
    };
    set_inputs_by_selection(data);
    update_materialize_inputs();
}

function restore_bookmarks_and_last_requests() {
    let last_requests = $.cookie("last_requests");
    if (!last_requests) {
        $.cookie("last_requests", [])
    }
    db.last_requests = last_requests || db.last_requests;
    let last_requests_field = $("#last_requests_list");
    last_requests_field.empty();
    for (let i = 0; i < db.last_requests.length; i++) {
        last_requests_field.prepend("<li><a onclick='restore_request(\"last_requests\", " + i + ")'>" + db.routes[Number(db.last_requests[i].route)].route + "</a></li>");
    }

    let bookmarks = $.cookie("bookmarks");
    if (!bookmarks) {
        $.cookie("bookmarks", [])
    }
    db.bookmarks = bookmarks || db.bookmarks;
    let bookmarks_field = $("#bookmarks_list");
    bookmarks_field.empty();
    for (let i = 0; i < db.bookmarks.length; i++) {
        bookmarks_field.prepend("<li><a onclick='restore_request(\"bookmarks\", " + i + ")'>" + db.routes[Number(db.bookmarks[i].route)].route + "</a></li>");
    }
}

function set_cookie_list(cookies_list_name, value) {
    $.cookie(cookies_list_name, value);
    db[cookies_list_name] = value;
}

function append_request_to_cookies(cookies_list_name, request) {
    let last_requests = db[cookies_list_name];
    last_requests.push(request);
    if (cookies_list_name === "last_requests" && last_requests.length > db.lists_capacity) {
        last_requests.shift();
    }
    set_cookie_list(cookies_list_name, last_requests);
    restore_bookmarks_and_last_requests();
}

function add_to_bookmarks() {
    let current_value = $("#request_route").val();
    let origin = $("#origin_target").val();
    let method = $("#request_type").val();
    let data = editor.getValue() ? JSON.parse(editor.getValue()) : "";
    if (!origin || !current_value || !method) {
        alertify.error("Please fill the request fields.");
        return false;
    }
    append_request_to_cookies('bookmarks', {
        route: current_value,
        origin: origin,
        type: method,
        json: data
    });
}

function send_request() {
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

    append_request_to_cookies('last_requests', {
        route: current_value,
        origin: origin,
        type: method,
        json: data
    });

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

    $.ajax(ajax_request_data)
}