import React from "react";

const Item = ({ key, color, item }) => {
    return (
        <li key={key} style={{ color: color }}>
            {item}
        </li>
    );
};

function ListItems({ items, color }) {
    return (
        <ul style={{ listStyleType: "none", color: color }}>
            {items.map((item, index) => (
                <Item key={index} color={color} item={item} />
            ))}
        </ul>
    );
}

export default ListItems;