import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Card, Container, Row, Col } from "react-bootstrap";

import classes from "../pages/Stock.module.css";
import formatModel from '../utils/formatUtils';

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

const IncomeStatementComponent = () => {
    const [jsonData, setJsonData] = useState([]);
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
                // const inventory = incomeStatementData.map(entry => entry.Inventory);
                const labels = incomeStatementData.map(entry => entry.asOfYear); // Assumes a `date` field exists

                // Calculate ROS
                const ros = ebit.map((ebit, index) =>
                    ebit && revenue[index]
                        ? ebit / revenue[index]
                        : 0
                );

                setROS(ros);
                setTotalRevenue(revenue);
                setEbit(ebit);
                setLabels(labels);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [id]);

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
                                    <Line
                                        data={{
                                            labels: labels,
                                            datasets: [
                                                {
                                                    label: "Quick Ratio",
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
                                                        text: "Quick Ratio",
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
                                                        text: "Current Assets / Liabilities",
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
                                <Col>
                                    <Line
                                        data={{
                                            labels: labels,
                                            datasets: [
                                                {
                                                    label: "Quick Ratio",
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
                                                        text: "Quick Ratio",
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
                                                        text: "Current Assets / Liabilities",
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