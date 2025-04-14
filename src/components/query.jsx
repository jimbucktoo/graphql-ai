// src/components/Query.jsx
import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import { Form, Button, Alert, Spinner, Card } from "react-bootstrap";
import AceEditor from "react-ace";

// Use javascript mode as a substitute for GraphQL
import "ace-builds/src-noconflict/mode-javascript";
// You can still use JSON mode for the results
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";

function Query() {
  const [question, setQuestion] = useState("");
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
      // Adjust the URL to match your Flask back-end endpoint.
      const response = await axios.post("http://127.0.0.1:10000/query", {
        question,
      });

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
      <h2 className="mb-4 text-center">Natural Language to GraphQL Query</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="question">
          <Form.Label>Enter your query</Form.Label>
          <Form.Control
            type="text"
            placeholder="Which products have the highest sales?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />{" "}
              Processing...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </Form>

      {error && (
        <Alert variant="danger" className="mt-4">
          Error: {error}
        </Alert>
      )}

      {graphqlQuery && (
        <Card className="mt-4">
          <Card.Header>Generated GraphQL Query</Card.Header>
          <Card.Body>
            <AceEditor
              mode="javascript" // Using "javascript" mode as a fallback
              theme="github"
              name="graphql_query_editor"
              value={graphqlQuery}
              readOnly={true}
              width="100%"
              height="200px"
              setOptions={{
                showLineNumbers: true,
                tabSize: 2,
              }}
            />
          </Card.Body>
        </Card>
      )}

      {result && (
        <Card className="mt-4">
          <Card.Header>Query Result</Card.Header>
          <Card.Body>
            <AceEditor
              mode="json"
              theme="github"
              name="query_result_editor"
              value={JSON.stringify(result, null, 2)}
              readOnly={true}
              width="100%"
              height="200px"
              setOptions={{
                showLineNumbers: true,
                tabSize: 2,
              }}
            />
          </Card.Body>
        </Card>
      )}
    </>
  );
}

export default Query;
