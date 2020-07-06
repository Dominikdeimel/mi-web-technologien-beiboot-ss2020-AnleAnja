const fs = require('fs').promises;
const path = require('path');

module.exports = class Config {

    constructor() {
        this.config = fs.readFile(path.join(__dirname, '../config.json'), 'utf8')
            .then((configJson) => JSON.parse(configJson));

    }

    async getImageSize(name) {
        let configObject = await this.config;
        return configObject['imageSize'][name];
    }
};