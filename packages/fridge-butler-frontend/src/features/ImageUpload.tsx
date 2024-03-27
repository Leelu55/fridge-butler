import React, { useState } from 'react';
import './ImageUpload.css'; // Make sure this CSS file exists and is styled according to your preferences

function ImageUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [response, setResponse] = useState('');
  const [prompt, setPrompt] = useState('');

  // Handler for file input change event
  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    } else {
      setFile(null);
      setPreviewUrl(null);
    }
  };

  // Handler for form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      alert('Please select a file before submitting.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('prompt', prompt); // Add prompt to the form data

    try {
      const response = await fetch('http://localhost:3000/uploads', {
        method: 'POST',
        body: formData,
      });
      const message = await response.text();
      setResponse(message);
    } catch (error) {
      console.error('Error uploading image:', error);
      setResponse('Error fetching response from server.');
    }
  };

// Function to render the response content as individual components without bullets
const renderResponseContent = (content: string) => {
  const formattedContent = content
    .split('\n') // Split the content by newline
    .map((item, index) => <span key={index}>{item.replace(/^- /, '')}</span>); // Map each item to a span, removing the dash
  return <div>{formattedContent}</div>; // Wrap the items in a div
};

  return (
    <div className="upload-container">
      <form onSubmit={handleSubmit} className="upload-form">
        {previewUrl && <img src={previewUrl} alt="Preview" className="image-preview" />}
        <input type="file" onChange={handleFileChange} />
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter prompt"
          className="prompt-input"
        />
        <button type="submit" className="submit-button">Upload Image</button>
      </form>
      <div className="response">
        <h2>Response:</h2>
        {response ? renderResponseContent(JSON.parse(response).content) : 'No response yet.'}
      </div>
    </div>
  );
}

export default ImageUpload;
