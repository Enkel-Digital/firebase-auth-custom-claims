import { join } from "path";
import { pathToFileURL } from "url";

export const loadJSON = async (path) =>
  import(pathToFileURL(join(process.cwd(), path)).toString(), {
    assert: { type: "json" },
  })
    // JSON will be loaded onto `default` property, but it cannot be
    // returned directly since `default` is a keyword too, therefore
    // it must be renamed before it is used as the return value.
    .then(({ default: key }) => key);
