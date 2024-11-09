import React from "react";

const items = [
    { name: "Hortensia", price: 80 },
    { name: "Cœur saignant", price: 100 },
    { name: "Fleur de cerisier", price: 150 },
    { name: "Orchidée", price: 400 },
    { name: "Tulipe", price: 200 },
    { name: "Pivoine", price: 189 },
];

const Item = ({ item }) => {
    return (
        <li>
            {item.name} : {item.price}€
        </li>
    );
};

function Panier() {
    return (
        <div className="cart">
            <h2>Liste De Panier</h2>
            <ul>
                {items.map((item, index) => (
                    <Item key={index} item={item} />
                ))}
            </ul>
            <p>Total: {items.length} articles</p> {}
        </div>
    );
}

export default Panier;
