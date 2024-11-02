const nodemailer = require("nodemailer");
const { appPass, mailFrom, mailTo, mailHost } = require("./../config/vars");

const transporter = nodemailer.createTransport({
  host: mailHost,
  port: 587,
  secure: false,
  auth: {
    user: mailFrom, // Your Zoho email
    pass: appPass, // Your app-specific password
  },
});

// Function to send contact form email, very simple html mail
async function sendContactEmail(formData) {
  try {
    // Email HTML template
    const htmlTemplate = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { 
                        font-family: Arial, sans-serif; 
                        line-height: 1.6; 
                        color: #333; 
                    }
                    .container { 
                        max-width: 600px; 
                        margin: 0 auto; 
                        padding: 20px; 
                        border: 1px solid #ddd;
                        border-radius: 5px;
                    }
                    .header { 
                        background-color: #2d2d2d; 
                        color: #ffffff; 
                        padding: 20px; 
                        text-align: center;
                        border-radius: 5px 5px 0 0;
                        margin: -20px -20px 20px -20px;
                    }
                    .content {
                        padding: 20px;
                        background-color: #f9f9f9;
                        border-radius: 5px;
                    }
                    .message-box {
                        background-color: #ffffff;
                        padding: 15px;
                        border-radius: 5px;
                        border: 1px solid #eee;
                        margin: 15px 0;
                    }
                    .label {
                        font-weight: bold;
                        color: #555;
                    }
                    .footer {
                        text-align: center;
                        margin-top: 20px;
                        padding-top: 20px;
                        border-top: 1px solid #eee;
                        font-size: 0.9em;
                        color: #666;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>New Portfolio Contact Message</h1>
                    </div>
                    
                    <div class="content">
                        <p><span class="label">From:</span> ${formData.name}</p>
                        <p><span class="label">Email:</span> ${
                          formData.email
                        }</p>
                        <p><span class="label">Subject:</span> ${
                          formData.subject
                        }</p>
                        
                        <div class="message-box">
                            <p class="label">Message:</p>
                            <p>${formData.message.replace(/\n/g, "<br>")}</p>
                        </div>
                        
                        <p><span class="label">Received on:</span> ${new Date().toLocaleString()}</p>
                    </div>
                    
                    <div class="footer">
                        <p>This message was sent from your portfolio contact form.</p>
                    </div>
                </div>
            </body>
            </html>
        `;

    // Configure email options
    const mailOptions = {
      from: mailFrom, // Your Zoho email
      to: mailTo, // Where you want to receive messages
      replyTo: formData.email, // Allow direct reply to sender
      subject: `${formData.subject}`,
      html: htmlTemplate,
      // Plain text version
      text: `
                New Contact Message from portfoli
                
                From: ${formData.name}
                Email: ${formData.email}
                Subject: ${formData.subject}
                
                Message:
                ${formData.message}
                
                Received on: ${new Date().toLocaleString()}
            `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

module.exports = { sendContactEmail };
