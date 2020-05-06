const fs = require('fs').promises;

module.exports = class Config {

    #config;

    constructor() {
        this.#config = fs.readFile('./config.json', 'utf8')
            .then((configJson) => JSON.parse(configJson));

    }

    async getImageSize(name) {
        let configObject = await this.#config;
        return configObject['imageSize'][name];
    }
};