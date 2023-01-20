import * as uatu from "./main";
try {
    var anyGlobal = window;
    if (anyGlobal._uatu == null) {
        anyGlobal._uatu = uatu;
    }
}
catch (error) { }
export { uatu };
export { UATU } from "./main";
//# sourceMappingURL=index.js.map