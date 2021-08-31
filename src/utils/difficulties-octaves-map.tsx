type Difficulties = {
	easy: number[];
	medium: number[];
	hard: number[];
};

const difficultiesOctavesMap: {
	treble: Difficulties;
	bass: Difficulties;
} = {
	treble: {
		easy: [4],
		medium: [4, 5],
		hard: [3, 4, 5],
	},
	bass: {
		easy: [3],
		medium: [3, 4],
		hard: [2, 3, 4],
	},
};
export default difficultiesOctavesMap;
