import React, { useState, useEffect } from "react";
import "./AddProduct.css";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";


const AddProduct = () => {

  const [imageUpload, setImageUpload] = useState(null);

  const imagesListRef = ref(storage, "images/");
  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageName = imageUpload.name + v4();
    const imageRef = ref(storage, `images/${imageName}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        productDetails.image = url;
        productDetails.imageName = imageName;
        alert(imageName);
      });
    });
  };
  const [productDetails,setProductDetails] = useState({
      name:"",
      image:"",
      imageName:"",
      category:"women",
      new_price:"",
      old_price:""
  });

  const AddProduct = async () => {
    let product = productDetails;
      console.log(product);
      await fetch(`${process.env.REACT_APP_BaseURL}/addproduct`, {
      method: 'POST',
      headers: {
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body: JSON.stringify(product),
    })
      .then((resp) => resp.json())
      .then((data) => {data.success?alert("Product Added"):alert("Failed")});

  }

  const changeHandler = (e) => {
    console.log(e);
    setProductDetails({...productDetails,[e.target.name]:e.target.value});
    }

  return (
    <div className="addproduct">
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input type="text" name="name" value={productDetails.name} onChange={(e)=>{changeHandler(e)}} placeholder="Type here" />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input type="text" name="old_price" value={productDetails.old_price} onChange={(e)=>{changeHandler(e)}} placeholder="Type here" />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input type="text" name="new_price" value={productDetails.new_price} onChange={(e)=>{changeHandler(e)}} placeholder="Type here" />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product category</p>
        <select value={productDetails.category} name="category" className="add-product-selector" onChange={changeHandler}>
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select> 
      </div>
      <div className="img-upload">
        <input
          type="file"
          onChange={(event) => {
            setImageUpload(event.target.files[0]);
          }}
        />
        <button onClick={uploadFile}> Upload Image</button>
    
      </div>
      <button className="addproduct-btn" onClick={()=>{AddProduct()}}>ADD PRODUCT</button>
    </div>
  );
};

export default AddProduct;
