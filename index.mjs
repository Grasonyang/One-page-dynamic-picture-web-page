import fs from 'fs'
import path from 'path';
import sharp from 'sharp';
const filePath = path.join('./client/src/all.json');
const token = ""
async function text2img(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
        {
            headers: { Authorization: `Bearer ${token}` },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.blob();
    return result;
}
async function processImage(response) {
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const resizedBuffer = await sharp(buffer)
        .resize(500, 500)
        .toBuffer();
    const base64String = resizedBuffer.toString('base64');
    const dataUrl = `data:png;base64,${base64String}`;
    return dataUrl;
}
async function updateGenerateFields(obj) {
    const promises = [];

    for (let key in obj) {
        if (obj[key] && typeof obj[key] === 'object') {
            if (obj[key].hasOwnProperty('generate')) {
                let promise
                if (obj[key].type == "text2img") {
                    promise = text2img({ "inputs": obj[key].generate }).then(response => {
                        return processImage(response).then(dataUrl => {
                            console.log(dataUrl);
                            obj[key].img = dataUrl;
                        });
                    }).catch(err => {
                        console.error('data url error:', err);
                    });
                }
                promises.push(promise);
                console.log(obj[key].generate);
            }
            promises.push(updateGenerateFields(obj[key]));
        }
    }

    return Promise.all(promises);
}
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('无法读取文件:', err);
        return;
    }

    try {
        let jsonData = JSON.parse(data);
        updateGenerateFields(jsonData).then(() => {
            const updatedData = JSON.stringify(jsonData, null, 2);
            fs.writeFile(filePath, updatedData, 'utf8', (err) => {
                if (err) {
                    console.error('write error :', err);
                } else {
                    console.log('update success');
                }
            });
        }).catch(err => {
            console.error('update error', err);
        });
    } catch (err) {
        console.error('read error', err);
    }
});