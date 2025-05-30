import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Card, Container, Row, Col } from "react-bootstrap";
import { Line } from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

import classes from "../css/Stock.module.css";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const StockQueries = () => {
    const [chartData, setChartData] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3001/api/queries/${id}`)
            .then((response) => {
                const data = response.data;

                const filtered = data.filter(d => d.AR_Days !== null);
                const labels = filtered.map(d => d.year);

                const chartData = {
                    labels,
                    datasets: [
                        {
                            label: 'AR Days (Company)',
                            data: filtered.map(d => d.AR_Days),
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            tension: 0.4,
                        },
                        {
                            label: 'AR Days (Sector Avg)',
                            data: filtered.map(d => d.Avg_Sector_AR_Days),
                            borderColor: 'rgba(0, 102, 255, 1)',
                            backgroundColor: 'rgba(0, 102, 255, 0.2)',
                            borderDash: [5, 5],
                            tension: 0.4,
                        },
                        {
                            label: 'AP Days (Company)',
                            data: filtered.map(d => d.AP_Days),
                            borderColor: 'rgba(255, 99, 132, 1)',
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            tension: 0.4,
                        },
                        {
                            label: 'AP Days (Sector Avg)',
                            data: filtered.map(d => d.Avg_Sector_AP_Days),
                            borderColor: 'rgba(255, 159, 64, 1)',
                            backgroundColor: 'rgba(255, 159, 64, 0.2)',
                            borderDash: [5, 5],
                            tension: 0.4,
                        },
                        {
                            label: 'Inventory Days (Company)',
                            data: filtered.map(d => d.Inventory_Days),
                            borderColor: 'rgba(153, 102, 255, 1)',
                            backgroundColor: 'rgba(153, 102, 255, 0.2)',
                            tension: 0.4,
                        },
                        {
                            label: 'Inventory Days (Sector Avg)',
                            data: filtered.map(d => d.Avg_Sector_Inventory_Days),
                            borderColor: 'rgba(201, 203, 207, 1)',
                            backgroundColor: 'rgba(201, 203, 207, 0.2)',
                            borderDash: [5, 5],
                            tension: 0.4,
                        },
                    ],
                };

                setChartData(chartData);
            })
            .catch((error) => {
                console.error("Error fetching cycle time data:", error);
            });
    }, [id]);

    if (!chartData) {
        return <p>Loading chart...</p>;
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "bottom",
            },
            title: {
                display: true,
                text: 'Cycle Time Metrics vs Sector Average',
                font: {
                    size: 16
                }
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        let value = context.raw || 0;
                        return `${context.dataset.label}: ${value.toFixed(1)} days`;
                    },
                },
            },
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: "Days",
                    font: {
                        size: 14,
                        weight: "bold",
                    },
                },
            },
            x: {
                title: {
                    display: true,
                    text: "Year",
                },
            }
        }
    };

    return (
        <section>
            <Container>
                <Card.Body>
                    <Container className='mb-2'>
                        <Container className={classes.cardSubSection}>
                            <Row>
                                <Col>
                                    <Line data={chartData} options={options} />
                                </Col>
                            </Row>
                        </Container>
                    </Container>
                </Card.Body>
            </Container>
        </section>
    );
};

export default StockQueries;
