import { app } from "./index";

app.listen(process.env.PORT || 8888, () => console.log("server is running port 8888"));
