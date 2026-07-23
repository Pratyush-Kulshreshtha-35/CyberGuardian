const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const axios = require('axios');
const zxcvbn = require('zxcvbn');

async function checkHIBP(password) {
  const hash = crypto.createHash('sha1').update(password).digest('hex').toUpperCase();
  const prefix = hash.slice(0, 5);
  const suffix = hash.slice(5);

  try {
    const response = await axios.get(`https://api.pwnedpasswords.com/range/${prefix}`);
    const hashes = response.data.split('\n');
    for (let line of hashes) {
      const [hashSuffix, count] = line.trim().split(':');
      if (hashSuffix === suffix) {
        return parseInt(count, 10);
      }
    }
    return 0;
  } catch (error) {
    console.error('HIBP check error:', error.message);
    return 0; 
  }
}

function generateAlternatives(password) {
  const chars = '!@#$%^&*';
  const randomChar = chars[Math.floor(Math.random() * chars.length)];
  const randomNum = Math.floor(Math.random() * 100);
  
  return [
    `${password}${randomChar}${randomNum}`,
    `${randomNum}${randomChar}${password}`,
    password.replace(/a/ig, '@').replace(/e/ig, '3').replace(/s/ig, '$') + randomChar
  ];
}

router.post('/check-password', async (req, res) => {
  try {
    const { password, userData = {} } = req.body;
    
    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    const userInputs = [];
    if (userData.name) userInputs.push(...userData.name.split(/\s+/));
    if (userData.dob) userInputs.push(userData.dob);
    
    const result = zxcvbn(password, userInputs);
    
    const breachCount = await checkHIBP(password);
    const suggestedAlternatives = generateAlternatives(password);

    res.json({
      score: result.score, 
      entropy: result.guesses_log10, 
      crackTime: result.crack_times_display.offline_slow_hashing_1e4_per_second, 
      feedback: result.feedback,
      patternMatches: result.sequence.map(seq => ({
        pattern: seq.pattern,
        token: seq.token
      })),
      breachCount,
      suggestedAlternatives
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error analyzing password' });
  }
});

module.exports = router;
