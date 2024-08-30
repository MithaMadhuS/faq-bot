const tf = require('@tensorflow/tfjs');
const natural = require('natural');
const cosineSimilarity = require('cosine-similarity');
const faqData = {
  "What is your name?": "I am an FAQ bot.",
  "How can I help you?": "You can ask me any question.",
  "What is the weather today?": "I don't have weather data right now."
};

// Preprocess the data
const questions = Object.keys(faqData);
const answers = Object.values(faqData);

// Tokenizer
const tokenizer = new natural.WordTokenizer();

// Vectorize the questions
const vectorize = (text) => {
    const tokens = tokenizer.tokenize(text.toLowerCase());
    const uniqueTokens = [...new Set(tokens)];
    return uniqueTokens.map(token => tokens.filter(t => t === token).length);
};

const questionVectors = questions.map(vectorize);

const getAnswer = (userQuestion) => {
    const userVector = vectorize(userQuestion);
    const similarities = questionVectors.map(qVector => cosineSimilarity(userVector, qVector));
    const closestQuestionIndex = similarities.indexOf(Math.max(...similarities));
    return answers[closestQuestionIndex];
};

exports.askQuestion = async (req, res) => {
  const { question } = req.body;
  // Implement your TensorFlow.js model logic here
  let ans = getAnswer(question)
  res.json({ answer: ans  });
};
