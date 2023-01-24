import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

import { loadJSON } from "./loadJSON.js";

export const createAuth = async (serviceAccountKeyPath) =>
  loadJSON(serviceAccountKeyPath)
    .then((account) => initializeApp({ credential: cert(account) }))
    .then(getAuth);
