import React, { Fragment, useState } from 'react'
import { Col, Card, Container, Form, Row, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addItem } from "../redux/actions/productActions";
import ProductList from './productList';

const AddEditProduct = () => {
    const [productValue, setProductValue] = useState({
        name: '',
        description: '',
        expiryDate: '',
        costPrice: 0,
        sellPrice: 0,
        discount: 0,
        discountPrice: 0,
        finalPrice: 0
    });
    const [errors, setErrors] = useState({})
    // const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAdd = (e) => {
        e.preventDefault();
        const newErrors = findFormErrors();
        if (Object.keys(newErrors).length > 0) {
            // We got errors!
            setErrors(newErrors);
            console.log(newErrors);
        } else {
            // No errors! Put any logic here for the form submission!
            setProductValue({
                name: '',
                description: '',
                expiryDate: '',
                costPrice: 0,
                sellPrice: 0,
                discount: 0,
                discountPrice: 0,
                finalPrice: 0
            });

            navigate('/');
            dispatch(addItem(productValue));
        }
    }

    const handleChange = (e) => {

        let value = e.target.value;
        let name = e.target.name;
        if (name === 'discount') {
            if (productValue.sellPrice !== 0) {
                let discountPrice = (productValue.sellPrice * value) / 100;
                let finalPrice = productValue.sellPrice - discountPrice;
                setProductValue((prevalue) => {

                    return {
                        ...prevalue,
                        discountPrice,
                        finalPrice
                    }
                })
            }
            else {
                alert('Enter sell price first !')
            }
        }
        setProductValue((prevalue) => {

            return {
                ...prevalue,
                [name]: value
            }
        })

        console.log(productValue)

    }

    const findFormErrors = () => {
        const { name, description, expiryDate, costPrice, sellPrice, discount, discountPrice, finalPrice } = productValue
        const newErrors = {}
        // text errors
        if (!name || name === '') {
            newErrors.name = 'Name cannot be blank!';
        }

        if (!description || description === '') {
            newErrors.description = 'Description cannot be blank!';
        }
        if (!expiryDate || expiryDate === '') {
            newErrors.expiryDate = ' Expiry Date cannot be blank!'
        }

        if (!costPrice || costPrice === 0) {
            newErrors.costPrice = 'Enter Cost Price!';
        }

        if (!expiryDate || expiryDate === '') {
            newErrors.expiryDate = ' Expiry Date cannot be blank!'
        }

        if (!sellPrice || sellPrice === 0) {
            newErrors.sellPrice = ' Sell Price cannot be blank!'
        }

        if (!discount || discount === 0) {
            newErrors.discount = 'Enter Discount Price!';
        }
        if (!discountPrice || discountPrice === 0) {
            newErrors.discountPrice = 'Discount price should not be blank !'
        }
        if (!finalPrice || finalPrice === 0) {
            newErrors.finalPrice = 'Final Price should not be blank !'
        }


        return newErrors
    }

    return (
        <Fragment>
            <Container >

                <Row className='justify-content-center align-items-center p-4' >

                    <Col md={8}>
                        <Card body border='secondary'>
                            <Row className='justify-content-between align-items-center'>
                                <Col className='col-auto'>
                                    <h4>Add Product</h4>
                                </Col>
                                <Col className='col-auto'>
                                    <Button onClick={() => { navigate(-1) }}>Back</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} controlId="formGridName">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control name='name' required value={productValue.name} onChange={handleChange} type="text" isInvalid={!!errors.name} placeholder="Enter Name" />
                                                <Form.Control.Feedback type='invalid'>
                                                    {errors.name}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Row>
                                        <Form.Group className="mb-3" controlId="formGridDescription">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control name='description' value={productValue.description} onChange={handleChange} isInvalid={!!errors.description} placeholder="Product Description" />
                                            <Form.Control.Feedback type='invalid'>
                                                {errors.description}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formGridAddress2">
                                            <Form.Label>Expiry Date</Form.Label>
                                            <Form.Control name='expiryDate' value={productValue.expiryDate} onChange={handleChange} type='date' isInvalid={!!errors.expiryDate} placeholder="Apartment, studio, or floor" />
                                            <Form.Control.Feedback type='invalid'>
                                                {errors.expiryDate}
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <Row className="mb-3">
                                            <Form.Group as={Col} controlId="formGridCp">
                                                <Form.Label>Cost Price</Form.Label>
                                                <Form.Control name='costPrice' value={productValue.costPrice} onChange={handleChange} min={0} type='number' isInvalid={!!errors.costPrice} placeholder="Cost Price" />
                                                <Form.Control.Feedback type='invalid'>
                                                    {errors.costPrice}
                                                </Form.Control.Feedback>
                                            </Form.Group>

                                            <Form.Group as={Col} controlId="formGridSp">
                                                <Form.Label>Sell Price</Form.Label>
                                                <Form.Control name='sellPrice' value={productValue.sellPrice} onChange={handleChange} min={0} type='number' isInvalid={!!errors.sellPrice} placeholder="Sell Price" />
                                                <Form.Control.Feedback type='invalid'>
                                                    {errors.sellPrice}
                                                </Form.Control.Feedback>
                                            </Form.Group>

                                            <Form.Group as={Col} controlId="formGridDis">
                                                <Form.Label>Discount</Form.Label>
                                                <Form.Control name='discount' value={productValue.discount} onChange={handleChange} min={0} type='number' isInvalid={!!errors.discount} placeholder="Discount" />
                                                <Form.Control.Feedback type='invalid'>
                                                    {errors.discount}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Row>
                                        <Row>
                                            <Form.Group as={Col} className="mb-3" id="formGridCheckbox">
                                                <Form.Label>Calculated Discounted Price</Form.Label>
                                                <Form.Control name='discountPrice' value={productValue.discountPrice} onChange={handleChange} min={0} readOnly type='number' isInvalid={!!errors.discountPrice} placeholder="Discount" />
                                                <Form.Control.Feedback type='invalid'>
                                                    {errors.discountPrice}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} className="mb-3" id="formGridCheckbox">
                                                <Form.Label>Final Price</Form.Label>
                                                <Form.Control name='finalPrice' value={productValue.finalPrice} readOnly onChange={handleChange} min={0} type='number' isInvalid={!!errors.finalPrice} placeholder="Discount" />
                                                <Form.Control.Feedback type='invalid'>
                                                    {errors.finalPrice}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Row>
                                        <Button onClick={handleAdd} variant="primary" type="submit">
                                            Add
                                        </Button>
                                    </Form>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Fragment >
    )
}

export default AddEditProduct