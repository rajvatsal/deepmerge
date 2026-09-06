class MergeItem {
	constructor(finalObject) {
		this.finalObject = finalObject;
		this.conflictedKeys = [];
		this.conflictResolveIndex = 0;
	}
}

class Merge {
	_list = []

	get() {
		return this._list[this._list.length - 1]
	}

	add(finalObject) {
		this._list.push(new MergeItem(finalObject))
	}

	isFinal() {
		return this._list.length === 1
	}

	remove() {
		this._list.pop()
		return this.get()
	}
}

function isObject(value) {
	return typeof value === "object" && !Array.isArray(value) && value !== null;
}

function merge(obj1, obj2) {
	let incomingObject = obj2;

	const mergeList = new Merge()

	mergeList.add(Object.assign(obj1))


	do {
		let merge = mergeList.get()
		let finalObject = merge.finalObject

		for (const key in incomingObject) {
			if (isObject(finalObject[key]) && isObject(incomingObject[key])){
				merge.conflictedKeys.push(key);
			}
			else
				finalObject[key] = incomingObject[key]
		}

		if (merge.conflictedKeys.length > merge.conflictResolveIndex) {
			const conflictFinalObject = Object.assign({}, finalObject[merge.conflictedKeys[merge.conflictResolveIndex]])
			mergeList.add(conflictFinalObject)
			incomingObject = incomingObject[merge.conflictedKeys[merge.conflictResolveIndex]]
			continue
		}
		if (mergeList.isFinal()) break;

		merge = mergeList.remove()
		merge.finalObject[merge.conflictedKeys[merge.conflictResolveIndex]] = finalObject;
		merge.conflictResolveIndex++;
		incomingObject = {}
	}while (!mergeList.isFinal()) 

	return mergeList.get().finalObject
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
