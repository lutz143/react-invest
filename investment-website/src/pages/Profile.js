import PageContainer from "../containers/PageContainer";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { deleteStockFromPortfolio, deleteStock } from "../store/authSlice";
import { Nav, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { logout } from "../store/authSlice";
import classes from "./Profile.module.css";
import axios from 'axios';
import moment from 'moment';

import formatModel from '../utils/formatUtils';
import { useTable } from "react-table";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const formatCurrencyInThousands = (value) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0, // No decimals
        maximumFractionDigits: 0, // No decimals
    }).format(value / 1000);


const Profile = () => {
    const [portfolio, setPortfolio] = useState([]);
    const [data, setData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [editingRow, setEditingRow] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedValues, setEditedValues] = useState({});
    const [originalData, setOriginalData] = useState([]); // Store original data before editing
    const [comment, setComment] = useState([]);
    const user = useSelector(state => state.auth.user)
    const user_id = useSelector(state => state.auth.user_id)
    const dispatch = useDispatch();

    useEffect(() => {
        // Make a GET request to API endpoint by stock ID
        axios.get(`http://localhost:3001/api/users/${user_id}`)
            .then(response => {
                const portfolioData = response.data.map((stock) => ({
                    ...stock,
                    exDividendDate: moment(stock.exDividendDate).format('M/DD/YYYY'),
                    Valuation_Date: moment(stock.Valuation_Date).format('M/DD/YYYY'),
                    previousClose: parseFloat(stock.previousClose).toFixed(2),
                    MarketValuePerShare: parseFloat(stock.MarketValuePerShare).toFixed(2),
                    targetMeanPrice: parseFloat(stock.targetMeanPrice).toFixed(2),
                    NominalValuePerShare: parseFloat(stock.NominalValuePerShare).toFixed(2)
                }));
                setData(portfolioData);
                setTableData(portfolioData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

    }, [user_id, portfolio]); // include "id" in the dependency array

    const columns = React.useMemo(
        () => [
            {
                Header: "Ticker",
                accessor: "Ticker",
                Cell: ({ row }) => (
                    <Link to={`/valuations/${row.original.valuation_id}`}>
                        <Button className={classes.cardButton}>{row.original.Ticker}</Button>
                    </Link>
                )
            },
            {
                Header: 'Ex Div Date',
                accessor: 'exDividendDate',
            },
            {
                Header: "Quantity",
                accessor: "quantity",
                Cell: ({ row }) =>
                    isEditing ? (
                        <input
                            type="number"
                            className="form-control"
                            value={editedValues[row.original.id]?.quantity ?? row.original.quantity}
                            onChange={(e) => handleInputChange(e, row.original.id, "quantity")}
                        />
                    ) : (
                        row.original.quantity
                    )
            },
            {
                Header: "Avg Price",
                accessor: "avg_price",
                Cell: ({ row }) =>
                    isEditing ? (
                        <input
                            type="number"
                            className="form-control"
                            value={editedValues[row.original.id]?.avg_price ?? row.original.avg_price}
                            onChange={(e) => handleInputChange(e, row.original.id, "avg_price")}
                        />
                    ) : (
                        `$${formatModel.formatDecimal(row.original.avg_price)}`
                    )
            },
            {
                Header: 'Cost Basis',
                accessor: 'cost_basis',
                Cell: ({ value }) => `$${formatModel.formatDecimal(value)}`,
            },
            {
                Header: 'NOM at Invest',
                accessor: 'NominalValuePerShare',
                Cell: ({ value }) => `$${formatModel.formatDecimal(value)}`,
            },
            {
                Header: 'Target at Invest',
                accessor: 'targetMeanPrice',
                Cell: ({ value }) => `$${formatModel.formatDecimal(value)}`,
            },
            {
                Header: 'MV at Invest',
                accessor: 'MarketValuePerShare',
                Cell: ({ value }) => `$${formatModel.formatDecimal(value)}`,
            },
            {
                Header: "Actions",
                accessor: "actions",
                Cell: ({ row }) => (
                    <Button
                        className={classes.cardDeleteButton}
                        variant="danger"
                        onClick={() => handleDeleteStock(row.original.valuation_id)}
                    >
                        Delete Stock
                    </Button>
                ),
            },
        ],
        [isEditing, editedValues]
    );

    // declare useTable hook
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data: tableData });

    // Track input changes
    const handleInputChange = (e, rowId, field) => {
        setEditedValues(prev => ({
            ...prev,
            [rowId]: { ...prev[rowId], [field]: e.target.value }
        }));
    };

    // Save all edited data to backend
    const saveChanges = async () => {
        try {
            await Promise.all(Object.keys(editedValues).map(async (rowId) => {
                const updatedStock = editedValues[rowId];

                await axios.put(`http://localhost:3001/api/update-position/${rowId}`, {
                    quantity: updatedStock.quantity,
                    avg_price: updatedStock.avg_price,
                });
            }));

            // Update UI with new data
            setTableData(prev =>
                prev.map(stock => (editedValues[stock.id] ? { ...stock, ...editedValues[stock.id] } : stock))
            );

            setIsEditing(false); // Exit edit mode
            setEditedValues({}); // Clear edited values
        } catch (error) {
            console.error("Error updating stock:", error);
        }
    };


    // useEffect to fetch comments initially and whenever the component mounts or comments are posted
    useEffect(() => {
        fetchUserComments();
    }, []); // Empty dependency array means this effect runs once when the component mounts

    const handleDeleteStock = async (stockId) => {
        dispatch(deleteStockFromPortfolio(stockId));
        dispatch(deleteStock(stockId));

        if (user && stockId) {
            const response = await fetch(`http://localhost:3001/api/portfolio/${stockId}`, {
                method: 'DELETE',
                body: JSON.stringify({
                    user_id
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.log('button pushed, stock id to be deleted!')
                setPortfolio(response)

            } else {
                alert(response.statusText);
            }
        }
    };

    const fetchUserComments = async () => {
        // Make a GET request to API endpoint by stock ID
        axios.get(`http://localhost:3001/api/comments/user/${user_id}`)
            .then((response) => {
                const commentData = response.data.map((comment) => ({
                    ...comment,
                    created_at: formatModel.formatDate(comment.created_at)
                }));
                setComment(commentData);
                console.log(commentData);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    return (
        <PageContainer>
            <section>
                <Container>
                    <Row lg={1}>
                        <Card className="mb-3">
                            <Card.Header>
                                <Row className="align-items-center">
                                    <h1 className="d-flex bd-highlight">
                                        <div
                                            className="p-2 flex-grow-1 bd-highlight"
                                            id={classes.profileHeader}
                                        >
                                            Welcome, {user}!
                                        </div>
                                        <div className="p-2 bd-highlight">
                                            {!isEditing ? (
                                                <Button onClick={() => {
                                                    setOriginalData([...tableData]); // Save original state
                                                    setIsEditing(true);
                                                }} variant="warning">
                                                    Edit
                                                </Button>
                                            ) : (
                                                <>
                                                    <Button onClick={saveChanges} variant="success">
                                                        Save
                                                    </Button>
                                                    <Button onClick={() => {
                                                        setTableData(originalData); // Restore previous data
                                                        setEditedValues({}); // Clear edits
                                                        setIsEditing(false); // Exit edit mode
                                                    }} variant="secondary">
                                                        Cancel
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                        <div className="p-2 bd-highlight">
                                            <Button onClick={() => dispatch(logout())}>
                                                <Nav.Link as={Link} to={`/`}>Logout</Nav.Link>
                                            </Button>
                                        </div>
                                    </h1>
                                </Row>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col xs={12} md={4} className={classes.bodyLeftContainter}>
                                        <Row className={classes.bodyLeftInnerContainer}>
                                            <Card.Header className={classes.bodyLeftHeader}>
                                                Your Stock Comments are Below
                                            </Card.Header>
                                        </Row>
                                        <Row className={classes.bodyLeftInnerContainer}>
                                            <Card.Body>
                                                {comment.map((comment, index) => (
                                                    <div key={comment.id} className="align-items-center">
                                                        <Card.Header>
                                                            <Row className="align-items-center">
                                                                <div className="d-flex bd-highlight">
                                                                    <div className="flex-grow-1 bd-highlight">
                                                                        {comment.Ticker}
                                                                    </div>
                                                                    <span className={classes.commentDate}>
                                                                        {comment.created_at}
                                                                    </span>
                                                                </div>
                                                            </Row>
                                                        </Card.Header>
                                                        <Card.Body className={classes.commentBody}>
                                                            <div>
                                                                <Nav.Link as={Link} to={`/valuations/${comment.valuation_id}`}>
                                                                    {comment.comment}
                                                                </Nav.Link>
                                                            </div>
                                                        </Card.Body>
                                                    </div>
                                                ))}
                                            </Card.Body>
                                        </Row>
                                    </Col>
                                    <Col>
                                        <Row>
                                            <Col>
                                                <div style={{ overflowY: 'scroll', overflowX: 'scroll', maxWidth: '900px' }}>
                                                    <table {...getTableProps()} style={{ border: '1px solid black', width: '100%' }}>
                                                        <thead>
                                                            {headerGroups.map((headerGroup) => (
                                                                <tr {...headerGroup.getHeaderGroupProps()}>
                                                                    {headerGroup.headers.map((column) => (
                                                                        <th
                                                                            {...column.getHeaderProps()}
                                                                            style={{
                                                                                border: '1px solid black',
                                                                                padding: '8px',
                                                                                backgroundColor: '#f2f2f2',
                                                                                fontSize: '10px',
                                                                            }}
                                                                        >
                                                                            {column.render('Header')}
                                                                        </th>
                                                                    ))}
                                                                </tr>
                                                            ))}
                                                        </thead>
                                                        <tbody {...getTableBodyProps()}>
                                                            {rows.map((row) => {
                                                                prepareRow(row);
                                                                return (
                                                                    <tr {...row.getRowProps()}>
                                                                        {row.cells.map((cell) => (
                                                                            <td
                                                                                {...cell.getCellProps()}
                                                                                style={{
                                                                                    border: '1px solid black',
                                                                                    padding: '8px',
                                                                                    textAlign: 'center',
                                                                                    fontSize: '10px',
                                                                                }}
                                                                            >
                                                                                {cell.render('Cell')}
                                                                            </td>
                                                                        ))}
                                                                    </tr>
                                                                );
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </Col>

                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Row>
                </Container>
            </section>
            <div>
                <div>
                    <Container>

                    </Container>
                </div>
            </div>
        </PageContainer>
    );
}

export default Profile;
