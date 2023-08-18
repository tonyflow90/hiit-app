import * as db from "$stores/db";
import { writable } from "svelte/store";

function createStore(tableName) {
  const store = writable({});

  return {
    ...store,
    init: async () => {
      let result = await db.getAll(tableName);
      if (result) store.set(result);
      return result;
    },
    set: async (newItems) => {
      newItems.forEach((newItem) => {
        db.update(tableName, newItem.id, newItem);
      });
      store.set(newItems);
    },
  };
}

function createNameValueStore(tableName) {
  const store = writable({});

  return {
    ...store,
    init: async () => {
      const items = db.getItems(tableName);
      items.then((values) => {
        store.set(values);
      });
      return items;
      //   let result = await db.getItems(tableName);
      //   if (result) store.set(result);
      //   return result;
    },
    set: async (newVal) => {
      db.setAll(
        tableName,
        Object.keys(newVal).map((key) => {
          return { name: key, value: newVal[key].value };
        })
      );
      store.set(newVal);
    },
  };
}

export const trainings = createStore("trainings");
export const settings = createNameValueStore("settings");
