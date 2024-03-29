const { addGetEventsCheck } = require("./ipc/check_events");
const { addGetEventsInsert } = require("./ipc/insert_events");
const { addGetEventsDelete } = require("./ipc/delete_events");
const { addEventsUpdate } = require("./ipc/update_events");
const { addEventsGet } = require("./ipc/get_events");
const { addBatchProcessingEvents } = require("./ipc/batch_processing_events");

/**
 *
 * @param {Electron.ipcMain} ipcMain
 */
const addEvents = (ipcMain) => {
  addEventsGet(ipcMain);
  addEventsUpdate(ipcMain);
  addGetEventsCheck(ipcMain);
  addGetEventsInsert(ipcMain);
  addGetEventsDelete(ipcMain);
  addBatchProcessingEvents(ipcMain);
};

exports.addEvents = addEvents;
