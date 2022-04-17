import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
class Admin extends Component {
  constructor() {
    super();
    this.state = {
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
      showAdd: false,
      showUpdate: false,
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
  handleQues = (e) => {
    let name = e.target.name;
    this.setState({
      ...this.state,
      quiz: {
        ...this.state.quiz,
        [name]: e.target.value,
      },
    });
  };

  addQuiz = async () => {
    try {
      const data = await fetch(`/add`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.state.quiz),
      });
      if (data.status === 201) {
        alert("Added Sucssfully!!");
        const resp = await data.json();
        console.log(resp.message);
        this.setState({
          ...this.state,
          quiz: {
            ques: "",
            a1: "",
            a2: "",
            a3: "",
            a4: "",
            correct: "",
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
    this.getQuiz();
  };
  deleteQuiz = async (id) => {
    try {
      const data = await fetch(`/delete/${id}`, {
        method: "delete",
        headers: { "Content-Type": "application/json" },
      });
      if (data.status === 200) {
        const resp = await data.json();
        console.log(resp.message);
        this.getQuiz();
        alert("Deleted Sucssfully!!");
      }
    } catch (err) {
      console.log(err);
    }
  };
  handleUpdate(quiz) {
    this.setState({
      ...this.state,
      quiz: quiz,
      showUpdate: true,
      showAdd: true,
    });
  }
  updateQuiz = async () => {
    try {
      const { _id, ques, a1, a2, a3, a4, correct } = this.state.quiz;
      const data = await fetch(`/update/${_id}`, {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ques, a1, a2, a3, a4, correct }),
      });
      if (data.status === 200) {
        alert("Updated Sucssfully!!");
        const resp = await data.json();
        console.log(resp.message);
      }
    } catch (err) {
      console.log(err);
    }
    this.getQuiz();
  };

  render() {
    return (
      <div>
        <div className="panel">
          <button
            onClick={() =>
              this.setState({
                ...this.state,
                showAdd: true,
                showUpdate: false,
                quiz: {
                  ques: "",
                  a1: "",
                  a2: "",
                  a3: "",
                  a4: "",
                  correct: "",
                },
              })
            }
          >
            ADD
          </button>
          <button
            onClick={() => this.setState({ ...this.state, showAdd: false })}
          >
            SHOW
          </button>
          <button onClick={() => this.props.navigate("/")}>BACK</button>
        </div>
        {this.state.showAdd ? (
          <div className="insert">
            <div style={{ backgroundColor: "bisque" }}>
              <label htmlFor="">Question:</label>
              <input
                placeholder="Enter Question"
                type="text"
                value={this.state.quiz.ques}
                onChange={this.handleQues}
                name="ques"
              />
            </div>
            <div>
              <label htmlFor="">Option 1:</label>
              <input
                placeholder="Enter Option 1"
                type="text"
                value={this.state.quiz.a1}
                onChange={this.handleQues}
                name="a1"
              />
            </div>
            <div>
              <label htmlFor="">Option 2:</label>
              <input
                placeholder="Enter Option 2"
                type="text"
                value={this.state.quiz.a2}
                onChange={this.handleQues}
                name="a2"
              />
            </div>
            <div>
              <label htmlFor="">Option 3:</label>
              <input
                placeholder="Enter Option 3"
                type="text"
                value={this.state.quiz.a3}
                onChange={this.handleQues}
                name="a3"
              />
            </div>
            <div>
              <label htmlFor="">Option 4:</label>
              <input
                placeholder="Enter Option 4"
                type="text"
                value={this.state.quiz.a4}
                onChange={this.handleQues}
                name="a4"
              />
            </div>
            <div>
              <label htmlFor="">Correct Option (a1/a2/a3/a4)</label>
              <input
                placeholder="Enter Correct Option (a1/a2/a3/a4)"
                type="text"
                value={this.state.quiz.correct}
                onChange={this.handleQues}
                name="correct"
              />
            </div>
            {this.state.showUpdate ? (
              <button onClick={() => this.updateQuiz()}>Update</button>
            ) : (
              <button onClick={() => this.addQuiz()}>Add</button>
            )}
          </div>
        ) : (
          <div className="display">
            {this.state.quizList.map((quiz) => {
              return (
                <div key={quiz._id} className="card">
                  <div className="cardHead">
                    <h4>Question: {quiz.ques}</h4>
                  </div>
                  <div className="cardBody">
                    <p>1: {quiz.a1}</p>
                    <p>2: {quiz.a2}</p>
                    <p>3: {quiz.a3}</p>
                    <p>4: {quiz.a4}</p>
                  </div>
                  <div className="cardFooter">
                    <button onClick={() => this.handleUpdate(quiz)}>
                      Update
                    </button>
                    <button onClick={() => this.deleteQuiz(quiz._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

const WithNavigate = (props) => {
  let navigate = useNavigate();
  return <Admin {...props} navigate={navigate} />;
};

export default WithNavigate;
