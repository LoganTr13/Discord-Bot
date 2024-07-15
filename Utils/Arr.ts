export default class Arr {
  static get<T extends unknown>(
    context: any,
    selector: string,
    defaultValue: unknown = null
  ): T {
    const keys = String(selector).split(".");
    let obj = context;

    for (const key of keys) {
      if (!!obj && Array.isArray(obj) && !isNaN(Number(key)) && key in obj) {
        obj = obj[Number(key)];
        continue;
      }

      if (
        !!obj &&
        !Array.isArray(obj) &&
        typeof key === "string" &&
        typeof obj == "object" &&
        key in obj
      ) {
        obj = obj[key];
        continue;
      }

      obj = defaultValue as T;
    }

    return obj;
  }
}
