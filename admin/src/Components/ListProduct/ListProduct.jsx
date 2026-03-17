import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from '../Assets/cross_icon.png'
import { getStorage, ref, deleteObject } from "firebase/storage";
import { storage } from "../firebase";

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = () => { 
    fetch(`${process.env.REACT_APP_BaseURL}/allproducts`) 
            .then((res) => res.json()) 
            .then((data) => setAllProducts(data))
    }

    useEffect(() => {
      fetchInfo();
    }, [])

    const removeProduct = async (id, imageName) => {
      await fetch(`${process.env.REACT_APP_BaseURL}/removeproduct`, {
      method: 'POST',
      headers: {
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body: JSON.stringify({id:id}),
    })

    fetch(`${process.env.REACT_APP_BaseURL}/allproducts`) 
    .then((res) => res.json()) 
    .then((data) => setAllProducts(data))

    // Create a reference to the file to delete
    const desertRef = ref(storage, "images/"+imageName);
    // Delete the file
    deleteObject(desertRef).then(() => {
      alert("Deleted Successfully")
    }).catch((error) => {
      alert("Failed to delete")
    });

    }

  return (
    <div className="listproduct">
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
          <p>Products</p>
          <p>Title</p>
          <p>Old Price</p>
          <p>New Price</p>
          <p>Category</p>
          <p>Remove</p>
        </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((e) => {
          return (
            <div>
              <div className="listproduct-format-main listproduct-format">
                <img className="listproduct-product-icon" src={e.image} alt="" />
                <p cartitems-product-title>{e.name}</p>
                <p>${e.old_price}</p>
                <p>${e.new_price}</p>
                <p>{e.category}</p>
                <img className="listproduct-remove-icon" onClick={()=>{removeProduct(e.id, e.imageName)}} src={cross_icon} alt="" />
              </div>
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListProduct;
