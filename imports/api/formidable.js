
import os from 'os';
import fs from 'fs';
import formidable from 'express-formidable';

function createDirectory(path) {
    if (!fs.existsSync(path))
        fs.mkdirSync(path, {recursive: true});
}

export function formidableMiddleware (options) {
    const tempDirectory = `${ Meteor.settings.public.temp_directory || os.tmpdir() }/uploads`;
    createDirectory(tempDirectory)
    return formidable({
        uploadDir: tempDirectory,
        ...options
    })
}
