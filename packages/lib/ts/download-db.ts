import fs from 'fs'
import fetch from 'node-fetch';
import { promisify } from 'util';

const writeFilePromise = promisify(fs.writeFile);

function downloadFile(url: string, outputPath: string) {
    return fetch(url)
        .then((x: any) => x.arrayBuffer())
        .then((x: any) => writeFilePromise(outputPath, Buffer.from(x)));
}

export async function download(uri: string, filename: string) {

    if (fs.existsSync(filename)) {
        console.log('File already exists.')
        return
    }

    try {
        console.log('Downloading file')
        await downloadFile(uri, '/tmp/links.db');
        console.log('All done');
    } catch (error) {
        console.log('Download failed', error)
    }
};
