import React, { useEffect, useRef } from 'react';
import gsap from 'gsap-trial';
import ScrollTrigger from 'gsap-trial/ScrollTrigger';
import ScrollSmoother from 'gsap-trial/ScrollSmoother';
import posts from './appData';
import Image from './components/Image';
import AnimatedCursor from 'react-animated-cursor';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function App() {
	const smoother = useRef();
	useEffect(() => {
		let skewSetter = gsap.quickTo('.scroll', 'skewY', {
				duration: 0.1,
			}), // fast
			clamp = gsap.utils.clamp(-10, 10); // don't let the skew go beyond 10 degrees.

		smoother.current = ScrollSmoother.create({
			wrapper: '.App',
			content: '.scroll',
			smooth: 2,
			effects: true,
			onUpdate: (self) => skewSetter(clamp(self.getVelocity() / -500)),
			onStop: () => skewSetter(0),
		});
	}, []);
	return (
		<div className="App">
			<AnimatedCursor
				cursor={true}
				innerSize={8}
				outerSize={30}
				color="0,0,0"
				outerAlpha={0.2}
				innerScale={0.7}
				outerScale={3}
			/>
			<div className="scroll">
				{posts.map((post, index) => (
					<React.Fragment key={post.id + index}>
						<Image index={post.id} smoother={smoother} image={post.image} />
					</React.Fragment>
				))}
			</div>
		</div>
	);
}

export default App;
