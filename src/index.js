import { argv } from "./cli.js";
import { createAuth } from "./createFirebaseAuthService.js";

import { loadJSON } from "./loadJSON.js";
import { createSetClaimsWithEmail } from "./setClaims.js";

/** Create firebase auth service */
const auth = await createAuth(argv._.serviceAccountKeyPath);

/** Load the JSON file that defines all the custom claims to place on the JWTs */
const claimsFile = await loadJSON(argv._.pathToClaimsJsonFile);

/**
 * Create a partially applied function that will add the specified
 * claims to a given user account (using their email).
 */
const addClaim = createSetClaimsWithEmail(auth, claimsFile);

// Call the `addClaim` function for each of the emails provided
// in an asynchronous and out of sequence manner, and wait for
// all of them to complete before moving on.
Promise.all(argv._.emails.map(addClaim))
  .then(() => console.log("\nCLI Complete..."))
  .catch((err) => {
    console.error("Failed to set claims...");
    console.error(err);
  });
