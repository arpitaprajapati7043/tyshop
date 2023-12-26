import React from 'react';
import { Card, Form } from 'react-bootstrap';

function ProductFilter({ filterList, activeFilters, setActiveFilters }) {
    // Ensure filterList is an array; if not, fallback to an empty array
    const validFilterList = Array.isArray(filterList) ? filterList : [];

    const setFilter = (key) => {
        const activeFiltersCopy = [...activeFilters];
        const index = activeFiltersCopy.indexOf(key);

        if (index === -1) {
            activeFiltersCopy.push(key);
        } else {
            activeFiltersCopy.splice(index, 1);
        }

        setActiveFilters(activeFiltersCopy);
    };

    return (
        <Card>
            <Card.Title>Categories</Card.Title>
            <Card.Body>
                {validFilterList.map((filterItem) => (
                    <Form.Check
                        type="checkbox"
                        id={filterItem}
                        key={filterItem}
                        label={filterItem}
                        value={filterItem}
                        onChange={() => setFilter(filterItem)}
                    />
                ))}
            </Card.Body>
        </Card>
    );
}

export default ProductFilter;
