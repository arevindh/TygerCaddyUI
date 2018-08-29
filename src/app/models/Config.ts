export interface Config {
    id: number,
    interface: string,
    port: number,
    proxy_host: string,
    proxy_exception : string,
    root_dir :string,
    dns_challenge:boolean,
    dns_provider:string,
    ssl_staging:boolean
}