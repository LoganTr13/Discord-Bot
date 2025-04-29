import ApiError from "../ApiError/ApiError";
import Server from "./entitys/Server";

export enum minecraftEdition {
  Java = "java",
  Bedrock = "bedrock",
}

export default class MCStatus {
  private readonly base_url: string = "https://api.mcstatus.io/v2/status";

  private edition: minecraftEdition;

  constructor(edition: minecraftEdition = minecraftEdition.Java) {
    this.edition = edition;
  }

  public setEdition(editionSelected: minecraftEdition) {
    this.edition = editionSelected;
  }

  public async getStatus(ip) {
    const url = `${this.base_url}/${this.edition}/${ip}`;
    console.log("[REQUEST] Executando requisição a : " + url);
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return await Server.make(data)
  }
}
