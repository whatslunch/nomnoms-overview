import React from 'react';

const Html = (body, scripts) => `
  <!DOCTYPE html>
  <html>
    <head>
      <title>NomNoms Overview</title>
    </head>
    <body style="margin:0">
      <div id="overview">${body}</div>
    </body>
  </html>
`;

export default Html;