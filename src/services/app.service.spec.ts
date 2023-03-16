import { describe, expect } from "@jest/globals";
import { AppService } from "./app.service";

describe("AppService", () => {
  let appService: AppService;

  beforeEach(() => {
    appService = new AppService();
  });

  describe("getDataOpenAid", () => {
    it("Dado un objeto JSON, buscar y regresa el nombre de un donante dentro del mismo", async () => {
      jest
        .spyOn(appService, "getDataOpenAid")
        .mockImplementation(async () => Object);

      expect(await appService.getDataOpenAid("")).toBe(Object);
    });
  });

  describe("getDonorName", () => {
    it("Dado un objeto JSON, buscar y regresa el nombre de un donante dentro del mismo", async () => {
      const donorName = "donor name";

      jest
        .spyOn(appService, "getDonorName")
        .mockImplementation(() => donorName);

      expect(appService.getDonorName({})).toBe(donorName);
    });
  });
});
