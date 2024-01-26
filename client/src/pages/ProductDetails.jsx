import React, { useState, useEffect, useContext } from 'react';
import { FaCartShopping } from "react-icons/fa6";
import { useParams, useNavigate } from "react-router-dom";
import { RotatingLines } from 'react-loader-spinner';
import { AuthContext } from '../store/auth';
import { IoMdArrowRoundBack } from "react-icons/io";

const ProductDetails = () => {

    const { addToCart } = useContext(AuthContext);
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams();
    const [singleProduct, setSingleProduct] = useState();
    const back = useNavigate();
    // const [loading, setLoading] = useState(true);


    const increment = () => {
        setQuantity((prevState) => prevState + 1);
    };
    const decrement = () => {
        setQuantity((prevState) => {
            if (prevState === 1) return 1;
            return prevState - 1;
        });
    };

    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/view-product?_id=${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const completeRes = await response.json();
                    const productData = completeRes.data;
                    setSingleProduct(productData);
                } else {
                    const errorResponse = await response.json();
                }
            } catch (error) {
                console.log("Error on delete user function:", error);
            }
        };
        setTimeout(() => {

            getProduct();
        }, 500);
    }, [singleProduct]);

    const handleCart = async () => {
        const response = await addToCart({
            "quantity": quantity,
            "productId": id
        });

        if (response.ok) {
            const completeRes = await response.json();

        } else {
            const errorResponse = await response.json();
           
        }
        // console.log(response);
        // return false;
    }

    return (
        <>
        {/* <button onClick={()=>back(-1)}><IoMdArrowRoundBack /></button> */}
        <IoMdArrowRoundBack onClick={()=>back(-1)} />
            <div className="single-products">

                {!singleProduct && <div className="loader">
                    <RotatingLines
                        visible={true}
                        height="60"
                        width="60"
                        color="grey"
                        strokeWidth="3"
                        animationDuration="0.75"
                        ariaLabel="rotating-lines-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>}
                {singleProduct && <div className="single-product">
                    <div className="single-product-img">
                        <img src={singleProduct.image[0]} alt="Product Image" />

                    </div>
                    <div className="single-product-details">
                        <div className="single-product-name">{singleProduct.name}</div>
                        <div className="single-product-price">&#8377; {singleProduct.price}</div>
                        <div className="single-product-name">{singleProduct.companyId.name}</div>
                        <div className="single-product-description">{singleProduct.description}</div>
                        <div className='cart'>
                            <div className="quantity-buttons">
                                <span onClick={decrement}>-</span>
                                <span>{quantity}</span>
                                <span onClick={increment}>+</span>
                            </div>
                            <button  onClick={handleCart}><FaCartShopping />Add To Cart</button>
                        </div>
                    </div>
                </div>}
            </div>
        </>
    )
}

export default ProductDetails;