import * as uatu from "./main";

try {
  const anyGlobal = (window as any);

  if (anyGlobal._uatu == null) {
      anyGlobal._uatu = uatu;
  }
} catch (error) { }

export {uatu}

export{
  UATU
} from "./main"
