import config from './urlconfig.json';

export class UrlConfig {

    getUrl(path) {
        if(path === undefined){
            return config.baseURL;
        }
        return `${config.baseURL}${path}`;
    }
}