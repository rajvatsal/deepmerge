function isObject(value) {
	return typeof value === "object" && !Array.isArray(value) && value !== null;
}

function merge(obj1, obj2) {
	const mergedObj = Object.assign({}, obj1);

	for (const key in obj2) {
		if (isObject(mergedObj[key]) && isObject(obj2[key])) {
			mergedObj[key] = merge(mergedObj[key], obj2[key]);
			continue;
		}
		mergedObj[key] = obj2[key];
	}

	return mergedObj;
}

function main() {
	const x = {
		a: {
			b: 2,
			c: 3,
			f: {
				g: 5,
				h: 10,
				j: {
					m: 5,
					n: 0,
				},
			},
		},
	};

	const y = {
		a: {
			b: 1,
			d: 6,
			f: {
				g: 10,
				i: 20,
				j: {
					k: 7,
					l: 9,
				},
			},
		},
		e: 10,
	};

	console.log("Final:", merge(x, y));
}

main();
