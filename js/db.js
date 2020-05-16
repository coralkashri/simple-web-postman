var db = {
  routes: [
    {
      origin: "localhost:8080",
      route: "performAction/initParams",
      type: "POST",
      default_json: JSON.stringify({
        test: "test"
      }, null, 2)
    }, {
      origin: "https://materializecss.com/text-inputs.html",
      route: "Experimental",
      type: "GET",
      default_json: JSON.stringify({
        test: "test"
      }, null, 2)
    }
  ]
};