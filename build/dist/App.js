import cosSimilarity from "../_snowpack/pkg/cos-similarity.js";
import React, {useCallback, useEffect, useState} from "../_snowpack/pkg/react.js";
import "./App.css.proxy.js";
import rounds from "./data/rounds.json.proxy.js";
import vectors from "./data/vectors.json.proxy.js";
import utdsLogoPicture from "./utdslogo.png.proxy.js";
import {quotes} from "./quote.js";
export function Slide(props) {
  if (!props.text) {
    return /* @__PURE__ */ React.createElement(React.Fragment, null);
  }
  return /* @__PURE__ */ React.createElement("div", {
    className: "slide"
  }, props.text);
}
export function SearchModal(props) {
  if (props.indexes.length === 0) {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, "initial loading... ", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), "It takes about 5 seconds to load for the first time.");
  }
  return /* @__PURE__ */ React.createElement("div", {
    className: "sets"
  }, props.indexes.map((index) => {
    const round = rounds.data.find((v) => v.id == index);
    if (!round) {
      return /* @__PURE__ */ React.createElement(React.Fragment, null, "`round of index: $", index, " not found`");
    }
    return /* @__PURE__ */ React.createElement("div", {
      key: index
    }, /* @__PURE__ */ React.createElement("div", {
      className: "set"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "parent"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "child1"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "title"
    }, round.title + " / " + round.round), /* @__PURE__ */ React.createElement("div", {
      className: "motion"
    }, round.motion), /* @__PURE__ */ React.createElement(Slide, {
      text: round.slide
    })))));
  }));
}
const model = use.load();
function App({}) {
  const initialText = quotes[Math.floor(Math.random() * quotes.length)];
  const [searchingText, setSearchingText] = useState(initialText);
  const [text, setText] = useState(initialText);
  const [indexes, setIndexes] = useState([]);
  const [paginationRoundLength, setPaginationRoundLength] = useState(15);
  const [loading, setLoading] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const text2embed = useCallback((text2) => {
    return model.then((model2) => {
      const sentences = [text2];
      model2.embed(sentences).then(async (embeddings) => {
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
        for (let key in arr)
          keys.push(key);
        keys.sort((a, b) => arr[b] - arr[a]);
        let result = [];
        for (let i = 0; i < paginationRoundLength; i++) {
          result.push(keys[i]);
        }
        setIndexes(result);
        setLoading(false);
      });
    });
  }, [model, vectors, paginationRoundLength]);
  useEffect(() => {
    handleClick();
  }, []);
  function handleClick() {
    setSearchingText(text);
    setIsSearchLoading(true);
    setTimeout(() => {
      text2embed(text).finally(() => setIsSearchLoading(false));
    }, 200);
  }
  if (loading) {
    return /* @__PURE__ */ React.createElement("div", null, loading ? "initial loading..." : /* @__PURE__ */ React.createElement(React.Fragment, null));
  }
  return /* @__PURE__ */ React.createElement("div", {
    className: "App"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "divpic"
  }, /* @__PURE__ */ React.createElement("a", {
    className: "picParent",
    href: "http://resources.tokyodebate.org/debate-motion/tips/",
    target: "_blank"
  }, /* @__PURE__ */ React.createElement("img", {
    src: utdsLogoPicture
  }))), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("div", {
    className: "parent-input-button-"
  }, /* @__PURE__ */ React.createElement("input", {
    className: "searchInput",
    type: "text",
    onChange: (e) => {
      setText(e.target.value);
    },
    onKeyDown: (e) => {
      if (e.key === "Enter") {
        handleClick();
      }
    },
    disabled: isSearchLoading,
    value: text
  }), /* @__PURE__ */ React.createElement("button", {
    className: "search",
    style: {backgroundColor: isSearchLoading ? "gray" : void 0},
    onClick: () => {
      handleClick();
    },
    disabled: isSearchLoading
  }, "search")), /* @__PURE__ */ React.createElement("div", {
    className: "searchName"
  }, text), /* @__PURE__ */ React.createElement("div", {
    className: "searchModal"
  }, /* @__PURE__ */ React.createElement(SearchModal, {
    indexes,
    isSearchLoading
  })), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("div", {
    className: "length-explain"
  }, /* @__PURE__ */ React.createElement("input", {
    className: "length",
    type: "text",
    placeholder: "10",
    onChange: (e) => setPaginationRoundLength(Number(e.target.value)),
    value: paginationRoundLength
  }), /* @__PURE__ */ React.createElement("span", {
    className: "similar-motions"
  }, "closest in meaning among ", vectors.length, " motions")), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null));
}
export default App;
