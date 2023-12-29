const Mailjet = require('node-mailjet');
const config = require('../config/config');

const mailjet = new Mailjet({
  apiKey: config.email.mailJet.apiKey,
  apiSecret: config.email.mailJet.apiSecret,
});

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, text) => {
  console.log(config.email.from);
  console.log(config.email.name);
  return await mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: config.email.from,
          Name: config.email.name,
        },
        To: [
          {
            Email: to,
            Name: 'clients',
          },
        ],
        Subject: subject,
        TextPart: subject,
        HTMLPart: text,
      },
    ],
  });
};

/**
 * Send congratulations mail when user finish register
 * @param {string} to
 * @returns {Promise}
 */
const sendCongratulationEmail = async (to) => {
  const subject = 'Bienvenue sur Bouffemap !';
  const text = `
    <p>Votre compte vient d'être créé.</p><br/><br/>

    <p>vous rejoignez notre communauté d'utilisateurs 
    qui profitent de bouffemaps !.</p>`;

  await sendEmail(to, subject, text);
};

/**
 * Send Verification email
 * @param {string} to
 * @param {string} code
 * @returns {Promise}
 */
const sendVerificationEmail = async (to, code) => {
  const subject = 'Verification de votre email !';
  const text = `
    <p>Bonjour Monsieur/Madame, <br/><br/>
    Voici votre code pour verifier votre Email : <strong>${code} </strong><br/> <br/>
    Nous sommes là pour vous aider<br/> <br/>
    Si vous avez besoin de quoi que ce soit, n'hésitez pas à nous contacter.<br/> <br/>

    Cordialement ,<br/> 
    L'équipe Bouffemap</p>`;

  await sendEmail(to, subject, text);
};

/**
 * Send email for reset password
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to, token) => {
  const subject = 'Reset password';
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `http://link-to-app/reset-password?token=${token}`;
  const text = `Cher utilisateur,
Pour réinitialiser votre mot de passe, cliquez sur ce lien: ${resetPasswordUrl}
Si vous n'avez demandé aucune réinitialisation de mot de passe, ignorez cet e-mail.`;
  await sendEmail(to, subject, text);
};
module.exports = {
  sendCongratulationEmail,
  sendVerificationEmail,
  sendResetPasswordEmail,
};
