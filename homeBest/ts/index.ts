import Fade from "./Fade";
import highway from "@dogstudio/highway";

const H = new highway.Core({
  transitions: {
    default: Fade,
  },
});
