import * as express from "express";
import * as morgan from "morgan";
import * as cors from "cors";

import api_index from "./handlers/api_index";
import authenticate from "./handlers/authenticate";
import auth_link from "./handlers/auth_link";
import ban_list from "./handlers/ban_list";
import remove_ban from "./handlers/remove_ban";
import requireAdmin from "./middleware/requireAdmin";
import requireUser from "./middleware/requireUser";
import logout from "./handlers/logout";

const app = express();
app.set("view engine", "pug");
app.use(morgan(process.env.NODE_ENV === "dev" ? "dev" : "combined"));
app.use(express.json());
app.use(cors());

app.get("/", api_index);
app.get("/auth_link", auth_link);
app.post("/authenticate", authenticate);
app.get("/ban_list", [requireAdmin], ban_list);
app.get("/remove_ban", [requireAdmin], remove_ban);
app.get('/logout', [requireUser], logout);

app.listen(process.env.PORT || 5000, () => {
  console.log("🎅 Listening");
});

export default app;
