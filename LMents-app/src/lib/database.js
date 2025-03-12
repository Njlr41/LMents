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

export async function createAssignmentsTable() {
    const sqlstr = `CREATE TABLE IF NOT EXISTS assignments (
                        assignment_id INTEGER PRIMARY KEY,
                        course_id INTEGER,
                        title TEXT,
                        description TEXT,
                        due_date TEXT,
                        link text,
                        completed BOOLEAN,
                        FOREIGN KEY(course_id) REFERENCES courses(id)
                    );`
    const ret = await db.execute(sqlstr);
    console.log('createAssignmentsTable() result:', ret);
}

export async function initDB(dbName) {
    db = await openDB(dbName);
    if (!db) {
        console.log("Database does not exist.")
        return;
    }
    await createCoursesTable();
    await createAssignmentsTable();
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

export async function insertAssignmentData(id, course_id, title, description, due_date, link, completed) {
    if (!db) {
        console.error("Database not initialized!")
        return
    }
    const sqlstr = `INSERT OR IGNORE INTO assignments VALUES (?, ?, ?, ?, ?, ?, ?);`;
    const values = [id, course_id, title, description, due_date, link, completed]; 
    const ret = await db.run(sqlstr, values)
    console.log('insertAssignmentData() result:', ret)
}

export async function markAssignmentComplete(assignment_id, completed){
    const update_str = `
        UPDATE assignments
        SET completed = ?
        WHERE assignment_id = ?;`
        
    const values = [!completed, assignment_id]
    await db.run(update_str, values) 
    console.log("Assignment marked as completed.", !completed, assignment_id)
}
export async function queryCourses() {
    const res = await db.query("SELECT id, name FROM courses");
    return res
}

export async function queryAssignments() {
    const res = await db.query(`
        SELECT *
        FROM assignments
        ORDER BY due_date DESC;
    `);
    return res;
}


// # bluepuma77. https://github.com/bluepuma77/sveltekit-capacitor-sqlite
// # March 10, 2025.