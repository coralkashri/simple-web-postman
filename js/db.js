var db = {
  routes: [
    /*{
      origin: "localhost:8080",
      route: "performAction/initParams",
      type: "POST",
      default_json: {
        test: "test"
      }
    }, {
      origin: "https://materializecss.com/text-inputs.html",
      route: "Experimental",
      type: "GET",
      default_json: {
        test: "test"
      }
    }, {
      origin: "localhost:8080",
      route: "SuccessExample",
      type: "POST",
      default_json: {}
    }, {
      origin: "localhost:8080",
      route: "SuccessExample",
      type: "GET",
      default_json: {}
    }, {
      origin: "localhost:8080",
      route: "BadRequest",
      type: "GET",
      default_json: {}
    }, {
      origin: "localhost:8080",
      route: "GeneralError",
      type: "POST",
      default_json: {}
    }, {
      origin: "localhost:8080",
      route: "CloseServer",
      type: "POST",
      default_json: {}
    }*/
    {
      origin: "localhost:8080",
      route: "system_health_monitor_allocate_mission",
      type: "POST",
      default_json: {
        "leader_id": 5,
        "self_id": 10,
        "dependencies": [11, 12, 13, 14]
      }
    }, {
      origin: "localhost:8080",
      route: "system_health_monitor_release_mission",
      type: "POST",
      default_json: {
        "leader_id": 5
      }
    }, {
      origin: "localhost:8080",
      route: "system_health_monitor_is_id_accessible",
      type: "GET",
      default_json: {
        "leader_id": 5
      }
    }, {
      origin: "localhost:8080",
      route: "system_health_monitor_change_mission_state",
      type: "POST",
      default_json: {
        "leader_id": 5,
        "state": 2
      }
    },
  ],
  bookmarks: [],
  last_requests: [],
  last_requests_capacity: 10 // 0 -> infinity
};