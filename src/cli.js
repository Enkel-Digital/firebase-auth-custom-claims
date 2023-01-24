import { cli } from "cleye";

// Parse Argv and export it
export const argv = cli({
  name: "firebase-auth-custom-claims",

  // Define parameters
  parameters: [
    // Required parameter
    // Cannot write serviceAccountKey.json since it will error on '.'
    // "<path/to/serviceAccountKey.json>",
    "<serviceAccountKey path>",

    "<path to claims json file>",

    // Allow a list of emails to be set
    "<emails...>",
  ],

  // Define flags
  flags: {
    // Use -V to run in verbose mode
    verbose: {
      type: Boolean,
      alias: "V",
    },
  },

  help: {
    usage: [
      "SetFirebaseAuthClaims path/to/serviceAccountKey.json path/to/customClaims.json userAccountEmailOne@example.com userAccountEmailTwo@example.com",
    ],
  },
});
