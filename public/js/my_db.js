// Routes DB for postman
var db = {
    routes: [
        {
            origin: "localhost:8080",
            route: "system_health_monitor_allocate_mission",
            type: "POST",
            default_json: {
                "leader_id": {
                    "id": 5,
                    "ip": "0.0.0.1"
                },
                "self_id": {
                    "id": 10,
                    "ip": "0.0.0.1"
                },
                "dependencies": [{"id": 11, "ip": "0.0.0.1"}, {"id": 12, "ip": "0.0.0.1"}, {"id": 13, "ip": "0.0.0.1"}, {"id": 14, "ip": "0.0.0.1"}]
            }
        }, {
            origin: "localhost:8080",
            route: "system_health_monitor_release_mission",
            type: "POST",
            default_json: {
                "leader_id": {
                    "id": 5,
                    "ip": "0.0.0.1"
                }
            }
        }, {
            origin: "localhost:8080",
            route: "system_health_monitor_is_id_accessible",
            type: "GET",
            default_json: {
                "leader_id": {
                    "id": 5,
                    "ip": "0.0.0.1"
                }
            }
        }, {
            origin: "localhost:8080",
            route: "system_health_monitor_change_mission_state",
            type: "POST",
            default_json: {
                "leader_id": {
                    "id": 5,
                    "ip": "0.0.0.1"
                },
                "state": 2
            }
        }, {
            origin: "localhost:8080",
            route: "system_health_monitor_failed_mission",
            type: "POST",
            default_json: {
                "id": {
                    "id": 5,
                    "ip": "0.0.0.1"
                },
                "failure_message": "Error occurred",
                "should_restart": false
            }
        }, {
            origin: "localhost:8080",
            route: "get_and_remove_failed_missions",
            type: "POST",
            default_json: {
            }
        }, {
            origin: "localhost:8080",
            route: "get_active_missions",
            type: "POST",
            default_json: {
            }
        }, {
            origin: "localhost:8080",
            route: "upload_file",
            type: "POST",
            default_json: {
            }
        }, {
            origin: "localhost:8080",
            route: "getram",
            type: "GET",
            default_json: {
            }
        }, {
            origin: "localhost:8080",
            route: "quit",
            type: "POST",
            default_json: {
            }
        }, {
            origin: "localhost:8080",
            route: "getHostname",
            type: "GET",
            default_json: {
            }
        }, {
            origin: "localhost:8080",
            route: "getIP",
            type: "GET",
            default_json: {
            }
        },
    ],
    bookmarks: [],
    last_requests: [],
    last_requests_capacity: 10 // 0 -> infinity
};
