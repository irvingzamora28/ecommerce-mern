import React from 'react'
import { Link } from 'react-router-dom'

function ProductItem({product}) {
    return (
        <div className="product_card">
            <img src="https://pix10.agoda.net/hotelImages/410266/-1/f037ad4f235f3ca1bfaa4079d8c74293.jpg?s=500x500" alt={product.title}/>
            <div className="product_box">
                <h2 title={product.title}>{product.title}</h2>
                <span>${product.price}</span>
                <p>{product.description}</p>
            </div>

            <div className="row_btn">
                <Link id="btn_buy" to="#!">Buy</Link>
                <Link id="btn_view" to={`/detail/${product._id}`}>View</Link>
            </div>
        </div>
    )
}

export default ProductItem
