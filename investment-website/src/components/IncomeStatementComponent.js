import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Card, Container, Row, Col } from "react-bootstrap";

import classes from "../pages/Stock.module.css";
import formatModel from '../utils/formatUtils';

import { useTable } from "react-table";
import { Line } from "react-chartjs-2";
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

const IncomeStatementComponent = () => {
    const [jsonData, setJsonData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [ros, setROS] = useState([]);
    const [revenue, setTotalRevenue] = useState([]);
    const [ebit, setEbit] = useState([]);
    const [labels, setLabels] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3001/api/incomeStatement/${id}`)
            .then((response) => {
                const incomeStatementData = response.data;

                // Iterate through balanceSheetData fields and apply formatting
                const formattedData = Object.keys(incomeStatementData).reduce((acc, key) => {
                    if (typeof incomeStatementData[key] === 'number') {
                        if (key === 'BasicEPS' || key === 'DilutedEPS') {
                            acc[key] = formatModel.formatDecimal(incomeStatementData[key]);
                        } else {
                            acc[key] = formatModel.formatInteger(incomeStatementData[key]);
                        }
                    } else {
                        if (key === 'BasicEPS' || key === 'DilutedEPS' || key === 'TaxRateForCalcs') {
                            acc[key] = formatModel.formatDecimal(incomeStatementData[key]);
                        } else {
                            acc[key] = incomeStatementData[key];
                        }
                    }
                    return acc;
                }, {});

                setJsonData(formattedData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [id]);

    useEffect(() => {
        axios.get(`http://localhost:3001/api/incomeStatement/xlsx/${id}`)
            .then((response) => {
                const incomeStatementData = response.data;

                // Extract and format data
                const revenue = incomeStatementData.map(entry => entry.TotalRevenue);
                const ebit = incomeStatementData.map(entry => entry.EBIT);
                const labels = incomeStatementData.map(entry => entry.asOfYear); // Assumes a `date` field exists

                // Calculate ROS
                const ros = ebit.map((ebit, index) =>
                    ebit && revenue[index]
                        ? ebit / revenue[index]
                        : 0
                );

                // Add ROS to table data
                const formattedData = incomeStatementData.map((entry, index) => ({
                    ...entry,
                    ROS: ros[index], // Append ROS to each entry
                }));

                setROS(ros);
                setTotalRevenue(revenue);
                setEbit(ebit);
                setLabels(labels);
                setTableData(formattedData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [id]);

    // Define columns for react-table
    const columns = React.useMemo(
        () => [
            {
                Header: 'Year',
                accessor: 'asOfYear', // Key in the data object
            },
            {
                Header: 'Total Revenue $K',
                accessor: 'TotalRevenue',
                Cell: ({ value }) => formatCurrencyInThousands(value),
            },
            {
                Header: 'COGS',
                accessor: 'CostOfRevenue',
                Cell: ({ value }) => formatCurrencyInThousands(value),
            },
            {
                Header: 'Gross Profit',
                accessor: 'GrossProfit',
                Cell: ({ value }) => formatCurrencyInThousands(value),
            },
            {
                Header: 'Total Expenses',
                accessor: 'TotalExpenses',
                Cell: ({ value }) => formatCurrencyInThousands(value),
            },
            {
                Header: 'EBIT',
                accessor: 'EBIT',
                Cell: ({ value }) => formatCurrencyInThousands(value),
            },
            {
                Header: 'Net Income',
                accessor: 'NetIncome',
                Cell: ({ value }) => formatCurrencyInThousands(value),
            },
            {
                Header: 'ROS',
                accessor: 'ROS',
                Cell: ({ value }) => `${(value * 100).toFixed(1)}%`,
            },
        ],
        []
    );

    // declare useTable hook
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data: tableData });

    if (!jsonData) {
        return <p>Loading...</p>;
    }

    return (
        <section>
            <Container>
                <Card.Body>
                    <Container className='mb-2'>
                        <Row className="align-items-center">
                            <Col>
                                <span>
                                    Basic Average Shares: {jsonData.BasicAverageShares}
                                </span>
                            </Col>
                            <Col>
                                <span>
                                    Basic EPS: {jsonData.BasicEPS}
                                </span>
                            </Col>
                        </Row>
                        <Row className="align-items-center mb-2">
                            <Col>
                                <span>
                                    Diluted Average Shares: {jsonData.DilutedAverageShares}
                                </span>
                            </Col>
                            <Col>
                                <span>
                                    Diluted EPS: {jsonData.DilutedEPS}
                                </span>
                            </Col>
                        </Row>
                        <Row className={classes.cardDivider}></Row>
                        <Row className="align-items-center">
                            <Col>
                                <span>
                                    Gross Profit: {jsonData.GrossProfit}
                                </span>
                            </Col>
                            <Col>
                                <span>
                                    Net Income: {jsonData.NetIncome}
                                </span>
                            </Col>
                        </Row>
                        <Row className="align-items-center">
                            <Col>
                                <span>
                                    EBIT: {jsonData.EBIT}
                                </span>
                            </Col>
                            <Col>
                                <span>
                                    EBITDA: {jsonData.EBITDA}
                                </span>
                            </Col>
                        </Row>
                        <Row className="align-items-center mb-2">
                            <Col>
                                <span>
                                    Net Income Continuous Operations: {jsonData.NetIncomeContinuousOperations}
                                </span>
                            </Col>
                            <Col>
                                <span>
                                    Operating Income: {jsonData.OperatingIncome}
                                </span>
                            </Col>
                        </Row>
                        <Row className={classes.cardDivider}></Row>

                        <Container className={classes.cardSubSection}>
                            <Row className="align-items-center">
                                <Col>
                                    <span>
                                        Total Revenue: {jsonData.TotalRevenue}
                                    </span>
                                </Col>
                                <Col>
                                    <span>
                                        Operating Revenue: {jsonData.OperatingRevenue}
                                    </span>
                                </Col>
                            </Row>

                            <Row className="align-items-center">
                                <Col>
                                    <span>
                                        Cost Of Revenue: {jsonData.CostOfRevenue}
                                    </span>
                                </Col>
                                <Col>
                                    <span>
                                        Operating Expense: {jsonData.OperatingExpense}
                                    </span>
                                </Col>
                            </Row>
                            <Row className="align-items-center mb-2">
                                <Col>
                                    <span>
                                        Total Expenses: {jsonData.TotalExpenses}
                                    </span>
                                </Col>
                                <Col>
                                    <span>
                                        Tax Rate for Calcs: {jsonData.TaxRateForCalcs}
                                    </span>
                                </Col>
                            </Row>
                        </Container>

                        <Row className={classes.cardDivider}></Row>
                        <Container className={classes.cardSubSection}>
                            <Row className="align-items-center">
                                <Col>
                                    <span>
                                        General & Administrative Expense: {jsonData.GeneralAndAdministrativeExpense}
                                    </span>
                                </Col>
                                <Col>
                                    <span>
                                        Research & Development: {jsonData.ResearchAndDevelopment}
                                    </span>
                                </Col>
                            </Row>
                            <Row className="align-items-center">
                                <Col>
                                    <span>
                                        Salaries & Wages: {jsonData.SalariesAndWages}
                                    </span>
                                </Col>
                                <Col>
                                    <span>
                                        Interest Expense: {jsonData.InterestExpense}
                                    </span>
                                </Col>
                            </Row>
                            <Row className="align-items-center">
                                <Col>
                                    <span>
                                        Selling & Marketing Expense: {jsonData.SellingAndMarketingExpense}
                                    </span>
                                </Col>
                                <Col>
                                    <span>
                                        Selling General & Administration: {jsonData.SellingGeneralAndAdministration}
                                    </span>
                                </Col>
                            </Row>
                            <Row className="align-items-center mb-2">
                                <Col>
                                    <span>
                                        Amortization: {jsonData.Amortization}
                                    </span>
                                </Col>
                                <Col>
                                    <span>
                                        Write Off: {jsonData.WriteOff}
                                    </span>
                                </Col>
                            </Row>
                            <Row className={classes.cardDivider}></Row>

                            <Row>
                                <Col>
                                    <div style={{ overflowY: 'scroll', overflowX: 'scroll', maxWidth: '500px' }}>
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
                                <Col>
                                    <Line
                                        data={{
                                            labels: labels,
                                            datasets: [
                                                {
                                                    label: "ROS",
                                                    data: ros,
                                                    borderColor: "rgba(75, 192, 192, 1)",
                                                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                                                    type: "line",
                                                    yAxisID: "y1", // Associate with the primary y-axis
                                                    tension: 0.4, // Optional for smooth curves
                                                },
                                                {
                                                    label: "Total Revenue",
                                                    data: revenue,
                                                    backgroundColor: "rgba(54, 162, 235, 0.7)",
                                                    borderColor: "rgba(54, 162, 235, 1)",
                                                    type: "bar",
                                                    yAxisID: "y2", // Associate with the secondary y-axis
                                                },
                                                {
                                                    label: "EBIT",
                                                    data: ebit,
                                                    backgroundColor: "rgba(255, 99, 132, 0.7)",
                                                    borderColor: "rgba(255, 99, 132, 1)",
                                                    type: "bar",
                                                    yAxisID: "y2", // Associate with the secondary y-axis
                                                }
                                            ],
                                        }}
                                        options={{
                                            responsive: true,
                                            scales: {
                                                y1: {
                                                    type: "linear",
                                                    position: "left", // Primary axis
                                                    title: {
                                                        display: true,
                                                        text: "ROS",
                                                    },
                                                    ticks: {
                                                        beginAtZero: true,
                                                    },
                                                },
                                                y2: {
                                                    type: "linear",
                                                    position: "right", // Secondary axis
                                                    title: {
                                                        display: true,
                                                        text: "Total Revenue / EBIT",
                                                    },
                                                    ticks: {
                                                        beginAtZero: true,
                                                    },
                                                    grid: {
                                                        drawOnChartArea: false, // Prevent gridlines overlap
                                                    },
                                                },
                                            },
                                            plugins: {
                                                legend: {
                                                    display: true,
                                                    position: "bottom"
                                                },
                                            },
                                        }}
                                    />
                                </Col>
                            </Row>
                        </Container>

                    </Container>
                </Card.Body>
            </Container >
        </section >

    );
};

export default IncomeStatementComponent;