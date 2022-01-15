const Products = require("../models/productModel")
const Category = require("../models/categoryModel")

const categoryController = {
    getCategories: async(req, res) => {
        try {
            const categories = await Category.find()
            res.json(categories)
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    createCategory: async(req, res) => {
        try {
            const { name } = req.body;
            const category = await Category.findOne({ name })
            if (category) return res.status(400).json({ msg: "This category already exists." })

            const newCategory = new Category({ name })

            await newCategory.save()
            res.json({ msg: "Created category" })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    deleteCategory: async(req, res) => {
        try {
            const products = await Products.findOne({ category: req.params.id })
            if (products) return res.status(500).json({ msg: "Please delete all products with a relationship to this category." })
            await Category.findByIdAndDelete(req.params.id);
            res.json({ msg: "Deleted category" })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    updateCategory: async(req, res) => {
        try {
            const { name } = req.body
            await Category.findOneAndUpdate({ _id: req.params.id }, { name })

            res.json({ msg: "Updated category" })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    }
}


module.exports = categoryController