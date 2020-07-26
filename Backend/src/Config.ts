import * as path from "path";
import {promises as fs} from "fs";

export class Config {

    private readonly _config: Promise<{ [key: string]: any }>;

    constructor() {
        this._config = fs.readFile(path.join(__dirname, '../config.json'), 'utf8')
            .then((configJson) => JSON.parse(configJson));
    }

    public async getImageSize(name) {
        let configObject = await this._config;
        return configObject['imageSize'][name];
    }
}