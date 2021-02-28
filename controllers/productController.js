const Products = require("../models/productModel")

const productController = {
    getProducts: async(req, res) => {
        try {
            const products = await Products.find()

            res.status(200).json(products)

        } catch (error) {
            res.status(500).json({ mgs: error.message })
        }
    },

    createProduct: async(req, res) => {
        try {
            const { product_id, title, price, description, content, images, category } = req.body;
            // if (!images) return res.status(400).json({ msg: "No image uploaded" })

            const product = await Products.findOne({ product_id })
            if (product) return res.status(400).json({ msg: "The product already exists" })

            const newProduct = new Products({
                product_id,
                title: title.toLowerCase(),
                price,
                description,
                content,
                images,
                category
            })

            await newProduct.save()
            res.status(200).json({ msg: "New Product created" })
        } catch (error) {
            res.status(500).json({ mgs: error.message })
        }
    },

    deleteProduct: async(req, res) => {
        try {
            await Products.findByIdAndDelete(req.params.id)
            res.status(200).json({ msg: "Deleted Product" })
        } catch (error) {
            res.status(500).json({ mgs: error.message })
        }
    },

    updateProduct: async(req, res) => {
        try {
            const { title, price, description, content, images, category } = req.body;
            // if (!images) return res.status(400).json({ msg: "No image uploaded" })

            await Products.findOneAndUpdate({ _id: req.params.id }, {
                title: title.toLowerCase(),
                price,
                description,
                content,
                images,
                category
            })

            res.status(200).json({ msg: "Updated Product" })
        } catch (error) {
            res.status(500).json({ mgs: error.message })
        }
    }
}

module.exports = productController