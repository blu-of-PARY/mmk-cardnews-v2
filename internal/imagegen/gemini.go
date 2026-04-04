package imagegen

import (
	"bytes"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"time"
)

const (
	DefaultModel   = "gemini-3.1-flash-image-preview"
	defaultBaseURL = "https://generativelanguage.googleapis.com/v1beta"
	defaultTimeout = 120 * time.Second
)

type Client struct {
	APIKey  string
	Model   string
	BaseURL string
	HTTP    *http.Client
}

type GenerateOpts struct {
	Prompt       string
	OutputPath   string
	AspectRatio  string
	ImageSize    string
}

type Result struct {
	Success    bool   `json:"success"`
	OutputPath string `json:"output_path,omitempty"`
	FileSizeKB float64 `json:"file_size_kb,omitempty"`
	Model      string `json:"model"`
	Error      string `json:"error,omitempty"`
	Message    string `json:"message,omitempty"`
}

func NewClient(apiKey, model string) *Client {
	if model == "" {
		model = DefaultModel
	}
	return &Client{
		APIKey:  apiKey,
		Model:   model,
		BaseURL: defaultBaseURL,
		HTTP:    &http.Client{Timeout: defaultTimeout},
	}
}

func (c *Client) Generate(opts GenerateOpts) (*Result, error) {
	reqBody := c.buildRequest(opts)

	bodyBytes, err := json.Marshal(reqBody)
	if err != nil {
		return nil, fmt.Errorf("marshal request: %w", err)
	}

	url := fmt.Sprintf("%s/models/%s:generateContent?key=%s", c.BaseURL, c.Model, c.APIKey)
	req, err := http.NewRequest("POST", url, bytes.NewReader(bodyBytes))
	if err != nil {
		return nil, fmt.Errorf("create request: %w", err)
	}
	req.Header.Set("Content-Type", "application/json")

	resp, err := c.HTTP.Do(req)
	if err != nil {
		return nil, fmt.Errorf("api request: %w", err)
	}
	defer resp.Body.Close()

	respBytes, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("read response: %w", err)
	}

	if resp.StatusCode != http.StatusOK {
		return &Result{
			Success: false,
			Model:   c.Model,
			Error:   fmt.Sprintf("HTTP_%d", resp.StatusCode),
			Message: string(respBytes),
		}, nil
	}

	imageBytes, err := extractImage(respBytes)
	if err != nil {
		return &Result{
			Success: false,
			Model:   c.Model,
			Error:   "NO_IMAGE",
			Message: err.Error(),
		}, nil
	}

	if err := saveImage(imageBytes, opts.OutputPath); err != nil {
		return nil, fmt.Errorf("save image: %w", err)
	}

	absPath, _ := filepath.Abs(opts.OutputPath)
	return &Result{
		Success:    true,
		OutputPath: absPath,
		FileSizeKB: float64(len(imageBytes)) / 1024.0,
		Model:      c.Model,
	}, nil
}

func (c *Client) buildRequest(opts GenerateOpts) map[string]any {
	req := map[string]any{
		"contents": []map[string]any{
			{
				"parts": []map[string]any{
					{"text": "CRITICAL: Generate an image with absolutely NO text, NO letters, NO words, NO numbers, NO watermarks, NO logos, NO typography, NO captions, NO labels anywhere in the image. The image must be purely visual with zero text elements.\n\n" + opts.Prompt},
				},
			},
		},
		"generationConfig": map[string]any{
			"responseModalities": []string{"IMAGE", "TEXT"},
		},
	}

	imgConfig := map[string]any{}
	if opts.AspectRatio != "" {
		imgConfig["aspectRatio"] = opts.AspectRatio
	}
	if opts.ImageSize != "" {
		imgConfig["imageSize"] = opts.ImageSize
	}
	if len(imgConfig) > 0 {
		req["generationConfig"].(map[string]any)["imageConfig"] = imgConfig
	}

	return req
}

type apiResponse struct {
	Candidates []struct {
		Content struct {
			Parts []struct {
				Text       string `json:"text,omitempty"`
				InlineData *struct {
					MimeType string `json:"mimeType"`
					Data     string `json:"data"`
				} `json:"inlineData,omitempty"`
			} `json:"parts"`
		} `json:"content"`
	} `json:"candidates"`
}

func extractImage(respBytes []byte) ([]byte, error) {
	var resp apiResponse
	if err := json.Unmarshal(respBytes, &resp); err != nil {
		return nil, fmt.Errorf("parse response: %w", err)
	}

	for _, candidate := range resp.Candidates {
		for _, part := range candidate.Content.Parts {
			if part.InlineData != nil && part.InlineData.Data != "" {
				decoded, err := base64.StdEncoding.DecodeString(part.InlineData.Data)
				if err != nil {
					return nil, fmt.Errorf("decode image: %w", err)
				}
				return decoded, nil
			}
		}
	}

	return nil, fmt.Errorf("API returned no image in response")
}

func saveImage(data []byte, path string) error {
	dir := filepath.Dir(path)
	if err := os.MkdirAll(dir, 0o755); err != nil {
		return err
	}
	return os.WriteFile(path, data, 0o644)
}
