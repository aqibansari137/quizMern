import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import "./Quiz.css";
import batch from "../../assets/batch.png";

class Quiz extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      quizList: [
        {
          ques: "",
          a1: "",
          a2: "",
          a3: "",
          a4: "",
          correct: "",
        },
      ],
      quiz: {
        ques: "",
        a1: "",
        a2: "",
        a3: "",
        a4: "",
        correct: "",
      },
      selectedAns: "",
      showNext: false,
      showScore: false,
      disableOption: false,
      score: 0,
    };
  }

  componentDidMount() {
    this.getQuiz();
  }
  getQuiz = async () => {
    try {
      const data = await fetch(`/get`);
      if (data.status === 200) {
        const resp = await data.json();
        console.log(resp);
        this.setState({
          ...this.state,
          quizList: resp,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  nextQues = () => {
    let len = this.state.quizList.length;
    let i = this.state.index;
    if (this.state.index === len - 1) {
      i = 0;
      console.log("yay");
    } else {
      i++;
    }
    this.setState({
      ...this.state,
      index: i,
      showNext: false,
      selectedAns: "",
      disableOption: false,
    });
    if (i == 0) {
      this.setState({
        ...this.state,
        showScore: true,
      });
    }
  };
  setToActive(e) {
    let id = e.target.id;
    document.getElementById("a1").className = "answer";
    document.getElementById("a2").className = "answer";
    document.getElementById("a3").className = "answer";
    document.getElementById("a4").className = "answer";
    document.getElementById(id).className = "answerSelected";
    this.setState({
      ...this.state,
      selectedAns: id,
    });
  }
  checkAnswer(ans) {
    if (this.state.selectedAns !== ans) {
      document.getElementById(this.state.selectedAns).className =
        "answerIncorrect";
    } else {
      this.setState({
        ...this.state,
        score: ++this.state.score,
      });
    }
    document.getElementById(ans).className = "answerCorrect";
    this.setState({
      ...this.state,
      showNext: true,
      disableOption: true,
    });
  }
  onClose() {
    this.setState({
      ...this.state,
      showScore: false,
      score: 0,
      index: 0,
      showNext: false,
      selectedAns: "",
      disableOption: false,
    });
    document.getElementById("a1").className = "answer";
    document.getElementById("a2").className = "answer";
    document.getElementById("a3").className = "answer";
    document.getElementById("a4").className = "answer";
  }

  render() {
    return (
      <div>
        <div className="headers">
          <h1>ReactJS Quiz</h1>
          <div>
            <button
              className="admin"
              onClick={() => this.props.navigate("/admin")}
            >
              Admin
            </button>
          </div>
        </div>
        <div className="quiz" key={this.state.quizList[this.state.index]._id}>
          {this.state.showScore ? (
            <button className="close" onClick={() => this.onClose()}>
              X
            </button>
          ) : (
            ""
          )}
          {this.state.showScore ? (
            <div className="scores">
              <div className="scoreHead">Quiz Result</div>
              <div className="scoreBody">
                <div>
                  <p>Total No.of Question</p>
                  <p>{this.state.quizList.length}</p>
                  <p style={{ color: "green" }}>Correct Answers</p>
                  <p style={{ color: "green" }}>{this.state.score}</p>
                  <p style={{ color: "red" }}>Incorrect Answers</p>
                  <p style={{ color: "red" }}>
                    {this.state.quizList.length - this.state.score}
                  </p>
                </div>
              </div>
              <img src={batch} alt="..." />
            </div>
          ) : (
            ""
          )}
          <div className="quesHead">
            Q{this.state.index + 1} {this.state.quizList[this.state.index].ques}
          </div>
          <div className="answerSection">
            <button
              disabled={this.state.disableOption}
              className="answer"
              onClick={(e) => this.setToActive(e)}
              id="a1"
            >
              {this.state.quizList[this.state.index].a1}
            </button>
            <button
              disabled={this.state.disableOption}
              className="answer"
              onClick={(e) => this.setToActive(e)}
              id="a2"
            >
              {this.state.quizList[this.state.index].a2}
            </button>
            <button
              disabled={this.state.disableOption}
              className="answer"
              onClick={(e) => this.setToActive(e)}
              id="a3"
            >
              {this.state.quizList[this.state.index].a3}
            </button>
            <button
              disabled={this.state.disableOption}
              className="answer"
              onClick={(e) => this.setToActive(e)}
              id="a4"
            >
              {this.state.quizList[this.state.index].a4}
            </button>
          </div>
          {this.state.showNext ? (
            <button onClick={() => this.nextQues()}>
              {this.state.index === this.state.quizList.length - 1
                ? "Finish"
                : "Next"}
            </button>
          ) : (
            <button
              onClick={() =>
                this.checkAnswer(this.state.quizList[this.state.index].correct)
              }
              disabled={this.state.selectedAns === ""}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    );
  }
}

const WithNavigate = (props) => {
  let navigate = useNavigate();
  return <Quiz {...props} navigate={navigate} />;
};

export default WithNavigate;
