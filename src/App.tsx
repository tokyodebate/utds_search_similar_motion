import cosSimilarity from "cos-similarity";
import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import rounds from "./data/rounds.json";
import vectors from "./data/vectors.json";
import utdsLogoPicture from "./utdslogo.png";
import { quotes } from "./quote";

export function Slide(props: { text: string }) {
  if (!props.text) {
    return <></>;
  }
  return <div className="slide">{props.text}</div>;
}

export function SearchModal(props: {
  isSearchLoading: boolean;
  indexes: number[];
}) {
  if (props.indexes.length === 0) {
    return <>loading...</>;
  }
  return (
    <div className="sets">
      {props.indexes.map((index) => {
        const round = rounds.data.find((v) => v.id == index);
        if (!round) {
          return <>`round of index: ${index} not found`</>;
        }
        return (
          <div key={index}>
            <div className="set">
              <div className="parent">
                <div className="child1">
                  <div className="title">
                    {round.title + " / " + round.round}
                  </div>
                  <div className="motion">{round.motion}</div>
                  <Slide text={round.slide} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const model = use.load()

interface AppProps {}
function App({}: AppProps) {
  const initialText = quotes[Math.floor(Math.random() * quotes.length)];

  const [searchingText, setSearchingText] = useState<string>(initialText);
  const [text, setText] = useState<string>(initialText);
  const [indexes, setIndexes] = useState<Array<number>>([]);
  const [paginationRoundLength, setPaginationRoundLength] = useState(15);

  const [loading, setLoading] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  const text2embed = useCallback((text) => {
    return model.then((model) => {
      const sentences = [text];
      model.embed(sentences).then(async (embeddings) => {
        setLoading(true);
        embeddings.print(true);
        let vec = await embeddings.array();
        let similarities = {};
        let similarity = -1;
        for (let i = 0; i < vectors.length; i++) {
          let vecs = vectors[i];
          similarity = cosSimilarity(vec[0], vecs);
          similarities[i] = similarity;
        }
        let arr = similarities;
        var keys = [];
        for (let key in arr) keys.push(key);
        keys.sort((a, b) => arr[b] - arr[a]);
        let result = [];
        for (let i = 0; i < paginationRoundLength; i++) {
          result.push(keys[i]);
        }
        setIndexes(result);
        setLoading(false);
      });
    });
  }, [model, vectors, paginationRoundLength]); // 依存関係を追加

  useEffect(() => {
    handleClick()
  }
  , []);
  
  function handleClick() {
    setSearchingText(text);
    setIsSearchLoading(true);
    text2embed(text).finally(() => setIsSearchLoading(false));
  }
  
  if (loading) {
    return <div>{loading ? "loading..." : <></>}</div>;
  }

  return (
    <div className="App">
      <div className="divpic">
        <a
          className="picParent"
          href="http://resources.tokyodebate.org/debate-motion/tips/"
          target="_blank"
        >
          <img src={utdsLogoPicture} />
        </a>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <div className="parent-input-button-">
        <input
          className="searchInput"
          type="text"
          onChange={(e) => {
            setText(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleClick();
            }
          }}
          value={text}
        />
        <button
          className="search"
          style={{ backgroundColor: isSearchLoading ? "gray" : undefined }}
          onClick={(e) => {
            handleClick();
          }}
          disabled={isSearchLoading}
        >
          search
        </button>
      </div>

      <div className="searchName">{text}</div>
      <div className="searchModal">
        <SearchModal
          indexes={indexes}
          isSearchLoading={isSearchLoading}
        />
      </div>

      <br></br>
      <div className="length-explain">
        <input
          className="length"
          type="text"
          placeholder="10"
          onChange={(e) => setPaginationRoundLength(Number(e.target.value))}
          value={paginationRoundLength}
        />
        <span className="similar-motions">
          closest in meaning among {vectors.length} motions
        </span>
      </div>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
}

export default App;
