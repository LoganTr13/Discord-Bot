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

  public async getStatus(ip: string) {
    const url = `${this.base_url}/${this.edition}/${ip}`;
    console.log("[REQUEST] Executando requisição a : " + url);
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    if (!data.ip_address) {
      return null
    }
    if (!data.online){
      return
      
    }
    return await Server.make(data)
  }
}
