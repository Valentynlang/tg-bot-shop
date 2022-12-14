import React, {useState} from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";

const products = [
    {id: '1', title: 'One', price:5000, description: 'first'},
    {id: '2', title: 'One2', price:5020, description: 'first2'},
    {id: '3', title: 'One3', price:54100, description: 'first3'},
    {id: '4', title: 'One4', price:23000, description: 'first4'},
    {id: '5', title: 'One5', price:500, description: 'first5'},
    {id: '6', title: 'One6', price:3000, description: 'first6'},
    {id: '7', title: 'One7', price:4000, description: 'first7'},
    {id: '8', title: 'One8', price:7000, description: 'first8'}
]

const getTotalPrice = (items) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}
const ProductList = () => {
    const [addedItems, setAddedItems] = useState([])
    const {tg} = useTelegram()
    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item.id === product.id)
        let newItems = []

        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id)
        } else {
            newItems = [...addedItems, product]
        }
        setAddedItems(newItems)

        if(newItems.length === 0) {
            tg.MainButton.hide()
        }else {
            tg.MainButton.show()
            tg.MainButton.setParams({
                text: `Bay ${getTotalPrice(newItems)}`
            })
        }
    }
    return (
        <div>
            {products.map(item => (
                <ProductItem
                product={item}
                onAdd={onAdd}
                className={'item'}
                />
                ))}
        </div>
    );
};

export default ProductList;