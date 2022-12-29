const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export const cloudinaryUpload = file => cloudinary.uploader.upload(file);
export const cloudinaryDestroy = public_id => cloudinary.uploader.destroy(public_id)

// export default cloudinaryUpload;