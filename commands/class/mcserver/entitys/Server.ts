

export default class Server {
  constructor(    
    public readonly online: boolean,
    public readonly host: string,
    public readonly players: { online: number, max: number },
    public readonly version:string,
    public readonly motd: string,
    public readonly icon: string
  ){}
  public static make<T>(data: T) {
    return new Server(
      data['online'],
      data['host'],{
        online: data['players']['online'],
        max: data['players']['max']
      },
      data['version']['name_clean'],
      data['motd']['clean'],
      data['icon']
    );
  }
}
