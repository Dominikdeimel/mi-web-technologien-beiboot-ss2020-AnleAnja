import config from './urlconfig.json';

export class UrlConfig {

    getUrl(path) {
        if (path === undefined) {
            return config.baseURL;
        }
        //return `${window.location.origin}${basePath?}${path}`;
        return `${config.baseURL}${path}`;
    }
}