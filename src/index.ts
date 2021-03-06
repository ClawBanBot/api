import * as dotenv from "dotenv";
dotenv.config();

import "./data";

import { Bot } from "./bot";
const bot = new Bot();

import config from "./config";
import app from "./http";
app.set("bot", bot);
app.set("config", config);
