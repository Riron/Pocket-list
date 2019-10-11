import * as functions from "firebase-functions";
import { v3beta1 } from "@google-cloud/translate";
import * as cors from "cors";

const corsHandler = cors({
  origin: [
    "https://pocket-list-ef26d.web.app",
    "https://pocket-list-ef26d.firebaseapp.com"
  ]
});

const translationClient = new v3beta1.TranslationServiceClient();
const location = "global";

export const translate = functions.https.onRequest((request, response) =>
  corsHandler(request, response, async () => {
    const text = request.body.data.text;

    if (!text) {
      response.status(400).send("Bad Request");
      return;
    }

    const gRequest = {
      parent: translationClient.locationPath(
        process.env.GCLOUD_PROJECT,
        location
      ),
      model: `projects/${process.env.GCLOUD_PROJECT}/locations/global/models/general/base`,
      contents: [text],
      mimeType: "text/plain",
      sourceLanguageCode: "en-US",
      targetLanguageCode: "fr-FR"
    };

    const [translations] = await translationClient.translateText(gRequest);
    response.json({ data: translations });
  })
);
