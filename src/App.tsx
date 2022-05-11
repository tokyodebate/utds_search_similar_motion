import cosSimilarity from "cos-similarity";
import React, { useState } from 'react';
import './App.css';
import datastructure from "./data/datastructure.json";
import datastructureSimple from "./data/datastructure_simple.json";
import allVectors from "./data/round.json";
import pic from "./utdslogo.png";

let tt = [
`Peace is a journey of a thousand miles and it must be taken one step at a time.`,
`All that glitters is not gold." -The Merchant of Venice`,
`So we beat on, boats against the current, borne back ceaselessly into the past.`,
`We write to taste life twice, in the moment and in retrospect.`,
`One day I will find the right words, and they will be simple.`,
`Tears are words that need to be written.`,
`To survive, you must tell stories.`,
`The purpose of a writer is to keep civilization from destroying itself.`,
`It's the possibility of having a dream come true that makes life interesting.`,
`The journey of a thousand miles begins with one step.`,
`Great minds discuss ideas; average minds discuss events; small minds discuss people.`,
`Those who dare to fail miserably can achieve greatly.`,
`The opposite of love is not hate; it’s indifference.`,
`Life is like a box of chocolates. You never know what you’re going to get.`,
`If you judge people, you have no time to love them.`,
`In the long run, the sharpest weapon of all is a kind and gentle spirit.`,
`Sing like no one’s listening, love like you’ve never been hurt, dance like nobody’s watching, and live like it’s heaven on earth.`,
`Every great dream begins with a dreamer. Always remember, you have within you the strength, the patience, and the passion to reach for the stars to change the world.`,
`Remember that the happiest people are not those getting more, but those giving more.`,
`The only impossible journey is the one you never begin.`,
`We have nothing to fear but fear itself.`,
`The power of imagination makes us infinite.`,
`All that we see and seem is but a dream within a dream.`,
`Anyone who is capable of getting themselves made President should on no account be allowed to do the job.`,
`Who controls the past controls the future. Who controls the present controls the past.`,
`Every generation imagines itself to be more intelligent than the one that went before it, and wiser than the one that comes after it.`,
`Every moment is a fresh beginning.`,
`What we think, we become.`,
`May your choices reflect your hopes, not your fears.`,
`A happy soul is the best shield for a cruel world.`,
`Change the game, don’t let the game change you.`,
`The meaning of life is to give life meaning.`,
`If you don’t know history, then you don’t know anything. You are a leaf that doesn’t know it is part of a tree`,
`No volume of history is insignificant, even the worst chapters. Especially the worst chapters.`,
`History can bring luck: this is what we can call optimism.`,
`I am I and my circumstance; and, if I do not save it, I do not save myself.`,
`Till this moment I never knew myself.`,
`Everything is relative in this world, where change alone endures.`,
`One small positive thought can change your whole day.`,
`The best is yet to be.`,
`Write it on your heart that every day is the best day in the year.`,
`I would rather walk with a friend in the dark, than alone in the light.`,
`I think therefore I am`,
`No man's knowledge here can go beyond his experience`,
`Leisure is the mother of philosophy`,
`You can discover more about a person in an hour of play than in a year of conversation`,
`The only thing I know is that I know nothing`,
`To do as one would be done by, and to love one's neighbor as oneself, constitute the ideal perfection of utilitarian morality`,
`The opposite of love is not hate, it's indifference. The opposite of art is not ugliness, it's indifference. The opposite of faith is not heresy, it's indifference. And the opposite of life is not death, it's indifference.`,
`It does not matter how slowly you go as long as you do not stop.`,
`As you teach, you learn.`,
`It is strange that only extraordinary men make the discoveries, which later appear so easy and simple.`,


]


let t = tt[Math.floor(Math.random()*tt.length)]

