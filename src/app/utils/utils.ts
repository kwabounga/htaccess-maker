import { Rule } from "../interfaces/interfaces";


/**
 * Used for smooth drag and drop
 *
 * @param {any[]} arr  the array to be processed
 * @param {any} dragResult  the drag Result object
 * @returns {any[]} the new sorted array
 */
export const applyDrag = (arr:any[], dragResult:any,currentIndex=0) => {
	const { removedIndex, addedIndex, payload } = dragResult;
	if (removedIndex === null && addedIndex === null) return arr;

	const result = [...arr];
	let itemToAdd = payload;

	if (removedIndex !== null) {
		itemToAdd = result.splice((removedIndex+currentIndex), 1)[0];
	}

	if (addedIndex !== null) {
		result.splice((addedIndex+currentIndex), 0, itemToAdd);
	}

	return result;
};

/**
 * Sort Rules Array by Origin
 * @param {Rule} a
 * @param {Rule} b
 * @returns {number}
 */
export const ruleSortByOrigin = (a:Rule, b:Rule) => a.origin.localeCompare(b.origin);

/**
 * Sort Rules Array by id
 * @param {Rule} a
 * @param {Rule} b
 * @returns {number}
 */
export const ruleSortById = (a:Rule, b:Rule) => a.scope_id - b.scope_id;

/**
 * To find Option id from the Option value
 * @param {NodeList} options the options HTMLElementsList
 * @param {any} value the value
 * @returns {number} the option id
 */
 export const findOptionsIdByValue = (options:NodeList, value:number) => {
	const src = Array.from(options);
    const byId = (element:any) => element.value === value;
    const i = src.findIndex(byId);
	return i;
};
