const Products = require("../models/productModel")


class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filtering() {
        // this.queryString = req.query
        const queryObj = {...this.queryString }
        const excludedFields = ["page", "sort", "limit"]
        excludedFields.forEach(elem => delete(queryObj[elem]))

        let queryString = JSON.stringify(queryObj)
        queryString = queryString.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)
        this.query.find(JSON.parse(queryString))
        return this;
    }
    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ')
            console.log(sortBy);

            this.query = this.query.sort(sortBy)
        } else {
            this.query = this.query.sort("-createdAt")
        }

        return this;
    }
    paginating() {
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 10
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}
// 2:51
const productController = {
    getProducts: async(req, res) => {
        try {
            const features = new APIfeatures(Products.find(), req.query).filtering().sorting().paginating()
            const products = await features.query

            res.status(200).json({
                status: 'success',
                result: products.length,
                products: products
            })

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