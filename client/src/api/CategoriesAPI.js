import axios from 'axios'
import React, { useEffect, useState } from 'react'

function CategoriesAPI(token) {
    const [categories, setCategories] = useState([])
    const [callback, setCallback] = useState(false)

    useEffect(() => {
        const getCategories = async () => {
            const res = await axios.get('/api/category')
            console.log("rescategory");
            setCategories(res.data);
        }
        getCategories()
    }, [callback])
    return {
        categories: [categories, setCategories],
        callback: [callback, setCallback]
    }
}

export default CategoriesAPI
