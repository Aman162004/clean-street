try {
    const c = require('../controllers/complaintController');
    console.log("Syntax OK! No crashing imports or token errors.");
} catch (err) {
    console.error("Syntax Error or Crash:", err);
}
