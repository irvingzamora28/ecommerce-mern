const router = require("express").Router()
const cloudinary = require("cloudinary").v2
const auth = require("../middleware/auth")
const authAdmin = require("../middleware/authAdmin")
const fs = require("fs")

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

router.post("/image", auth, authAdmin, (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0 || !req.files.hasOwnProperty("file")) return res.status(400).json({ msg: "No files were uploaded" })

        const file = req.files.file
        if (file.size > 1024 * 1024 * 5) {
            removeTemp(file.tempFilePath)
            return res.status(400).json({ msg: "File can not be bigger than 5MB" })
        }
        if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
            removeTemp(file.tempFilePath)
            return res.status(400).json({ msg: "File can only be png or jpeg" })
        }

        try {

            cloudinary.uploader.upload(file.tempFilePath, { folder: "test" }, (error, result) => {
                if (error) throw error;
                removeTemp(file.tempFilePath)
                return res.json({ public_id: result.public_id, url: result.secure_url })
            })
        } catch (error) {
            return res.status(400).json({ msg: `Error uploading the file: ${error.message}` })
        }

    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
})

router.post("/destroy", auth, authAdmin, (req, res) => {
    try {
        const { public_id } = req.body;
        if (!public_id) return res.status(500).json({ msg: `No images selected` })

        cloudinary.uploader.destroy(public_id, (error, result) => {
            if (error) throw error;
            return res.json({ msg: "Deleted image" })

        })
    } catch (error) {
        return res.status(400).json({ msg: `Error deleting file. ${error.message}` })
    }
})

const removeTemp = (path) => {
    fs.unlink(path, error => {
        if (error) throw error;
    })
}

module.exports = router