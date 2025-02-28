import React, { useEffect, useState } from 'react';
import { json, useParams } from "react-router-dom";
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

const PriceGraph = () => {
    const [jsonData, setJsonData] = useState([]);
    const [labels, setLabels] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3001/api/priceData/${id}`)
            .then((response) => {
                const priceData = response.data;

                // Ensure priceData is an array
                if (!Array.isArray(priceData)) {
                    console.error("Expected array but got:", priceData);
                    return;
                }

                // Extract labels (formatted months) and data points
                const formattedLabels = priceData.map((item) =>
                    new Date(item.price_date).toLocaleDateString("en-US", { month: "short", year: "numeric" })
                );
                const adjCloseValues = priceData.map((item) => item.adjclose);

                setLabels(formattedLabels);
                setJsonData(adjCloseValues);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
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
                        <Container className={classes.cardSubSection}>
                            <Row>
                                <Col>
                                    <Line
                                        data={{
                                            labels: labels,
                                            datasets: [
                                                {
                                                    label: "Adj Close",
                                                    data: jsonData,
                                                    borderColor: "rgba(75, 192, 192, 1)",
                                                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                                                    tension: 0.4,
                                                },
                                            ],
                                        }}
                                        options={{
                                            responsive: true,
                                            plugins: {
                                                legend: {
                                                    display: true,
                                                    position: "bottom",
                                                },
                                                tooltip: {
                                                    callbacks: {
                                                        label: (context) => {
                                                            let value = context.raw || 0;
                                                            return `Adj Close: $${value.toFixed(2)}`; // Formats as dollars with 2 decimals
                                                        },
                                                    },
                                                },
                                            },
                                            scales: {
                                                y: {
                                                    title: {
                                                        display: true,
                                                        text: "Adj Close",
                                                        font: {
                                                            size: 14,
                                                            weight: "bold",
                                                        },
                                                    },
                                                    ticks: {
                                                        callback: (value) => {
                                                            return `$${Math.round(value)}`; // Formats as dollars with no decimals
                                                        },
                                                    },
                                                },
                                            },
                                        }}
                                    />
                                </Col>
                            </Row>
                        </Container>
                    </Container>
                </Card.Body>
            </Container>
        </section>
    );

};

export default PriceGraph;