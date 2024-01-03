import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {Button, Card, Container, Row, Col, Form, InputGroup, Tabs, Tab,} from "react-bootstrap";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useSelector } from "react-redux";
import axios from "axios";
import Papa from "papaparse";
import moment from "moment";
// import * as d3 from 'd3';
// import axios from 'axios';

import classes from "./Stock.module.css";

import PageContainer from "../containers/PageContainer";
import CashFlow from "../components/CashFlow";

const Stock = () => {
  const user = useSelector((state) => state.auth.user);
  const user_id = useSelector((state) => state.auth.user_id);
  const portfolioIds = useSelector((state) => state.auth.portfolioIds);
  const [stock, setValuation] = useState([]);
  const [comment, setComment] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const [added, setAdded] = useState([]);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    // Make a GET request to API endpoint by stock ID
    axios
      .get(`http://localhost:3001/api/metaData/${id}`)
      .then((response) => {
        const stock = response.data;
        console.log(stock);
        const formattedData = {
          ...stock,
          Assessment_Date: moment(stock.Assessment_Date).format("M/DD/YYYY"),
          exDividendDate: moment(stock.exDividendDate).format("M/DD/YYYY"),
          previousClose: parseFloat(stock.previousClose).toFixed(2),
          previousCloseFloat: stock.previousClose,
          dividendRate: parseFloat(stock.dividendRate).toFixed(2),
          beta: parseFloat(stock.beta).toFixed(2),
          CAGR_CPS: parseFloat(stock.CAGR_CPS).toFixed(2),
          NOM_CPS: parseFloat(stock.NOM_CPS).toFixed(2),
          CON_CPS: parseFloat(stock.CON_CPS).toFixed(2),
          CONF_NOM: parseFloat(stock.CONF_NOM).toFixed(0),
          debtToEquity: parseFloat(stock.debtToEquity).toFixed(1) + "%",
          toolTip_CONF_CAGR:
            "CAGR Confidence: " + parseFloat(stock.CONF_CAGR).toFixed(0),
          marketCap: stock.marketCap.toLocaleString("en-US"),
          sharesOutstanding: stock.sharesOutstanding.toLocaleString("en-US"),
          Terminal_Rate: (stock.Terminal_Rate * 100).toFixed(1) + "%",
          WACC: (stock.WACC * 100).toFixed(1) + "%",
          toolTip_Swing_NOM:
            "NOM-CON Swing: " + (stock.Swing_NOM * 100).toFixed(1) + "%",
          dividendYield: (stock.dividendYield * 100).toFixed(1) + "%",
          toolTip_TerminalValue_NOM:
            "NOM Terminal Value: " +
            stock.TerminalValue_NOM.toLocaleString("en-US"),
          toolTip_NPV_Total_NOM:
            "NOM NPV: " + stock.NPV_Total_NOM.toLocaleString("en-US"),
        };
        setValuation(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    // set up svg
    // set up scaling
    // set up the axes
    // set up the data for svg
  }, [id]); // include "id" in the dependency array

  const newPortfolioStock = async (event) => {
    if (user && id) {
      const response = await fetch(
        `http://localhost:3001/api/valuations/${id}/add-stock`,
        {
          method: "POST",
          body: JSON.stringify({
            user_id,
            valuation_id: id,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        console.log("button pushed, stock id sent!");
        setAdded(id);
      } else {
        alert(response.statusText);
      }
    }
  };

  // const svgRef = useRef();

  // useEffect to fetch comments initially and whenever the component mounts or comments are posted
  useEffect(() => {
    fetchComments();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const fetchComments = async () => {
    // Make a GET request to API endpoint by stock ID
    axios
      .get(`http://localhost:3001/api/comments/${id}`)
      .then((response) => {
        const commentData = response.data.map((comment) => ({
          ...comment,
        }));
        setComment(commentData);
        console.log(commentData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleEditClick = (index) => {
    setIsEditing(index);
    setEditedComment(comment[index].comment);
  };

  const handleSaveClick = async (commentId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/comments/${commentId}`,
        {
          method: "PUT",
          body: JSON.stringify({
            user_id,
            valuation_id: id,
            comment: editedComment,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("Comment edited successfully!");
        fetchComments();
        setIsEditing(null);
      } else {
        console.log("Error editing comment:", response.statusText);
        alert(response.statusText);
      }
    } catch (error) {
      console.error("Error editing comment:", error);
      alert("Error editing comment. Please try again.");
    }
  };

  const handleCancelClick = () => {
    setIsEditing(null);
    setEditedComment("");
  };

  const handleInputChange = (e) => {
    setEditedComment(e.target.value);
  };

  const newComment = async (event) => {
    const commentText = document.getElementById("commentText").value.trim();
    console.log(commentText);
    if (user && id && commentText) {
      const response = await fetch(`http://localhost:3001/api/comments`, {
        method: "POST",
        body: JSON.stringify({
          user_id,
          valuation_id: id,
          comment: commentText,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log("button pushed, comment sent!");
        fetchComments();
      } else {
        console.log("uh oh, comment did not log :(");
        alert(response.statusText);
      }
    } else {
      console.log("did not meet criteria :(");
    }
  };

  const deleteComment = async (commentId) => {
    if (user && id) {
      const response = await fetch(
        `http://localhost:3001/api/comments/${commentId}`,
        {
          method: "DELETE",
          body: JSON.stringify({
            user_id,
            valuation_id: id,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        console.log("button pushed, comment to be deleted!");
        fetchComments();
      } else {
        console.log("uh oh, comment did not delete :(");
        alert(response.statusText);
      }
    } else {
      console.log("did not meet criteria :(");
    }
  };

  const downloadCsv = () => {
    // convert stock data to CSV format
    const stockArray = [stock];
    const csv = Papa.unparse(stockArray);

    // trigger download option
    downloadFile(csv, "data.csv");
  };

  const downloadFile = (content, filename) => {
    const blob = new Blob([content], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <PageContainer title="Stock Details">
      <section>
        <Container>
          <Row lg={1}>
            <Card className="mb-3">
              <Card.Header>
                <Row className="align-items-center">
                  <h1 className="d-flex bd-highlight">
                    <div
                      className="p-2 flex-grow-1 bd-highlight"
                      href={stock.website}
                      style={{ textDecoration: "none !important" }}
                    >
                      <Link
                        to={stock.website}
                        className={classes.stockHeader}
                        target="_blank"
                      >
                        {stock.Ticker}
                      </Link>
                    </div>
                    <div className="p-2 bd-highlight align-items-center">
                      {user ? (
                        <div>
                          {added.includes(stock.id) ||
                          portfolioIds.includes(stock.id) ? (
                            <div
                              className="p-3 bd-highlight align-items-center"
                              style={{ fontSize: "14px" }}
                            >
                              Added!
                            </div>
                          ) : (
                            <Button onClick={() => newPortfolioStock()}>
                              Add Stock
                            </Button>
                          )}
                        </div>
                      ) : null}
                    </div>
                    <div className="p-2 bd-highlight">
                      <Button
                        onClick={downloadCsv}
                        style={{ fontSize: "14px" }}
                      >
                        &#11123;
                      </Button>
                    </div>
                  </h1>
                </Row>
              </Card.Header>
              <Tabs
                defaultActiveKey="home"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                <Tab eventKey="home" title="Home">
                  <Card.Body>
                    <Container>
                      <Row>
                        <Col>Previous Close: {stock.previousClose}</Col>
                        <Col>
                          <span data-tooltip-id="cagr-conf-tooltip">
                            CAGR Estimate: {stock.CAGR_CPS}
                          </span>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <span data-tooltip-id="nom-con-tooltip">
                            Nominal Estimate: {stock.NOM_CPS}
                          </span>
                        </Col>
                        <Col>
                          <span data-tooltip-id="nom-con-tooltip">
                            Conservative Estimate: {stock.CON_CPS}
                          </span>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col>
                          <span>Confidence: {stock.CONF_NOM}</span>
                        </Col>
                        {Number(stock.dividendRate) ? (
                          <Col>
                            <span data-tooltip-id="ex-dividend-tooltip">
                              Dividend: {stock.dividendRate + " "}
                            </span>
                            <span style={{ fontSize: "10px" }}>
                              ({stock.dividendYield})
                            </span>
                          </Col>
                        ) : null}
                      </Row>
                    </Container>
                    <Row className={classes.cardDivider}></Row>

                    <Container className={classes.cardSubSection}>
                      <Row>
                        <Col>Market Cap: {stock.marketCap}</Col>
                        <Col>Shares Outstanding: {stock.sharesOutstanding}</Col>
                      </Row>
                      <Row>
                        <Col>
                          <span data-tooltip-id="terminal-value-tooltip">
                            Terminal Rate: {stock.Terminal_Rate}
                          </span>
                        </Col>
                        <Col>
                          <span data-tooltip-id="nom-npv-tooltip">
                            WACC: {stock.WACC}
                          </span>
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col>
                          <span>Beta: {stock.beta}</span>
                        </Col>
                        <Col>
                          <span>Debt:Equity: {stock.debtToEquity}</span>
                        </Col>
                      </Row>
                    </Container>
                    <Row className={classes.cardDivider}></Row>

                    <Container className={classes.cardSubSection}>
                      <Card.Header className={classes.commentHeader}>
                        Comments
                      </Card.Header>
                      <Card.Body>
                        {comment.map((comment, index) => (
                          <div key={comment.id} className="align-items-center">
                            <Card.Header>
                              <Row className="align-items-center">
                                <div className="d-flex bd-highlight">
                                  <div className="flex-grow-1 bd-highlight">
                                    {comment.user.username}
                                  </div>
                                  {user && user_id === comment.user.id ? (
                                    <div className="bd-highlight">
                                      {isEditing === index ? (
                                        <>
                                          <Button variant="outline-secondary" style={{marginRight:"8px"}} onClick={() => handleSaveClick(comment.id)}>
                                            Save
                                          </Button>
                                          <Button variant="outline-danger" style={{marginRight:"8px"}} onClick={handleCancelClick}>
                                            Cancel
                                          </Button>
                                        </>
                                      ) : (
                                        <Button variant="outline-secondary" style={{marginRight:"8px"}} onClick={() => handleEditClick(index)}>
                                          Edit
                                        </Button>
                                      )}
                                      <Button variant="outline-danger" onClick={() => deleteComment(comment.id)}>
                                        Delete
                                      </Button>
                                    </div>
                                  ) : null}
                                </div>
                              </Row>
                            </Card.Header>
                            <Card.Body
                              className={
                                isEditing === index
                                  ? "commentBodyEditing"
                                  : classes.commentBody
                              }
                            >
                              {isEditing === index ? (
                                <Form.Control
                                  value={editedComment}
                                  onChange={handleInputChange}
                                />
                              ) : (
                                <>{comment.comment}</>
                              )}
                            </Card.Body>
                          </div>
                        ))}
                      </Card.Body>
                      {user ? (
                        <div>
                          <InputGroup className="mb-3">
                            <Form.Control
                              placeholder="Enter your comment!"
                              aria-label="Recipient's username"
                              aria-describedby="basic-addon2"
                              id="commentText"
                            />
                            <Button
                              variant="outline-secondary"
                              id="button-addon2"
                              onClick={() => newComment()}
                            >
                              Submit
                            </Button>
                          </InputGroup>
                        </div>
                      ) : null}
                    </Container>
                  </Card.Body>
                </Tab>
                <Tab eventKey="balanceSheet" title="Balance Sheet">
                  Balance Sheet Content
                </Tab>
                <Tab eventKey="incomeStatement" title="Income Statement">
                  Income Statement Content
                </Tab>
                <Tab eventKey="cashFlow" title="Cash Flow">
                  <CashFlow />
                </Tab>
              </Tabs>
            </Card>
          </Row>

          {/* <div>
            <svg ref={svgRef}></svg>
          </div> */}

          {error ? <p>{error}</p> : null}
        </Container>
        <ReactTooltip
          id="nom-con-tooltip"
          place="bottom"
          content={stock.toolTip_Swing_NOM}
        />
        <ReactTooltip
          id="terminal-value-tooltip"
          place="bottom"
          content={stock.toolTip_TerminalValue_NOM}
        />
        <ReactTooltip
          id="nom-npv-tooltip"
          place="bottom"
          content={stock.toolTip_NPV_Total_NOM}
        />
        <ReactTooltip
          id="cagr-conf-tooltip"
          place="bottom"
          content={stock.toolTip_CONF_CAGR}
        />
        <ReactTooltip
          id="ex-dividend-tooltip"
          place="bottom"
          content={stock.exDividendDate}
        />
      </section>
    </PageContainer>
  );
};

export default Stock;
