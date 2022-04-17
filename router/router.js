const express = require("express");

const Quiz = require("../modal/Quiz");
const router = express.Router();

router.get("/get", async (req, res) => {
  try {
    const data = await Quiz.find();
    if (data) {
      res.status(200).json(data);
    }
  } catch (err) {
    res.status(400).json({ error: "Cannot Get" });
  }
});

router.post("/add", async (req, res) => {
  try {
    const newQuiz = new Quiz({
      ques: req.body.ques,
      a1: req.body.a1,
      a2: req.body.a2,
      a3: req.body.a3,
      a4: req.body.a4,
      correct: req.body.correct,
    });
    await newQuiz.save();
    res.status(201).json({ message: "Quiz Added!!" });
  } catch (err) {
    res.status(400).json({ error: "Adding Failed!!" });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Quiz.findById(id);
    if (data) {
      await Quiz.findByIdAndUpdate(id, {
        ques: req.body.ques,
        a1: req.body.a1,
        a2: req.body.a2,
        a3: req.body.a3,
        a4: req.body.a4,
        correct: req.body.correct,
      });
      res.status(200).json({ message: "Quiz Updated!!" });
    }
  } catch (err) {
    res.status(400).json({ error: "Update Failed!!" });
  }
});
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Quiz.findById(id);
    if (data) {
      await Quiz.findByIdAndDelete(id);
      res.status(200).json({ message: "Quiz Deleted!!" });
    }
  } catch (err) {
    res.status(400).json({ error: "Delete Failed!!" });
  }
});

module.exports = router;
