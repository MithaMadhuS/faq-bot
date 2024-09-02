/**
 * This method uses 2 JS libraries natural and cosine-similarity to answer questions. 
 * First it tokenizes the user's question and then vectorizes it. The cosine-similarity method is then used to find the closest question and return the answer.
 */
// const natural = require('natural');
// const cosineSimilarity = require('cosine-similarity');
// const faqData = {
//   "What is your name?": "I am an FAQ bot.",
//   "How can I help you?": "You can ask me any question.",
//   "What is the weather today?": "I don't have weather data right now."
// };

// // Preprocess the data
// const questions = Object.keys(faqData);
// const answers = Object.values(faqData);

// // Tokenizer
// const tokenizer = new natural.WordTokenizer();

// // Vectorize the questions
// const vectorize = (text) => {
//     const tokens = tokenizer.tokenize(text.toLowerCase());
//     const uniqueTokens = [...new Set(tokens)];
//     return uniqueTokens.map(token => tokens.filter(t => t === token).length);
// };

// const questionVectors = questions.map(vectorize);

// const getAnswer = (userQuestion) => {
//     const userVector = vectorize(userQuestion);
//     const similarities = questionVectors.map(qVector => cosineSimilarity(userVector, qVector));
//     const closestQuestionIndex = similarities.indexOf(Math.max(...similarities));
//     return answers[closestQuestionIndex];
// };

// exports.askQuestion = async (req, res) => {
//   const { question } = req.body;
//   // Implement your TensorFlow.js model logic here
//   let ans = getAnswer(question)
//   res.json({ answer: ans  });
// };


/**
 * This method uses Tensorflow's BERT model for NLP
 * 
 * eg- HIT localhost:3000/faq/ask
 * with body:
 * {
    "question" : "What are you here for?",
    "context": "I am a Teacher. My name is Madhu. I am here to teach you."
  }
 */
const qna = require('@tensorflow-models/qna');
const tf = require('@tensorflow/tfjs');

async function loadModel() {
  const model = await qna.load();
  return model;
}

async function getAnswer(model, question, context) {
  const answers = await model.findAnswers(question, context);
  return answers;
}

exports.askQuestion = async (req, res) => {
  try {
    const { question, context } = req.body;
    const model = await loadModel();
    const ans = await getAnswer(model, question, context);
    console.log(ans, "ans");
    res.json({ answer: ans });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
};