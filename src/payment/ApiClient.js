import React, { Component } from 'react';

class ApiClient extends Component {
  static sendGetRequest(url, token, callback) {
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Request failed with code: ${response.status}`);
        }
        return response.text();
      })
      .then(responseBody => {
        callback.onResponseReceived(responseBody);
      })
      .catch(error => {
        callback.onFailure(error);
      });
  }

  static sendPostRequest(url, payload, token, callback) {
    console.log('payload',payload)
    console.log('url',url)
    fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Request failed with code: ${response.status}`);
        }
        return response.text();
      })
      .then(processResponse => {
        callback.onResponseReceived(processResponse);
      })
      .catch(error => {
        callback.onFailure(error);
        console.error("API request failed:", error); // Log the entire error object
  if (error.response) {
    console.error("Response data:", error.response.message); // Log the response data
    console.error("Response status:", error.response.result); // Log the status
  } else if (error.request) {
    console.error("No response received:", error.request);
  } else {
    console.error("Error message:", error.message);
  }
      });
  }
}

export default ApiClient;
