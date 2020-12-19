import { ContentModeratorClient } from "@azure/cognitiveservices-contentmoderator";
import { CognitiveServicesCredentials } from "@azure/ms-rest-azure-js";

export default class Moderator {
  cognitive_client: ContentModeratorClient;

  constructor() {
    const contentModeratorKey = process.env.CONTENT_MODERATOR_KEY;
    const contentModeratorEndPoint = process.env.CONTENT_MODERATOR_ENDPOINT;

    const cognitiveServiceCredentials = new CognitiveServicesCredentials(
      contentModeratorKey
    );
    this.cognitive_client = new ContentModeratorClient(
      cognitiveServiceCredentials,
      contentModeratorEndPoint
    );
  }

  async checkMessage(message: string) {
    const result = await this.cognitive_client.textModeration.screenText(
      "text/plain",
      message,
      { classify: true }
    );

    return result.classification;
  }
}
