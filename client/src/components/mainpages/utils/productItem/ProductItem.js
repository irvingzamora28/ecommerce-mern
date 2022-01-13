import axios from 'axios'
import React, { useState } from 'react'
import Loading from '../loading/Loading'
import BtnRender from './BtnRender'

function ProductItem({product, isAdmin, deleteProduct, handleCheck}) {

    return (
        <div className="product_card">
            {
                isAdmin && <input type="checkbox" checked={product.checked} onChange={() => handleCheck(product._id)} />
            }
            <img src={product.images.url} alt="" />

            <div className="product_box">
                <h2 title={product.title}>{product.title}</h2>
                <span>${product.price}</span>
                <p>{product.description}</p>
            </div>

            
            <BtnRender product={product} deleteProducto={deleteProduct} />
        </div>
    )
}

export default ProductItem
