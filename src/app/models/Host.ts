import { Proxy } from "./Proxy";

export interface Host {
    id : number,
    host_name: String,
    root_path: String,
    tls: Boolean,
    staging: Boolean,
    dns_verification: Boolean,
    dns_provider: null,
    custom_ssl: Boolean,
    custom_certs: any,
    force_redirect_https: Boolean,
    basic_auth:Boolean,
    basic_password:String,
    basic_username:String,
    proxy_set : Proxy[]
}