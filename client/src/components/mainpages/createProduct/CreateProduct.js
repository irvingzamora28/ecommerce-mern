import React, { useContext, useState } from 'react'
import { GlobalState } from '../../../GlobalState'

const initialState = {
    product_id: '',
    price: '',
    price: 0,
    description: 'LaMelo LaFrance Ball (born August 22, 2001) is an American professional basketball player for the Charlotte Hornets of the National Basketball Association (NBA).',
    content: 'Ball was trained in basketball by his father, LaVar, as soon as he could walk. At age four, he started playing the sport with his older brothers, Lonzo and LiAngelo, facing much older opponents. He also played flag football with his brothers at age five but continued to focus on basketball. In 2013, while in seventh grade, Ball began playing with his brothers on Big Ballers VXT, a 17-and-under Amateur Athletic Union (AAU) team launched and coached by his parents. The team, which was not sponsored by a major shoe company, did not compete in top AAU circuits and instead took part in local competitions.',
    category: ''
}

function CreateProduct() {
    const state = useContext(GlobalState)
    const [product, setProduct] = useState(initialState)
    const [categories] = state.categoriesAPI.categories
    const [images, setImages] = useState(false)
    const [loading, setLoading] = useState(false)

    const styleUpload = {
        display: images ? "block" : "none"
    }

    return (
        <div className="create_product">
            <div className="upload">
                <input type="file" name="file" id="file_upload" />
                <div id="file_img" style={styleUpload}>
                    <img src="" alt="" />
                    <span>X</span>
                </div>
            </div>

            <form>
            <div className="row">
                    <label htmlFor="product_id">Product ID</label>
                    <input type="text" name="product_id" id="product_id" required value={product.product_id} />
                </div>

                <div className="row">
                    <label htmlFor="product_title">Title</label>
                    <input type="text" name="product_title" id="product_title" required value={product.title} />
                </div>

                <div className="row">
                    <label htmlFor="product_price">Price</label>
                    <input type="number" name="product_price" id="product_price" required value={product.price} />
                </div>

                <div className="row">
                    <label htmlFor="product_description">Description</label>
                    <textarea name="product_description" id="product_description" cols="30" rows="5" required >{product.description}</textarea>
                </div>

                <div className="row">
                    <label htmlFor="product_content">Content</label>
                    <textarea name="product_content" id="product_content" cols="30" rows="10" required >{product.content}</textarea>
                </div>

                <div className="row">
                    <label htmlFor="product_category">Categories: </label>
                    <select name="product_category" value={product.category}>
                        <option value="">Please select a category</option>
                        {
                            categories.map(category => (
                                <option value={category._id} key={category._id}>{category.name}</option>
                            ))
                        }
                    </select>
                </div>

                <button type="submit">Create</button>
            </form>

        </div>
    )
}

export default CreateProduct
