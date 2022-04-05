import { log } from "./debug";
import toast from "react-hot-toast";

const show = {
  success: (str: string) => {
    toast.success(str);
    log("[success] " + str);
  },
  error: (str: string) => {
    toast.error(str);
    log("[error] " + str);
  },
  info: (str: string) => {
    toast(str);
  },
};

export default show;
