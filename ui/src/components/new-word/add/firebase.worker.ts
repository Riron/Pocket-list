import * as Comlink from "comlink";
import { firebase } from "@firebase/app";
import "@firebase/functions";

const app = firebase.initializeApp({
    apiKey: "AIzaSyDkhKi-Vpn_yWGdT02jQrT_5vDvNPxBwmY",
    authDomain: "pocket-list-ef26d.firebaseapp.com",
    databaseURL: "https://pocket-list-ef26d.firebaseio.com",
    projectId: "pocket-list-ef26d",
    storageBucket: "",
    messagingSenderId: "377308402342",
    appId: "1:377308402342:web:f169aed43bdf31f1355a67",
    measurementId: "G-XG7DGZ07H1"
});

if (!firebase || !firebase.functions) {
    console.error("No functions avalilable");
}

const functions = firebase.functions!();

const translateCloudFunction = functions.httpsCallable("translate");

async function remoteTranslate(text: string, callback: Function) {
    const cfResult = await translateCloudFunction({ text });
    await callback(cfResult.data.translations[0].translatedText);
}

Comlink.expose(remoteTranslate);
