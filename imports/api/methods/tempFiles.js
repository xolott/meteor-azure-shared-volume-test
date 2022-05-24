import {Meteor} from "meteor/meteor";
import fs from "fs";
import os from "os";

const tempDirectory = `${ Meteor.settings.public.temp_directory || os.tmpdir() }/uploads/`;
Meteor.methods({
    getTempFiles () {
        return fs.readdirSync(tempDirectory).map(filename => ({filename, fullPath: `${ tempDirectory }${filename}`}));
    },
    testFile(filename) {
        try {
            fs.readFileSync(`${ tempDirectory }${ filename }`);
            return 'OK';
        }
        catch (e) {
            return `FAILED => ${ e }`;
        }
    }
})
