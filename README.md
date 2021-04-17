# Simple Web Postman
Web application for postman tool.<br>
No server needed - Just open views/index.html.<br>
DB is located in file: `public/js/example_db.js`.<br>
**Compatible with offline systems**

## Run with server (using nodejs)
```
npm install
node index.js
```

### Cookies
To enable cookies feature you have to upload those files to your server and communicate with it using `your_server_ip:port/index.html`.
Or use the nodejs example server and access it using `localhost:3000/`.

## Configuration
In views/index.html & views/index.ejs & views/automations.html include the relevant example_db.js script.