import { FileService } from "../utils/files/file.service";
import convert from "xml-js";

export class AppService {
  constructor(private readonly fileService: FileService = new FileService()) {}

  /**
   * Dado el código de un país, este método obtiene información remota desde OpenAid, la procesa y genera un objeto JSON con la ayuda monetaría agrupada por año y por donante
   * @param countryCode : código del país a consultar
   * @returns JSON con la ayuda monetaría agrupada por año y por donante
   */
  async getDataOpenAid(countryCode: string) : Promise<Object> {
    try {
      const currentYear = new Date().getFullYear();
      const fileName = countryCode + "-" + currentYear + ".json";
      const fileExist = await this.fileService.fileExist(fileName);
      let donatiosByYear = [];

      /**
       * Se inicializa un arreglo de 5 años para almacenar la información por año
       */
      for (let index = 0; index < 5; index++) {
        donatiosByYear.push({ year: currentYear - (1 + index), donors: [] });
      }

      /**
       * Se verifica si el archivo con la información de donaciones no ha sido recuperado 
       * de OpenAid; si no ha sido recuperado se recupera y se almacena localmente para
       * futuras consultas
       */
      if (!fileExist) {
        const data = await this.fileService.getFileFromUrl(
          `https://iati.openaid.se/xml/${countryCode}.xml`
        );
        if (data.name === "Error")
          throw new Error("Error getting data from openaid");
        await this.fileService.storeFile(data, `${fileName}`);
      }

      /**
       * Se obtiene la información de donaciones del archivo almacenado localmente
       */
      const data = await this.fileService.readFile(fileName);

      /**
       * Se obtienen desde el archivo fuente todas las donaciones realizadas para un país especifico
       */
      const activities = data.elements.filter(
        (item) => item.name === "iati-activity"
      );


      /**
       * Se almacena la información de donaciones agrupada por año y por donador
       */
      activities.forEach((activity) => {
        const organisation = this.getDonorName(activity);

        const transactionsByActivity = activity.elements.filter(
          (item) => item.name === "transaction"
        );

        transactionsByActivity.forEach((transaction) => {
          const { attributes, elements } = transaction.elements.find(
            (item) => item.name === "value"
          );
          const year = +attributes["value-date"].substring(0, 4);
          const amount = +elements.shift().text;

          const donationsByGivenYear = donatiosByYear.find(
            (item) => item.year === year
          );

          if (donationsByGivenYear !== undefined) {
            let donor = donationsByGivenYear.donors.find(
              (donor) => donor.name === organisation
            );

            if (donor === undefined) {
              donor = { name: organisation, amount };
              donationsByGivenYear.donors.push(donor);
            } else {
              donor.amount += amount;
            }
          }
        });
      });

      /**
       * Se ordena la información de mayor a menor por la cantidad donada de cada donante
       */
      donatiosByYear.forEach((year) => {
        year.donors.sort((a, b) => b.amount - a.amount);
      });


      /**
       * Se da el formato solicitado a la información para ser devuelta el cliente.
       */
      const dataFormatted = donatiosByYear.map((item) => {
        const donors = item.donors.map((donor) => {
          return { [donor.name]: donor.amount };
        });

        return { [item.year]: donors };
      });

      return dataFormatted;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  /**
   * Este método busca el nombre de un donante dentro de un objeto json
   * @param activity : objeto JSON donde se encuentra el nombre de un donante
   * @returns responde con el nombre de un donante
   */
  getDonorName(activity: any): string {
    const contactInfo = activity.elements.find(
      (contactInfo) => contactInfo.name === "contact-info"
    );

    const organization = contactInfo.elements
      .find((item) => item.name === "organisation")
      .elements.shift();

    return organization.elements.shift().text;
  }
}
