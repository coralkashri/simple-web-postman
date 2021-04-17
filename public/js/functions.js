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
    reset_current_bookmark();
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

function reset_current_bookmark() {
    current_bookmark = -1;
    $("#bookmarks_icon").html("turned_in_not");
}

function set_current_bookmark(number) {
    current_bookmark = number;
    $("#bookmarks_icon").html("turned_in");
}

function restore_request(cookies_list_name, number) {
    let selected_request = db[cookies_list_name][number];
    if (cookies_list_name === "bookmarks") set_current_bookmark(number);
    else reset_current_bookmark();
    let data = {
        origin: selected_request.origin,
        type: selected_request.type.toLowerCase(),
        route: selected_request.route,
        json: selected_request.json
    };
    set_inputs_by_selection(data);
    update_materialize_inputs();
}

function update_bookmarks_cookie_by_db() {
    $.cookie("bookmarks", db["bookmarks"]);
}

function change_bookmark_name(number) {
    let current_bookmark = db["bookmarks"][number];
    let new_name = window.prompt("Change bookmark name",current_bookmark.name);
    if (new_name !== null && new_name !== "") {
        db["bookmarks"][number].name = new_name;
        update_bookmarks_cookie_by_db();
        restore_bookmarks_and_last_requests();
        alertify.success("Bookmark successfully renamed.");
    }
}

function remove_bookmark(number) {
    db.bookmarks.splice(number, 1);
    update_bookmarks_cookie_by_db();
    reset_current_bookmark();
    restore_bookmarks_and_last_requests();
    alertify.success("Bookmark successfully removed.");
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
        bookmarks_field.prepend(
            "<li>" +
                "<div class='row'>" +
                    "<div class='col s6'>" +
                        "<a onclick='restore_request(\"bookmarks\", " + i + ")' style='cursor: pointer;'>" + db.bookmarks[i].name + "</a>" +
                    "</div>" +
                    "<div class='col s6'>" +
                        "<a onclick='change_bookmark_name(" + i + ");'><i class='material-icons'>edit</i></a>" +
                        "<a onclick='remove_bookmark(" + i + ");'><i class='red-text material-icons'>remove</i></a>" +
                    "</div>" +
                "</div>" +
            "</li>");
    }
}

function set_cookie_list(cookies_list_name, value) {
    $.cookie(cookies_list_name, value);
    db[cookies_list_name] = value;
}

function append_request_to_cookies(cookies_list_name, request) {
    let last_requests = db[cookies_list_name];
    last_requests.push(request);
    if (cookies_list_name === "last_requests" && last_requests.length > db.last_requests_capacity) {
        last_requests.shift();
    }
    set_cookie_list(cookies_list_name, last_requests);
    restore_bookmarks_and_last_requests();
}

function update_or_add_bookmark(data) {
    if (current_bookmark > -1) {
        // Update
        db["bookmarks"][current_bookmark] = data;
        update_bookmarks_cookie_by_db();
        alertify.success("Bookmark successfully updated.");
    } else {
        // Add
        append_request_to_cookies("bookmarks", data);
        set_current_bookmark(db["bookmarks"].length - 1);
        alertify.success("Bookmark successfully created.");
    }
    $("#bookmarks_icon").html("turned_in");
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
    update_or_add_bookmark({
        route: current_value,
        origin: origin,
        type: method,
        json: data,
        name: db.routes[Number(current_value)].route
    });
}

function update_response_area(data) {
    let response_area = $("#response");
    response_area.val(data);
    M.updateTextFields();
    M.textareaAutoResize(response_area);
}

function send_request() {
    let current_value = $("#request_route").val();
    let origin = $("#origin_target").val();
    let request_route = db.routes[Number(current_value)].route;
    let method = $("#request_type").val();
    let data = form_data != null ? form_data : editor.getValue() ? JSON.parse(editor.getValue()) : "";
    request_route = "http://" + origin + '/' + request_route;

    if (!origin || !current_value || !method) {
        alertify.error("Please fill the request fields.");
        return false;
    }

    update_response_area("Waiting for response...");

    append_request_to_cookies('last_requests', {
        route: current_value,
        origin: origin,
        type: method,
        json: data
    });

    let ajax_request_data = {
        type: method,
        url:  request_route,
        dataType: 'json',
        success: (data, textStatus, request) => {
        },
        error: (data, textStatus, request) => {
        },
        complete: (data, textStatus, request) => {
            let response = moment().format('DD/MM/YYYY HH:mm:ss') + " Status: " + textStatus + " - " + data.status + "\n\n";
            if (!data.responseText) data.responseText = "No Server Response";
            response += data.responseText;
            update_response_area(response);
        }
    };

    if (method.toLowerCase() !== "get") {
        if (form_data === null) {
            data = JSON.stringify(data);
        } else {
            ajax_request_data.contentType = false;
            ajax_request_data.processData = false;
        }
    }

    ajax_request_data.data = data;

    $.ajax(ajax_request_data);
}