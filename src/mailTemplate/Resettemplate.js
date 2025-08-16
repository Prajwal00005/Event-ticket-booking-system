export const sendResetEmail = (token) => {
  const resetLink = `http://localhost:3000/reset-password?token=${token}`;

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f7;
        margin: 0;
        padding: 0;
        color: #333;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background-color: #fff;
        padding: 30px;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      }
      h1 {
        color: #4a90e2;
        text-align: center;
      }
      p {
        line-height: 1.6;
        font-size: 16px;
      }
      .btn {
        display: inline-block;
        padding: 12px 25px;
        margin-top: 20px;
        background-color: #4a90e2;
        color: #fff;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
      }
      .footer {
        margin-top: 30px;
        text-align: center;
        font-size: 12px;
        color: #888;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Password Reset Request</h1>
      <p>Hello,</p>
      <p>We received a request to reset your password. Click the button below to reset it. If you did not request a password reset, please ignore this email.</p>
      
      <a href="${resetLink}" class="btn">Reset Password</a>

      <p>If the button doesn't work, copy and paste this link into your browser:</p>
      <p><a href="${resetLink}">${resetLink}</a></p>

      <div class="footer">
        <p>&copy; 2025 YourCompany. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `;
};
