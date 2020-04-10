const fs = require("fs").promises;

async function getSortedImageList()
{
    let fileList = await fs.readdir("data/");

    let result = [];

    for(let file of fileList)
    {
        let fileHandle = await fs.open(`data/${file}/original`);
        let stats = await fileHandle.stat();

        await fileHandle.close();

        result.push({birthTime: stats.birthtime, fileName: file});
    }

    return result
        .sort((a, b) => a.birthTime - b.birthTime)
        .map(v => v.fileName);
}

module.exports = {
    getSortedImageList
};