const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { portfolioData } = require('../src/constants/portfolioData');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Configuration du transporteur email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// API pour obtenir les données du portfolio
app.get('/api/portfolio', (req, res) => {
  res.json(portfolioData);
});

// API pour envoyer un email de contact
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  
  try {
    await transporter.sendMail({
      from: email,
      to: portfolioData.personal.email,
      subject: `Nouveau message de ${name}`,
      text: message,
      html: `
        <h3>Nouveau message de contact</h3>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });
    
    res.json({ success: true, message: 'Email envoyé avec succès' });
  } catch (error) {
    console.error('Erreur d\'envoi d\'email:', error);
    res.status(500).json({ success: false, message: 'Erreur lors de l\'envoi de l\'email' });
  }
});

// API pour obtenir les statistiques de visite
app.get('/api/stats', (req, res) => {
  // Simuler des statistiques de visite
  const stats = {
    visits: Math.floor(Math.random() * 1000) + 500,
    uniqueVisitors: Math.floor(Math.random() * 500) + 200,
    averageTime: Math.floor(Math.random() * 5) + 2,
    lastUpdated: new Date().toISOString()
  };
  
  res.json(stats);
});

app.listen(port, () => {
  console.log(`Serveur backend démarré sur le port ${port}`);
}); 