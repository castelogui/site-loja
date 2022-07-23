import { app } from "./index";

const port = process.env.PORT || 8888;

app.listen(port, () => {
  console.log("server is running port 8888");
});
