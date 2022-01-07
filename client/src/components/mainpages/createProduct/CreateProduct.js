import axios from 'axios'
import React, { useContext, useState } from 'react'
import Loading from '../utils/loading/Loading'
import { GlobalState } from '../../../GlobalState'
import {useHistory} from 'react-router-dom'

const initialState = {
    product_id: '',
    product_title: '',
    product_price: 0,
    product_description: 'LaMelo LaFrance Ball (born August 22, 2001) is an American professional basketball player for the Charlotte Hornets of the National Basketball Association (NBA).',
    product_content: 'Ball was trained in basketball by his father, LaVar, as soon as he could walk. At age four, he started playing the sport with his older brothers, Lonzo and LiAngelo, facing much older opponents. He also played flag football with his brothers at age five but continued to focus on basketball. In 2013, while in seventh grade, Ball began playing with his brothers on Big Ballers VXT, a 17-and-under Amateur Athletic Union (AAU) team launched and coached by his parents. The team, which was not sponsored by a major shoe company, did not compete in top AAU circuits and instead took part in local competitions.',
    product_category: ''
}

function CreateProduct() {
    const state = useContext(GlobalState)
    const [product, setProduct] = useState(initialState)
    const [categories] = state.categoriesAPI.categories
    const [images, setImages] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token

    const history = useHistory()

    const styleUpload = {
        display: images ? "block" : "none"
    }

    const handleUpload = async (e) => {
        e.preventDefault()
        try {
            if (!isAdmin) { return alert("You're not an admin") }
            const file = e.target.files[0]
            if (!file) { return alert("File not found") }

            if (file.size > 1024 * 1024) { return alert("Image size is too large") }

            if (file.type !== 'image/jpeg' && file.type !== 'image/png') { return alert("Image format is invalid") }

            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/image', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })
            setLoading(false)
            setImages(res.data)

        } catch (error) {
            console.log(error.response.data.msg)
        }
    }

    const handleDestroy = async () => {
        try {
            if (!isAdmin) { return alert("You're not an admin") }
            setLoading(true)
            await axios.post('/api/destroy', {public_id: images.public_id}, {
                headers: {Authorization: token}
            })
            setLoading(false)
            setImages(false)
        } catch (error) {
            console.log(error.response.data.msg)
        }
    }

    const handleChangeInput = (e) => {
        const {name, value} = e.target
        setProduct({...product, [name]:value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (!isAdmin) { return alert("You're not an admin") }
            if (!images) { return alert("Image not provided") }
            
            await axios.post('/api/products', {...product, images}, {
                headers: {Authorization: token}
            })

            setImages(false)
            setProduct(initialState)
            history.push('/')
        } catch (error) {
            console.log(error.response.data.msg);
        }
    }

    return (
        <div className="create_product">
            <div className="upload">
                <input type="file" name="file" id="file_upload" onChange={handleUpload} />
                {
                    loading ? 
                    <div id="file_img"><Loading /> </div>
                    :
                    <div id="file_img" style={styleUpload}>
                        <img src={images ? images.url : '' } alt="" />
                        <span onClick={handleDestroy}>X</span>
                    </div>
                }
                
            </div>

            <form onSubmit={handleSubmit}>
            <div className="row">
                    <label htmlFor="product_id">Product ID</label>
                    <input type="text" name="product_id" id="product_id" required value={product.product_id} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="product_title">Title</label>
                    <input type="text" name="product_title" id="product_title" required value={product.title} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="product_price">Price</label>
                    <input type="number" name="product_price" id="product_price" required value={product.price} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="product_description">Description</label>
                    <textarea name="product_description" id="product_description" cols="30" rows="5" required onChange={handleChangeInput} >{product.description}</textarea>
                </div>

                <div className="row">
                    <label htmlFor="product_content">Content</label>
                    <textarea name="product_content" id="product_content" cols="30" rows="10" required onChange={handleChangeInput} >{product.content}</textarea>
                </div>

                <div className="row">
                    <label htmlFor="product_category">Categories: </label>
                    <select name="product_category" value={product.category} onChange={handleChangeInput} >
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
