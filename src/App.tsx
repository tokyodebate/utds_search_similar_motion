import cosSimilarity from "cos-similarity";
import React, { useState } from "react";
import "./App.css";
import datastructure from "./data/datastructure.json";
import datastructureSimple from "./data/datastructure_simple.json";
import allVectors from "./data/round.json";
import pic from "./utdslogo.png";
import { quotes } from "./quote";


export function Slide(props) {
  if (props.flag) return <div className="slide">{props.flag}</div>;
  else {
    return <></>;
  }
}
export function NationalModal(props) {
  let json_dict = datastructure["national"][props.index];
  if (true) {
    return (
      <div className="sets" key={props.index}>
        <div className="titles">{json_dict.title}</div>
        {Object.values(json_dict.rounds).map((e) => {
          return (
            <>
              <div className="set">
                <div className="parant">
                  <div className="child1">
                    <div className="title2">{e.round}</div>
                    <div className="motion2">{e.motion}</div>
                    <Slide flag={e.slide} />
                  </div>
                </div>
              </div>
            </>
          );
        })}

        <div className="index-close">
          <div className="index">
            {props.index}/{datastructure["national"].length}
          </div>
          {/* <button className="close" onClick = {() => {}}>↑</button> */}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
export function InternationalModal(props) {
  let json_dict = datastructure["international"][props.index];
  if (true) {
    return (
      <div className="sets" key={props.index}>
        <div className="titles">{json_dict.title}</div>
        {Object.values(json_dict.rounds).map((e) => {
          return (
            <>
              <div className="set">
                <div className="parant">
                  <div className="child1">
                    <div className="title2">{e.round}</div>
                    <div className="motion2">{e.motion}</div>
                    <Slide flag={e.slide} />
                  </div>
                </div>
              </div>
            </>
          );
        })}
        <div className="index-close">
          <div className="index">
            {props.index}/{datastructure["international"].length}
          </div>
          {/* <button className="close">↑</button> */}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}

export function SearchModal(props) {
  // if (isClicked){
  if (props.started) {
    return (
      <div className="sets">
        {props.ranks.map((e) => {
          return (
            <>
              <div className="set">
                <div className="parant">
                  <div className="child1">
                    <div className="title">
                      {datastructureSimple.data.find((v) => v.id == e).title +
                        " / " +
                        datastructureSimple.data.find((v) => v.id == e).round}
                    </div>
                    <div className="motion">
                      {datastructureSimple.data.find((v) => v.id == e).motion}
                    </div>
                    <Slide
                      flag={
                        datastructureSimple.data.find((v) => v.id == e).slide
                      }
                    />
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    );
  } else {
    return <></>;
  }
}

interface AppProps {}
function App({}: AppProps) {
	const initialText = quotes[Math.floor(Math.random() * quotes.length)];

  const [text, setText] = useState<string>(initialText);
  const [ranks, setRanks] = useState<Array<number>>([]);
  const [isClicked, setIsClicked] = useState(false);
  const [nationalIndex, setNationalIndex] = useState(0);
  const [internationalIndex, setInternationalIndex] = useState(0);
  const [nationalIsClicked, setNationalIsClicked] = useState(true);
  const [internationalIsClicked, setInternationalIsClicked] = useState(true);
  const [isWaiting, setIsWaiting] = useState(false);
  const [l, setL] = useState(15);
  const [Length, setLLength] = useState(10);
  const [isSearch, setIsSearch] = useState(false);

  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);

  if (loading) {
    return <div>{loading ? "loading..." : <></>}</div>;
  }

  function text2embed() {
    if (true) {
      use.load().then((model) => {
        const sentences = [text];
        model.embed(sentences).then(async (embeddings) => {
          setLoading(true);
          embeddings.print(true);
          let vec = await embeddings.array();
          let similarities = {};
          let similarity = -1;
          for (let i = 0; i < allVectors.length; i++) {
            let vecs = allVectors[i];
            similarity = cosSimilarity(vec[0], vecs);
            similarities[i] = similarity;
          }
          let arr = similarities;
          var keys = [];
          for (let key in arr) keys.push(key);
          function compare(a, b) {
            return arr[b] - arr[a];
          }
          let result = [];
          keys.sort(compare);
          // ここのLengthを変える
          for (let i = 0; i < l; i++) {
            result.push(keys[i]);
          }
          setRanks(result);

          setLoading(false);
        });
      });
    }
  }

  function handleClick() {
    setLLength(l);
    setIsWaiting(true);
    setIsClicked(!isClicked);
    text2embed();
    setIsWaiting(false);
  }

  return (
    <div className="App">
      <div className="divpic">
        <a
          className="picParent"
          href="http://resources.tokyodebate.org/debate-motion/tips/"
          onclick="document.location='http://resources.tokyodebate.org/debate-motion/tips/';return false;"
          target="_blank"
        >
          <img src={pic} />
        </a>
      </div>

      {/* <div className="picParent"><img src={pic} alt="picture"/></div> */}
      <br></br>
      {/* <a href="http://resources.tokyodebate.org/debate-motion/tips/">utds</a> */}
      <br></br>
      <br></br>
      <div className="parent-input-button-">
        <input
          className="searchInput"
          type="text"
          onChange={(e) => {
            setText(e.target.value);
          }}
          value={text}
        />
        <button
          className="search"
          onClick={(e) => {
            handleClick();
            e.target.style.backgroundColor = "gray";
            setStarted(true);
          }}
          disabled={isWaiting}
        >
          search
        </button>
      </div>

      {/* <div className="seperator"></div> */}

      <div className="searchName">{`${text}`}</div>
      <SearchModal
        className="searchModal"
        isClicked={isClicked}
        ranks={ranks}
        started={started}
      />

      <br></br>
      <div className="length-explain">
        <input
          className="length"
          type="text"
          placeholder="10"
          onChange={(e) => setL(Number(e.target.value))}
          value={l}
        />
        <span className="similar-motions">
          {" "}
          closest in meaning among 9914 motions
        </span>
      </div>

      <br></br>
      {/* <div>{l}/9914</div> */}
      {/* <p>search engine, built on sentence bert</p> */}
      <br></br>

      {/* <footer className="end"> */}
      {/* <span>show similar motions from 9914 motions, including 486 national tournaments and 306 international tournaments collected by </span> */}
      {/* <a href="http://resources.tokyodebate.org/debate-motion/motion/">utds motion</a> */}
      {/* <p>search engine built on sentence bert</p> */}

      {/* <p> The University of Tokyo, Debating Society. UTDS</p> */}
      {/* </footer> */}

      <br></br>

      {/* <input type="search" name="q" value="" placeholder="キーワード" /><input type="submit" name="btn_search" value="検索" />
       */}
    </div>
  );
}

export default App;
