import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import logo from "../assets/GraphQLAI.png";
import {
  Form,
  Button,
  InputGroup,
  Alert,
  Spinner,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import Editor from "@monaco-editor/react";

function Query() {
  const [endpoint, setEndpoint] = useState("");
  const [prompt, setPrompt] = useState("");
  const [graphqlQuery, setGraphqlQuery] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGraphqlQuery("");
    setResult(null);
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://graphql-ai-api.onrender.com/query",
        {
          endpoint,
          prompt,
        }
      );
      if (response.data) {
        setGraphqlQuery(response.data.graphql_query);
        setResult(response.data.result);
      }
    } catch (err) {
      setError(err.response ? err.response.data.error : err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center mb-4">
        <img src={logo} height="60" width="60" className="me-3" alt="logo" />
        <h1 className="graphqlai-blue mb-0">GraphQLAI</h1>
      </div>

      <h3 className="mb-4 text-center graphqlai-blue">
        Natural Language to GraphQL Query Generator
      </h3>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3 text-start" controlId="endpoint">
          <Form.Label className="graphqlai-blue">GraphQL Endpoint:</Form.Label>
          <Form.Control
            type="url"
            placeholder="https://myapi.com/graphql"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3 text-start" controlId="prompt">
          <Form.Label className="graphqlai-blue">Prompt:</Form.Label>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Show me all the movies with their titles"
              aria-label="Enter your query"
              aria-describedby="button-addon2"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <Button variant="primary" type="submit" id="button-addon2">
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />{" "}
                  Generating...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </InputGroup>
        </Form.Group>
      </Form>

      {error && (
        <Alert variant="danger" className="mt-4">
          Error: {error}
        </Alert>
      )}

      <Row className="mt-4">
        <Col md={6} className="d-flex mb-3">
          <Card className="flex-fill h-100">
            <Card.Header className="results">
              Generated GraphQL Query
            </Card.Header>
            <Card.Body style={{ padding: 0 }}>
              <Editor
                height="280px"
                width="400px"
                defaultLanguage="graphql"
                value={graphqlQuery}
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  wordWrap: "on",
                  fontFamily: "'Fira Code', monospace",
                  placeholder: "Your GraphQL query will appear here",
                }}
              />
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="d-flex mb-3">
          <Card className="flex-fill h-100">
            <Card.Header className="results">Query Result</Card.Header>
            <Card.Body style={{ padding: 0 }}>
              <Editor
                height="280px"
                width="400px"
                defaultLanguage="json"
                value={result ? JSON.stringify(result, null, 2) : ""}
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  wordWrap: "on",
                  fontFamily: "'Fira Code', monospace",
                  placeholder: "Your query results will appear here",
                }}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Query;
