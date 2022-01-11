import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState';

function ProductItem({ product }) {
    const state = useContext(GlobalState);
    const [isAdmin] = state.userAPI.isAdmin
    const addCart = state.userAPI.addCart

    return (
        <div className="product_card">
            {
                isAdmin && <input type="checkbox" checked={product.checked} />
            }
            <img src="https://pix10.agoda.net/hotelImages/410266/-1/f037ad4f235f3ca1bfaa4079d8c74293.jpg?s=500x500" alt={product.title} />
            <div className="product_box">
                <h2 title={product.title}>{product.title}</h2>
                <span>${product.price}</span>
                <p>{product.description}</p>
            </div>

            <div className="row_btn">
                {
                    isAdmin ?
                        <>
                            <Link id="btn_delete" to="#!">Delete</Link>
                            <Link id="btn_edit" to={`/product/edit/${product._id}`}>Edit</Link>
                        </>
                        :
                        <>
                            <Link id="btn_buy" to="#!" onClick={() => addCart(product)}>Buy</Link>
                            <Link id="btn_view" to={`/product/detail/${product._id}`}>View</Link>
                        </>
                }
            </div>
        </div>
    )
}

export default ProductItem
