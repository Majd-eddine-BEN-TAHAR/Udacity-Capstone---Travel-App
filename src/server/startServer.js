const app = require("./server");
const port = 8085;
function listening() {
  console.log(`localhost:${port}`);
}

app.listen(port, listening);