export function Slide(props) {
	if (props.flag)
	return (
		<div className="slide">{props.flag}</div>
	)
	else {
		return (<></>);
	}
}
export function NationalModal(props) {
	let json_dict = datastructure["national"][props.index]
if (true){
return (
		<div className="sets" key={props.index}>
		<div className="titles">{json_dict.title}</div>
			{
			Object.values(json_dict.rounds).map((e) => {
			return (
					<>
						<div className="set">
							<div className="parant">
								<div className="child1">
								<div className="title2">
									{
									e.round
									}
								</div>
									<div className="motion2">
										{
										e.motion
										}
									</div>
									<Slide flag={e.slide} />
								</div>
							</div>
						</div>
					</>
					);
				}
			)
		}

		<div className="index-close">
			<div className="index">{props.index}/{datastructure["national"].length}</div>
			{/* <button className="close" onClick = {() => {}}>↑</button> */}
		</div>
		</div>
	);}
	else {
		return (<></>);
	}
}
export function InternationalModal(props) {
	let json_dict = datastructure["international"][props.index]
if (true){
return (
		<div className="sets" key={props.index}>
		<div className="titles">{json_dict.title}</div>
			{
			Object.values(json_dict.rounds).map((e) => {
			return (
					<>
						<div className="set">
							<div className="parant">
								<div className="child1">
								<div className="title2">
									{
									e.round
									}
								</div>
									<div className="motion2">
										{
										e.motion
										}
									</div>
									<Slide flag={e.slide} />
								</div>
							</div>
						</div>
					</>
					);
				}
			)
		}
		<div className="index-close">
			<div className="index">{props.index}/{datastructure["international"].length}</div>
			{/* <button className="close">↑</button> */}
		</div>

		</div>
	);}
	else {
		return (<></>);
	}
}

export function SearchModal(props) {
	// if (isClicked){
	if (props.started) {
		return (
		<div className="sets">{
			props.ranks.map((e) => {
			return (
		<>
			<div className="set">
				<div className="parant">
					<div className="child1">
					<div className="title">
						{
						datastructureSimple.data.find((v) => v.id==e).title + " / " + datastructureSimple.data.find((v) => v.id==e).round
						}
					</div>
						<div className="motion">
							{
							datastructureSimple.data.find((v) => v.id==e).motion
							}
						</div>
						<Slide flag={datastructureSimple.data.find((v) => v.id==e).slide} />
					</div>
				</div>
			</div>
		</>
			);}
			)
		}
		</div>
		);
	} else {
		return (<></>);
	}
}

interface AppProps {}
function App({}: AppProps) {
	// let t = "World-peace can be achieved when the power of love replaces the love of power"

	const [text, setText] = useState(t);
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



	if (loading) {return (<div>{loading ? "loading...":<></>}</div>); }

	function text2embed() {
		if (true) {
		use.load().then(model => {
			const sentences = [text];
			model.embed(sentences).then(async embeddings => {
			setLoading(true);
			embeddings.print(true);
			let vec = await embeddings.array();
			let similarities = {}
			let similarity = -1;
			for (let i = 0; i<allVectors.length; i++) {
				let vecs = allVectors[i];
				similarity = cosSimilarity(vec[0], vecs);
				similarities[i] = similarity;}
			let arr = similarities;
			var keys=[];
			for(let key in arr) keys.push(key);
				function compare(a, b) {
				return arr[b] - arr[a];}
			let result = [];
			keys.sort(compare);
			// ここのLengthを変える
			for(let i=0; i<	l; i++){
				result.push(keys[i]); }
			setRanks(result);

			setLoading(false);

			});
		});
	}}

	function handleClick() {
		setLLength(l);
		setIsWaiting(true)
		setIsClicked(!isClicked);
		text2embed();
		setIsWaiting(false);
		}


  return (
	<div className="App">

	<div className="divpic">
	<a className="picParent" href="http://resources.tokyodebate.org/debate-motion/tips/"
	onclick="document.location='http://resources.tokyodebate.org/debate-motion/tips/';return false;"
	target="_blank">
    <img src={pic} />
	</a>
	</div>

		{/* <div className="picParent"><img src={pic} alt="picture"/></div> */}
	<br></br>
	{/* <a href="http://resources.tokyodebate.org/debate-motion/tips/">utds</a> */}
	<br></br>
	<br></br>
		<div className="parent-input-button-">
			<input className="searchInput" type="text" onChange = {(e) => {setText(e.target.value);}} value={text} />
			<button className="search" onClick={ (e) => {handleClick(); e.target.style.backgroundColor="gray"; setStarted(true); }} disabled={ isWaiting }>search</button>
		</div>

		{/* <div className="seperator"></div> */}

		<div className="searchName">{`${text}` }</div>
		<SearchModal className="searchModal" isClicked={isClicked} ranks={ranks} started = {started} />

	<br></br>
	<div className="length-explain">
		<input className="length" type="text" placeholder="10" onChange={e => setL(Number(e.target.value))} value={l} />
		<span className="similar-motions"> closest in meaning among 9914 motions</span>
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

