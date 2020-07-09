import { TArea } from "../model/timeList.model";

export const getMatchWords = (zonesMap: Map<string, TArea[]>, searchWord: string) => {
  const areaList: string[] = Array.from(zonesMap.keys());
  const matches: string[] = areaList.filter((area) => area.includes(searchWord.toLowerCase()));
  let seen: Set<string> = new Set();
  const newList: TArea[] = [];
  for (const match of matches) {
    for (const { name, timestamp } of zonesMap.get(match) || []) {
      if (seen.has(name)) {
        continue;
      }
      newList.push({ name, timestamp });
      seen.add(name);
    }
  }
  return newList;
};
