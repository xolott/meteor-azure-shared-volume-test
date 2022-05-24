
import { WebApp } from 'meteor/webapp';
import {formidableMiddleware} from "./formidable";


async function processInput (req, res) {
    const {fields, files} = req;
    console.log({fields, files});
    res.end('success');
}

WebApp.rawConnectHandlers.use('/webhooks/input', formidableMiddleware());

WebApp.rawConnectHandlers.use('/webhooks/input', processInput);
