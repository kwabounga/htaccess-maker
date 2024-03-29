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
/**
 * Generate a formatted uid string from the time
 * 
 * @returns {string} 'data_time_day_month_year' >> '1675028450912-29-01-2023'
 */
export const getDateSlug = ():string => {  
  let d = new Date();
  const day = `${d.getDate()}`.padStart(2,'0')
  const month = `${d.getMonth() + 1}`.padStart(2,'0')
  const year = d.getFullYear()
  return `${d.getTime()}-${day}-${month}-${year}`
}

/**
 * 
 * @param {string} r some text
 * @returns {boolean} if empty of not
 */
export const notEmpty = (r: string) => r.trim() !== '';


/**
 * @param {array} arr1 an array
 * @param {array} arr2 another array
 * @returns {array} the difference between the arrays
 */
export const getArrayDiff = (arr1, arr2) =>{
  return arr1.filter(x => !arr2.includes(x));
}