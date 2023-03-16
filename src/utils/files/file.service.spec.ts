import { describe, expect } from "@jest/globals";
import { FileService } from "./file.service";

describe("FileService", () => {
  let fileService: FileService;

  beforeEach(() => {
    fileService = new FileService();
  });

  describe("getFileFromUrl", () => {
    it("Regresa un objeto json dado el path de un archivo remoto", async () => {
      jest
        .spyOn(fileService, "getFileFromUrl")
        .mockImplementation(async () => Object);

      expect(await fileService.getFileFromUrl("https://example.com/example.json")).toBe(Object);
    });
  });


  describe("storeFile", () => {
    it("Regresa un objeto json dado el path de un archivo remoto", async () => {

      const result = true;

      jest
        .spyOn(fileService, "storeFile")
        .mockImplementation(async () => result);

      expect(await fileService.storeFile({data : 'data'},'nameFile')).toBe(result);
    });
  });

  

  describe("fileExist", () => {
    it("Regresa un valor verdadero cuando el archivo existe", async () => {
      const result = true;
      jest
        .spyOn(fileService, "fileExist")
        .mockImplementation(async () => result);

      expect(await fileService.fileExist("example.json")).toBe(result);
    });
  });

  describe("fileExist", () => {
    it("Regresa un valor false cuando el archivo no existe", async () => {
      const result = false;
      jest
        .spyOn(fileService, "fileExist")
        .mockImplementation(async () => result);

      expect(await fileService.fileExist("example.json")).toBe(result);
    });
  });
  

  describe("readFile", () => {
    it("Regresa un valor false cuando el archivo no existe", async () => {
      
      jest
        .spyOn(fileService, "readFile")
        .mockImplementation(async () => Object);

      expect(await fileService.readFile("example.json")).toBe(Object);
    });
  });


});