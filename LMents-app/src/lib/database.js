import { Capacitor } from "@capacitor/core";
import { CapacitorSQLite, SQLiteConnection } from "@capacitor-community/sqlite";

let db;
const sqlite = new SQLiteConnection(CapacitorSQLite);

export async function openDB(dbName) {
    const ret = await sqlite.checkConnectionsConsistency();
    const isConn = await sqlite.isConnection(dbName, false);
    if (ret.result && isConn.result) {
            db = await sqlite.retrieveConnection(dbName, false);
    } else {
        db = await sqlite.createConnection(dbName, false, "no-encryption", 1, false);
    }

    await db.open();
    return db;
}

export async function createCoursesTable() {
    const sqlstr = `CREATE TABLE IF NOT EXISTS courses (
                        id INTEGER PRIMARY KEY,
                        name TEXT
                    );`
    const ret = await db.execute(sqlstr);
    console.log('createTables() result:', ret);
}

export async function initDB(dbName) {
    db = await openDB(dbName);
    if (!db) {
        console.log("Database does not exist.")
        return;
    }
    await createCoursesTable();
}

export async function insertCourseData(course_id, course_name) {
    if (!db) {
        console.error("Database not initialized!")
        return
    }
    const sqlstr = 'INSERT OR REPLACE INTO courses VALUES (?,?);'
    const values = [course_id, course_name]
    const ret = await db.run(sqlstr, values)
    console.log('insertData() result:', ret)
}

export async function queryCourses() {
    const res = await db.query("SELECT id, name FROM courses");
    return res
}

// # bluepuma77. https://github.com/bluepuma77/sveltekit-capacitor-sqlite
// # March 10, 2025.