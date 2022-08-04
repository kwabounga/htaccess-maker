import { Rule } from "../interfaces/interfaces";


/**
 * Used for smooth drag and drop 
 * 
 * @param {any[]} arr  the array to be processed
 * @param {any} dragResult  the drag Result object
 * @returns {any[]} the new sorted array 
 */
export const applyDrag = (arr:any[], dragResult:any) => {
	const { removedIndex, addedIndex, payload } = dragResult;
	if (removedIndex === null && addedIndex === null) return arr;

	const result = [...arr];
	let itemToAdd = payload;

	if (removedIndex !== null) {
		itemToAdd = result.splice(removedIndex, 1)[0];
	}

	if (addedIndex !== null) {
		result.splice(addedIndex, 0, itemToAdd);
	}

	return result;
};

export const ruleSortByOrigin = (a:Rule, b:Rule) => a.origin.localeCompare(b.origin)
export const ruleSortById = (a:Rule, b:Rule) => a.scope_id - b.scope_id