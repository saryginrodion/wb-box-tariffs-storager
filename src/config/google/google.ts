import { google } from "googleapis"

export const serviceAccountClient = (scopes: Array<string>) => {
    return new google.auth.GoogleAuth({
        keyFile: "google_credentials.json",
        scopes,
    });
}

export const sheets = async () => {
    const client = serviceAccountClient([
        "https://www.googleapis.com/auth/spreadsheets",
    ]);

    return google.sheets({
        version: "v4",
        auth: client,
    });
}
