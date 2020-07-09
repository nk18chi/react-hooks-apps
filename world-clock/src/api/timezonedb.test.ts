import mockAxios from "../__mocks__/axios";
import { successData } from "../test/timezonedbTestData";
import { getList } from "./timezonedb";

describe("access to api", () => {
  test("success to access to api", async () => {
    mockAxios.get.mockResolvedValue(successData);
    await expect(async () => await getList()).not.toThrow();
  });

  /**
   * jest fail to test with async/await. so this test case is pending.
   * @url https://github.com/facebook/jest/issues/9240
   */

  //   test("have error to access to api", async () => {
  //     mockAxios.get.mockRejectedValue(errorData);
  //     await expect(async () => await getList()).rejects.toThrow();
  //   });
});
