import { TArea, TZones } from "../model/timeList.model";

export const formatAreaData = (zones: TZones[]): Map<string, TArea[]> => {
  if (!zones) {
    throw new Error("data should not be null");
  }
  const newZonesMap: Map<string, TArea[]> = new Map();
  for (const zone of zones) {
    const regex = zone["zoneName"].match("/(.*?)$");
    if (!regex) {
      continue;
    }
    const country: string = zone["countryName"];
    const city: string = regex[1];
    const timestamp: number = zone["timestamp"];
    newZonesMap.set(city.toLowerCase(), [{ name: `${city}, ${country}`, timestamp }]);
    if (country === city) {
      continue;
    }
    newZonesMap.set(country.toLowerCase(), newZonesMap.get(country.toLowerCase()) || []);
    newZonesMap.get(country.toLowerCase())?.push({ name: `${city}, ${country}`, timestamp });
  }

  return newZonesMap;
};
