const app = require('express')();
const http = require('http').Server(app);

let port = process.env.PORT || 3000;
http.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
