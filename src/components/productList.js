import React, { Fragment, useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import ConfirmationModal from './modal';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProductList = () => {
    const [search, setSearch] = useState('');
    const [sortDown, setSortDown] = useState(false);
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const [modal, setModal] = useState(false);
    let products = useSelector((state) => state.products);
    const [prodList, setProdList] = useState(products);

    const navigate = useNavigate()

    const handleSelectAll = e => {
        setIsCheckAll(!isCheckAll);
        setIsCheck(prodList.map((prod, id) => id));
        if (isCheckAll) {
            setIsCheck([]);
        }
    };

    useEffect(() => {
        setProdList(products)
    }, [products])

    const handleClick = e => {
        const { value, checked } = e.target;
        if (!isCheck.includes(parseInt(value))) {
            setIsCheck((prev) => [...prev, parseInt(value)])
        }
        else {
            setIsCheck(isCheck.filter(item => item !== parseInt(value)))
        }
    };

    const tableHeaders = [
        {
            key: '',
            value: <Form.Check type='checkbox' checked={isCheckAll || isCheck.length === prodList.length} onClick={handleSelectAll} />,
        },
        {
            key: 'name',
            value: 'Name',
        },
        {
            key: 'description',
            value: 'Description',
        },
        {
            key: 'expiryDate',
            value: 'Expiry Date',
        },
        {
            key: 'costPrice',
            value: 'Cost Price',
        },
        {
            key: 'sellPrice',
            value: 'Sell Price',
        },
        {
            key: 'discount',
            value: 'Discount',
        },
        {
            key: 'discountPrice',
            value: 'Discounted Price',
        },
        {
            key: 'finalPrice',
            value: 'Final Price',
        }

    ];

    const searchProducts = (e) => {
        let filterProducts = products.filter(prod => {
            if (e.target.value === "") return products
            return prod.name.toLowerCase().includes(e.target.value.toLowerCase())
        })

        setProdList(filterProducts)
        setSearch(e.target.value);


    }


    const sortFunction = (col) => {
        let arr = [];
        switch (col) {
            case "costPrice":
            case "sellPrice":
            case "discount":
            case "discountPrice":
            case "finalPrice":
                if (sortDown) {
                    arr = products.sort((a, b) => {
                        if (a[col] > b[col]) {
                            return 1;
                        }
                        if (a[col] < b[col]) {
                            return -1;
                        }
                        return 0;
                    });
                }
                else {
                    arr = products.sort((a, b) => {
                        if (a[col] < b[col]) {
                            return 1;
                        }
                        if (a[col] > b[col]) {
                            return -1;
                        }
                        return 0;
                    });
                }

                break;
            case "name":
            case "description":
            case "expiryDate":
                const copy = [...prodList];
                console.log(copy)

                if (sortDown) {
                    arr = copy.sort((a, b) => {
                        return a[col].localeCompare(b[col])
                    });
                }
                else {
                    arr = copy.sort((a, b) => {
                        return b[col].localeCompare(a[col])
                    });
                }



            default:
                //you might want to do something as default, I don't
                break;

        }
        setProdList(arr);
        setSortDown(!sortDown);
    }


    return (
        <Fragment>
            <Container fluid>
                <Row lg={1} md={1}>
                    <Col>
                        <Row className='justify-content-between align-items-center m-1'>
                            <Col className='col-auto'>
                                <h2>My Product List</h2>
                            </Col>
                            <Col className='col-auto'>
                                <Button onClick={() => { navigate('/add-edit') }}>Add Product</Button>
                            </Col>
                        </Row>
                    </Col>
                    <hr className="border border-primary border-1 opacity-75"></hr>
                    <Col>
                        <Row>
                            <Col>
                                <Form className='text-start'>
                                    <Row className="align-items-center">
                                        <Col sm={3} className="my-1">
                                            <Form.Label htmlFor="inlineFormInputName" visuallyHidden>
                                                Search Products
                                            </Form.Label>
                                            <Form.Control value={search} onChange={searchProducts} id="inlineFormInputName" placeholder="Search Products ( Enter name only )" />
                                        </Col>
                                        <Col xs="auto" className="my-1">
                                            <Button type="submit">Search</Button>
                                        </Col>
                                        <Col xs="auto" className="my-1">
                                            <Button onClick={() => setModal(true)} variant='danger'>{`Delete (${isCheck.length}) `}</Button>
                                        </Col>
                                    </Row>


                                </Form>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Table className='mt-2' striped bordered hover>
                            <thead>
                                <tr>
                                    {tableHeaders.map((head) => <th style={{ cursor: 'pointer' }} onClick={(el) => { sortFunction(head.key) }} key={head.key}>{head.value}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {prodList.length !== 0 && prodList.map((product, id) => <tr key={id}>
                                    <td><Form.Check type='checkbox' value={id} onClick={handleClick}
                                        checked={isCheck.includes(id)} /></td>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>{product.expiryDate}</td>
                                    <td>{product.costPrice}</td>
                                    <td>{product.sellPrice}</td>
                                    <td>{product.discount}</td>
                                    <td>{product.discountPrice}</td>
                                    <td>{product.finalPrice}</td>
                                </tr>)}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
            <ConfirmationModal show={modal} ids={isCheck} handleClose={() => setModal(!modal)} count={isCheck.length} handleIsCheck={() => setIsCheck([])} />
        </Fragment>
    )
}

export default ProductList