import { argv } from "./cli.js";

/**
 * Sets custom claim using user's UID, before loading the user
 * object back to print details.
 */
export const createSetClaims = (auth, claims) => async (uid) =>
  auth
    .setCustomUserClaims(uid, claims)
    .then(async () => {
      // Only load user object back and print if user using the verbose flag
      if (argv.flags.verbose) {
        const user = await auth.getUser(uid);
        console.log(user.uid, user.email, user.customClaims);
      }
    })
    .catch(console.error);

export function createSetClaimsWithEmail(auth, claims) {
  // Create setClaims first with the given claims and hold it in the
  // inner function's closure to reuse this.
  const setClaims = createSetClaims(auth, claims);

  return async (userEmail) =>
    auth
      .getUserByEmail(userEmail)
      .then(({ uid }) => setClaims(uid))
      .catch(console.error);
}
