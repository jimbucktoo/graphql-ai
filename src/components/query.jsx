import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";
import logo from "../assets/transparent.png";
import "./query.css";

const EDITOR_THEME = "graphqlai-dark";

function defineEditorTheme(monaco) {
  monaco.editor.defineTheme(EDITOR_THEME, {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: {
      "editor.background":              "#0D1117",
      "editor.foreground":              "#E6EDF3",
      "editorLineNumber.foreground":    "#484F58",
      "editorGutter.background":        "#0D1117",
      "editor.lineHighlightBackground": "#00000000",
      "editorCursor.foreground":        "#0d6efd",
      "editor.selectionBackground":     "#0d6efd33",
      "scrollbar.shadow":               "#00000000",
      "scrollbarSlider.background":     "#30363D80",
      "scrollbarSlider.hoverBackground":"#484F5880",
    },
  });
}

const EDITOR_OPTIONS = {
  readOnly: true,
  minimap: { enabled: false },
  wordWrap: "on",
  fontFamily: "'Fira Code', 'Cascadia Code', monospace",
  fontSize: 13,
  fontLigatures: true,
  lineNumbers: "off",
  scrollBeyondLastLine: false,
  renderLineHighlight: "none",
  padding: { top: 16, bottom: 16 },
  scrollbar: {
    verticalScrollbarSize: 5,
    horizontalScrollbarSize: 5,
  },
};

function Query() {
  const [endpoint, setEndpoint]     = useState("");
  const [prompt, setPrompt]         = useState("");
  const [graphqlQuery, setGraphqlQuery] = useState("");
  const [result, setResult]         = useState(null);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState("");
  const [hasResults, setHasResults] = useState(false);

  const executeQuery = useCallback(async () => {
    if (!endpoint.trim() || !prompt.trim() || loading) return;

    setGraphqlQuery("");
    setResult(null);
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://graphql-ai-api.onrender.com/query",
        { endpoint, prompt }
      );
      if (response.data) {
        setGraphqlQuery(response.data.graphql_query);
        setResult(response.data.result);
        setHasResults(true);
      }
    } catch (err) {
      setError(err.response ? err.response.data.error : err.message);
    } finally {
      setLoading(false);
    }
  }, [endpoint, prompt, loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    executeQuery();
  };

  /* Ctrl/Cmd+Enter keyboard shortcut */
  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        executeQuery();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [executeQuery]);

  const canSubmit = endpoint.trim() && prompt.trim() && !loading;

  return (
    <main className="query-page">
      <a href="#query-form" className="skip-link">
        Skip to form
      </a>

      {/* ── Header ── */}
      <header className="app-header">
        <div className="brand">
          <img
            src={logo}
            width="48"
            height="48"
            className="brand-logo"
            alt="GraphQLAI logo"
          />
          <h1 className="brand-name">GraphQLAI</h1>
        </div>
        <p className="brand-tagline">
          Natural Language to GraphQL Query Generator
        </p>
      </header>

      {/* ── Form ── */}
      <section className="form-section" aria-labelledby="form-heading">
        <h2 id="form-heading" className="sr-only">
          Query Form
        </h2>
        <form
          id="query-form"
          onSubmit={handleSubmit}
          noValidate
          aria-busy={loading}
        >
          <div className="field-group">
            <label htmlFor="endpoint" className="field-label">
              GraphQL Endpoint
            </label>
            <input
              id="endpoint"
              type="url"
              className="field-input"
              placeholder="https://myapi.com/graphql"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              autoComplete="url"
              spellCheck={false}
            />
          </div>

          <hr className="field-divider" />

          <div className="field-group">
            <label htmlFor="prompt" className="field-label">
              Natural Language Prompt
            </label>
            <input
              id="prompt"
              type="text"
              className="field-input"
              placeholder="Show me all the movies with their titles"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              autoComplete="off"
            />
            <p className="field-hint">
              Press{" "}
              <kbd>{navigator.platform.includes("Mac") ? "⌘" : "Ctrl"}</kbd>
              {" + "}
              <kbd>Enter</kbd>
              {" "}to generate
            </p>
          </div>

          <button
            type="submit"
            className="btn-generate"
            disabled={!canSubmit}
            aria-label={
              loading
                ? "Generating query, please wait"
                : "Generate GraphQL query from prompt"
            }
          >
            {loading && (
              <span className="btn-spinner" aria-hidden="true" />
            )}
            {loading ? "Generating…" : "Generate Query"}
          </button>
        </form>
      </section>

      {/* ── Error ── */}
      {error && (
        <div className="error-banner" role="alert" aria-atomic="true">
          <span className="error-icon" aria-hidden="true">⚠</span>
          <div>
            <p className="error-title">Request failed</p>
            <p className="error-message">{error}</p>
          </div>
        </div>
      )}

      {/* ── Results ── */}
      {hasResults && (
        <section
          className="results-section"
          aria-label="Query results"
          aria-live="polite"
        >
          <div className="result-card">
            <div className="result-card-header">
              <h2 className="result-card-title">Generated GraphQL Query</h2>
            </div>
            <div
              className="result-card-body"
              aria-label="Monaco editor displaying generated GraphQL query"
            >
              <Editor
                height="320px"
                defaultLanguage="graphql"
                value={graphqlQuery}
                beforeMount={defineEditorTheme}
                theme={EDITOR_THEME}
                options={EDITOR_OPTIONS}
              />
            </div>
          </div>

          <div className="result-card">
            <div className="result-card-header">
              <h2 className="result-card-title">Query Result</h2>
            </div>
            <div
              className="result-card-body"
              aria-label="Monaco editor displaying query result JSON"
            >
              <Editor
                height="320px"
                defaultLanguage="json"
                value={result ? JSON.stringify(result, null, 2) : ""}
                beforeMount={defineEditorTheme}
                theme={EDITOR_THEME}
                options={EDITOR_OPTIONS}
              />
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export default Query;
