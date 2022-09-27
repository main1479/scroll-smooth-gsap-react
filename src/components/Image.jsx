import gsap from 'gsap-trial';
import { useEffect, useRef } from 'react';

export default function Image({ index, image, smoother }) {
	const ref = useRef(null);
	const el = gsap.utils.selector(ref);
	useEffect(() => {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: ref.current,
				start: 'top center',
				end: 'bottom bottom',
			},
		});
		tl.to(ref.current, {
			duration: 0,
			css: { visibility: 'visible' },
		});
		tl.to(el('.reveal'), {
			duration: 1.4,
			width: '0%',
			ease: 'Power2.easeInOut',
		}).to('.img-container img', {
			duration: 1.4,
			scale: 1,
			ease: 'Power2.easeInOut',
			delay: -1.4,
		});
		// If you want to add some parallax effects
		// if (smoother.current) {
		// 	smoother.current.effects(el('img'), { speed: 'auto' });
		// }
	}, [el]);
	return (
		<div ref={ref} key={index} className="img-container">
			<div className="reveal">&nbsp;</div>
			<img src={image} data-scroll="2" alt={`people ${index}`} />
		</div>
	);
}
