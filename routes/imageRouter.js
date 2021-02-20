const router = require("express").Router()
const cloudinary = require("cloudinary").v2
const auth = require("../middleware/auth")
const authAdmin = require("../middleware/authAdmin")

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

router.post("/image", (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0 || !req.files.hasOwnProperty("file")) return res.status(400).json({ msg: "No files were uploaded" })

        const file = req.files.file
        if (file.size > 1024 * 1024 * 5) return res.status(400).json({ msg: "File can not be bigger than 5MB" })
        if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") return res.status(400).json({ msg: "File can only be png or jpeg" })

        try {

            cloudinary.uploader.upload(file.tempFilePath, { folder: "test" }, (error, result) => {
                if (error) throw error;

                res.json({ result })
            })
        } catch (error) {
            return res.status(400).json({ msg: `Error uploading the file: ${error.message}` })
        }
        // 1:55
        // name: 'Screenshot from 2021-01-11 16-09-08.png',
        //  data: <Buffer >,
        //  size: 165855,
        //  encoding: '7bit',
        //  tempFilePath:
        //   '/home/irving/webdev/career/ecommerce-mern/tmp/tmp-1-1613842421648',
        //  truncated: false,
        //  mimetype: 'image/png',
        //  md5: '39f7e626ad09dffe973f2655e4945329',
        //  mv: [Function: mv] } }
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
})

module.exports = router