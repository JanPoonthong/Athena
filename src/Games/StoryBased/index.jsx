import React, { useState, useEffect } from "react";
import "./text_game.css";
import { scenesFromFile } from "./scenes.js";

let scenes = JSON.parse(localStorage.getItem("data"));
if (scenes !== null) {
  console.log("local storage");
} else {
  scenes = scenesFromFile;
  console.log("not local storage");
}

const StoryBased = () => {
  const [progressCount, setProgressCount] = useState(0);
  const [nextSceneCount, setNextSceneCount] = useState(0);
  const [start, setStart] = useState(true);
  const [next, setNext] = useState(false);
  const [buttonColor, setButtonColor] = useState("");

  console.log(scenes[nextSceneCount]);

  // Increase Progress bar
  useEffect(() => {
    const bar = document.getElementById("bar");
    bar.style.width = progressCount * 12.5 + "%";
  }, [nextSceneCount]);

  const nextScene = () => {
    if (nextSceneCount === scenes.length - 1) {
      return nextSceneCount;
    } else {
      setNextSceneCount(nextSceneCount + 1);
    }
    setStart(false);
  };

  const backScene = (scene) => {
    function isNumber(n) {
      return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
    }
    if (isNumber(scene?.customeBackScene)) {
      setNextSceneCount(scene.customeBackScene);
    } else if (nextSceneCount >= scenes.length - 1) {
      setNextSceneCount(nextSceneCount - 1);
    } else {
      setNextSceneCount(nextSceneCount - 1);
    }
  };

  const submitAnswer = (goToQuestionSceneID, reward) => {
    setTimeout(() => {
      setNextSceneCount(goToQuestionSceneID);
      setProgressCount((point) => (point += reward));
    }, 1000);
  };

  const checkAnswerBackgorundColor = (each) => {
    if (scenes[nextSceneCount].answer === each.option) {
      setButtonColor("green");
    } else {
      setButtonColor("red");
    }
  };

  let isLast = nextSceneCount == scenes.length - 1;

  return (
    <div className="wrapper">
      <div
        style={{
          backgroundImage: `url(${scenes[nextSceneCount]?.background})`,
        }}
        className="Scontainer"
      >
        {/* Button  */}
        {start ? (
          <button className="start_btn" onClick={nextScene}>
            {isLast ? "Done!" : start ? "Start!" : "Next!"}
          </button>
        ) : (
          <button className="next_btn" onClick={nextScene}></button>
        )}

        {isLast || (!start && scenes[nextSceneCount]?.scene !== "start") ? (
          <button
            className="back_btn"
            onClick={() => backScene(scenes[nextSceneCount])}
          ></button>
        ) : null}
        {start ? (
          <h1 className="storyBasedtitle">{scenes[nextSceneCount].text}</h1>
        ) : null}

        {/* Process bar */}
        <div className="progress_wrapper">
          <div className="info">
            <div className="name_container">
              <p className="rank">A</p>
              <p className="name">5 ATHENA</p>
            </div>
            <div className="avatar">
              <img
                src="src/assets/avatar.png"
                alt="avatar"
                className="avatar_img"
              />
            </div>
          </div>
          <div className="progress_container">
            <div className="title">Experience Bar</div>
            <div className="progress">
              <img src="src/assets/exp_img.png" alt="exp" className="exp_img" />
              <div className="progress_bar">
                <div className="bar" id="bar"></div>
                <div className="xp">XP</div>
              </div>
            </div>
          </div>
        </div>

        {start ? (
          <div
            style={{
              backgroundImage: `url(${scenes[nextSceneCount].avatar})`,
              backgroundSize: `${scenes[nextSceneCount].backgroundSize}px`,
            }}
            className="StartPosition"
          ></div>
        ) : (
          <>
            {scenes[nextSceneCount]?.scene === "employee" ? (
              <>
                <div className="employeeSpeakbubble">
                  <p className="hisir">{scenes[nextSceneCount].text}</p>
                </div>
                <div
                  style={{
                    backgroundImage: `url(${scenes[nextSceneCount].avatar})`,
                    backgroundSize: `${scenes[nextSceneCount].backgroundSize}px`,
                  }}
                  className="employeePosition"
                ></div>
              </>
            ) : (
              <div>
                {scenes[nextSceneCount]?.scene === "question" ? (
                  <>
                    {scenes[nextSceneCount].avatar === undefined ? null : (
                      <div
                        style={{
                          backgroundImage: `url(${scenes[nextSceneCount].avatar})`,
                          backgroundSize: `${scenes[nextSceneCount].backgroundSize}px`,
                        }}
                        className="employeePosition"
                      ></div>
                    )}
                    <div className="containerquestion">
                      <div className="questionScene">
                        <p className="questionText">
                          {scenes[nextSceneCount].question}
                        </p>
                      </div>
                      <form id="submitform">
                        <div className="input_container">
                          <input type="radio" id="1" name="radio" />
                          <label
                            onClick={() =>
                              submitAnswer(
                                scenes[nextSceneCount]
                                  .goToQuestionSceneIDOption1,
                                scenes[nextSceneCount].pointOption1
                              )
                            }
                            className="correctanswer"
                            htmlFor="1"
                          >
                            1. {scenes[nextSceneCount].option1}
                          </label>
                        </div>
                        <div className="input_container">
                          <input type="radio" id="2" name="radio" />
                          <label
                            onClick={() =>
                              submitAnswer(
                                scenes[nextSceneCount]
                                  .goToQuestionSceneIDOption2,
                                scenes[nextSceneCount].pointOption2
                              )
                            }
                            className="correctanswer"
                            htmlFor="2"
                          >
                            2. {scenes[nextSceneCount].option2}
                          </label>
                        </div>
                      </form>
                    </div>
                  </>
                ) : (
                  <div>
                    {scenes[nextSceneCount]?.scene === "start" ? (
                      <>
                        <div
                          style={{
                            backgroundImage: `url(${scenes[nextSceneCount].avatar})`,
                            backgroundSize: `${scenes[nextSceneCount].backgroundSize}px`,
                          }}
                          className="StartPosition"
                        ></div>
                        <h1 className="storyBasedtitle">
                          {scenes[nextSceneCount].text}
                        </h1>
                        <button className="start_btn" onClick={nextScene}>
                          Start!
                        </button>
                      </>
                    ) : (
                      <>
                        {scenes[nextSceneCount]?.scene === "time" ? (
                          <div className="timebox">
                            <div className="questionScene">
                              <p className="timetext">
                                {scenes[nextSceneCount].text}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="customerSpeakbubble">
                              <p className="hisir">
                                {scenes[nextSceneCount]?.text}
                              </p>
                            </div>

                            <div
                              style={{
                                backgroundImage: `url(${scenes[nextSceneCount]?.avatar})`,
                                backgroundSize: `${scenes[nextSceneCount]?.backgroundSize}px`,
                              }}
                              className="customerPosition"
                            ></div>
                          </>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default StoryBased;
