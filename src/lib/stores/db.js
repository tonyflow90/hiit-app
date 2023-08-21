import Dexie from "dexie";
import { browser } from "$app/environment";

const dbName = "hiit-app-db";
const dbVersion = 1;
const tables = { trainings: "++id", settings: "name" };

export const db = new Dexie(dbName);

db.version(1).stores(tables);

db.on("populate", function (transaction) {
  const t1 = {
    name: "T1",
    pause_duration: 1,
    current_step: 0,
    steps: [
      {
        name: "S1",
        duration: 2,
      },
      {
        name: "S2",
        duration: 2,
      },
      {
        name: "S3",
        duration: 2,
      },
    ],
  };
  const t2 = {
    name: "T2",
    pause_duration: 1,
    current_step: 0,
    steps: [
      {
        name: "S1",
        duration: 2,
      },
      {
        name: "S2",
        duration: 2,
      },
      {
        name: "S3",
        duration: 2,
      },
      {
        name: "S3",
        duration: 2,
      },
      {
        name: "S3",
        duration: 2,
      },
      {
        name: "S3",
        duration: 2,
      },
      {
        name: "S3",
        duration: 2,
      },
      {
        name: "S3",
        duration: 2,
      },
    ],
  };
  create("trainings", t1);
  create("trainings", t1);
  create("settings", { name: "theme", value: "default" });
});

db.open().then((db) => {
  console.info(`Database ${dbName} Version ${dbVersion} opened!`);
});

export const update = (table, key, changes) => {
  if (browser) {
    return db.table(table).update(key, changes);
  }
  return {};
};

export const create = (table, item) => {
  if (browser) {
    return db.table(table).add(item);
  }
  return {};
};

export const remove = (table, key) => {
  if (browser) {
    return db.table(table).delete(key);
  }
  return {};
};

export const get = (table, key) => {
  if (browser) {
    return db.table(table).get(key);
  }
  return {};
};

export const getAll = (table) => {
  if (browser) {
    return db.table(table).toArray();
  }
  return {};
};

export const setAll = (tableName, items) => {
  if (browser) {
    return db.table(tableName).bulkPut(items);
  }
  return {};
};

export const getItems = (tableName) => {
  // spread all of the settings records onto one object
  // so the app can use a single store for all settings
  // this table has limited entries
  // would not recommend for use with large tables
  if (browser) {
    return db
      .table(tableName)
      .toArray()
      .then((data) =>
        data.reduce((prev, curr) => ({ ...prev, [curr.name]: curr }), [])
      );
    // credit to Jimmy Hogoboom for this fun reducer function
    // https://github.com/jimmyhogoboom
  }
  return {};
};
