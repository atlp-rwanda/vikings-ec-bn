import {v4 as uuidv4} from 'uuid';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

export async function uploadPhoto(req, res, file) {
    return await cloudinary.v2.uploader.upload(
        file.tempFilePath,
        {
            public_id: 'projects/ecommerce/' + uuidv4() + '_' + Date.now() / 1000,
            overwrite: true,
        }
    );
}