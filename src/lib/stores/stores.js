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
    update: async (newItems) => {
      newItems.forEach((newItem) => {
        db.update(tableName, newItem.id, newItem);
      });
      store.set(newItems);
    },
    set: async (newItems) => {
      let items = await db.getAll(tableName);
      if (newItems.length > items.length) {
        newItems.forEach(async (newItem) => {
          let item = await db.get(tableName, newItem.id);
          if (!item) db.create(tableName, newItem);
        });
        store.set(newItems);
      } else if (newItems.length < items.length) {
        items.forEach(async (item) => {
          let b = newItems.find((i) => i.id == item.id);
          if (!b) await db.remove(tableName, item.id);
        });
        store.set(newItems);
      } else {
        store.set(items);
      }
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
