var db = {
  routes: [
    {
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
    }
  ],
  bookmarks: [],
  last_requests: [],
  lists_capacity: 10 // 0 -> infinity
};