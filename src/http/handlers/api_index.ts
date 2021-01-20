import { Request, Response } from "express";

export default (_req: Request, res: Response) => {
  res.json({
    "/auth_link": {
      get: {
        description: "Fetch the auth link",
        parameters: {
          return_url: "The URL to send the user back to after authentication",
        },
      },
    },
    "/authenticate": {
      post: {
        description: "Turn the code into a auth token",
        body: {
          code: "The single-user auth code returned by the Twitch OAuth",
        },
        parameters: {
          redirect_uri: "The URL to send the user back to after authentication",
        },
      },
    },
    "/ban_list": {
      get: {
        description: "Fetches the ban list",
        body: {},
        parameters: {},
      },
    },
    "/logout": {
      get: {
        description: "Disconnects the current users bot",
        body: {},
        parameters: {},
      },
    },
  });
};
