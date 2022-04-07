import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Navigation } from "./Navigation";

const News = () => {
  useEffect(() => {
    fetchNews();
  }, []);

  const [newsList, setNewsList] = useState([]);

  const fetchNews = () => {
    axios
      .get(
        "https://newsapi.org/v2/top-headlines?country=us&apiKey=63480ac4f76e4f17bc0f2afb87bf0be2"
      )
      .then((data) => {
        setNewsList(data.data.articles);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div style={{ backgroundColor: "#e9ecef" }}>
      <Navigation />

      <p style={{ textAlign: "center", fontSize: "3rem", padding: 10 }}>
        Market News Article
      </p>
      {newsList.length > 0
        ? newsList.map((item) => {
            return (
              <>
                <div
                  style={{ padding: 10 }}
                  classnName="shadow p-3 mb-5 bg-white rounded"
                >
                  <Card>
                    <Row className="no-gutters">
                      <Col md={4.2} lg={4.2}>
                        <Card.Img
                          variant="top"
                          src={
                            item.urlToImage
                              ? item.urlToImage
                              : "http://creativemichelle.com/wp-content/plugins/elementor/assets/images/placeholder.png"
                          }
                        />
                      </Col>
                      <Col>
                        <Card.Body>
                          <Card.Title>{item.title}</Card.Title>
                          <Card.Text>Author: {item.author}</Card.Text>
                          <Card.Text>
                            Published On: {item.publishedAt}
                          </Card.Text>
                          <Card.Text>
                            {item.description}
                            {item.content}
                          </Card.Text>
                        </Card.Body>
                      </Col>
                    </Row>
                  </Card>
                </div>
              </>
            );
          })
        : null}
    </div>
  );
};

export default News;
