import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../ProductCard';
import ProductFilter from '../ProductFilter';
import Sort from '../Sort';

function Products() {
    const url = 'https://tyshop-server.onrender.com/products';
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState([]);
    const [searchParams] = useSearchParams();
    const [activeFilters, setActiveFilters] = useState([]);

    console.log([...searchParams.entries()]);

    const searchQuery = searchParams.get('search') || '';

    useEffect(() => {
        // IIFE
        (async () => {
            try {
                const data = (await axios.get(url)).data;
                console.log(data);
                setProducts(data);
                setFilters([...new Set(data.map(({ category }) => category))]);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        })();
    }, []);

    const searchFunction = ({ title, description, category }) => {
        if (!searchQuery) return true;
        const searchTerm = searchQuery.toLowerCase();
        let found = title.toLowerCase().includes(searchTerm);
        found = found || category.toLowerCase().includes(searchTerm);
        found = found || description.toLowerCase().includes(searchTerm);
        return found;
    };

    const filterProducts = ({ category }) => {
        if (activeFilters.length === 0) {
            return true;
        }
        return activeFilters.includes(category);
    };

    // Ensure that products is always an array
    const filteredProducts = Array.isArray(products)
        ? products.filter(filterProducts).filter(searchFunction)
        : [];

    return (
        <Container>
            <ProductFilter
                filterList={filters}
                activeFilters={activeFilters}
                setActiveFilters={setActiveFilters}
            />

            <Sort sortedList={products} setSortedList={setProducts} />

            <Row>
                {filteredProducts.map((item) => (
                    <ProductCard key={item.id} {...item} />
                ))}
            </Row>
        </Container>
    );
}

export default Products;
