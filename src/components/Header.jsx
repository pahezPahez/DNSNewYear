import React, { useState, useEffect } from "react";
import './Header.css';
import logo from '../assets/DNSLogo.png'

const Header = () => {
    const [searchTerm, setSearchTerm] = useState(""); 
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]); 
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("https://674d10f454e1fca9290e3e1b.mockapi.io/react-ideas/arr/products");
                const data = await response.json();
                setProducts(data); 
            } catch (error) {
                console.error("Ошибка при загрузке данных:", error);
            }
        };

        fetchProducts();
    }, []);

    const handleSearch = () => {
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered); 
        setShowResults(true); 
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setShowResults(false); 
    };

    return (
        <div className="fixed">
            <header className="header">
                <div style={{ width: "600px", display: "flex", alignItems: "center", gap: "50px"}}>
                    <a href="">
                        <img src={logo} alt="DNS" style={{ width: "150px", height: "45px" }}/>
                    </a>
                    <a className="header__link" href="https://www.dns-shop.ru/"><button className="header__link-button">Перейти в магазин</button></a>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                    <input
                        className="header__input"
                        type="text"
                        placeholder="Поиск..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <button className="header__link-button" onClick={handleSearch} style={{ marginTop: "40px" }}>Найти</button>
                </div>
            </header>

            {showResults && (
                <div className="search-popup">
                    <div className="search-popup-content">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map(product => (
                                <div key={product.id} className="product-item">
                                    <img src={product.image} alt={product.name} className="product-image" />
                                    <div className="product-details">
                                        <h3 className="product-name">{product.name}</h3>
                                        <p className="product-price">{product.price} руб.</p>
                                        <a href={product.link} className="product-link">Купить</a>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="no-results">Ничего не найдено</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Header;