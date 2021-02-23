import React from "react";
import Nav from '../../component/nav';
import { IoLogoUsd } from "react-icons/io";
import ProductCategoryList from "./ProductCategoryList";

function ProductCategory(props){
    return (
        <>
            <Nav title="Product Category" icon={IoLogoUsd} />
            <ProductCategoryList {...props} />
        </>
    )
}

export default ProductCategory;