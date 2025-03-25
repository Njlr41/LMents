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
                        name TEXT,
                        hidden BOOLEAN
                    );`
    const ret = await db.execute(sqlstr);
}

export async function createAssignmentsTable() {
    const sqlstr = `CREATE TABLE IF NOT EXISTS assignments (
                        assignment_id INTEGER PRIMARY KEY,
                        course_id INTEGER,
                        title TEXT,
                        description TEXT,
                        due_date TEXT,
                        link TEXT,
                        completed BOOLEAN,
                        priority BOOLEAN,
                        hidden BOOLEAN,
                        FOREIGN KEY(course_id) REFERENCES courses(id)
                    );` // Add Priority Class
    const ret = await db.execute(sqlstr);
}

export async function createAnnouncementsTable() {
    const sqlstr  = `CREATE TABLE IF NOT EXISTS announcements (
                        announcement_id INTEGER PRIMARY KEY,
                        course_id INTEGER,
                        text TEXT,
                        announcement_date TEXT,
                        link text,
                        priority BOOLEAN, 
                        hidden BOOLEAN,
                        FOREIGN KEY(course_id) REFERENCES courses(id)
                    );`
    const ret = await db.execute(sqlstr)
}
export async function initDB(dbName) {
    db = await openDB(dbName);
    if (!db) {
        console.error("Database does not exist.")
        return
    }
    await createCoursesTable()
    await createAssignmentsTable()
    await createAnnouncementsTable()
}

export async function insertCourseData(course_id, course_name, hidden) {
    if (!db) {
        console.error("Database not initialized!")
        return
    }
    const sqlstr = 'INSERT OR IGNORE INTO courses VALUES (?, ?, ?);'
    const values = [course_id, course_name, hidden]
    const ret = await db.run(sqlstr, values)
}

export async function insertAssignmentData(id, course_id, title, description, due_date, link, completed, priority, hidden) {
    if (!db) {
        console.error("Database not initialized!")
        return
    }
    const sqlstr = `INSERT OR IGNORE INTO assignments VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    const values = [id, course_id, title, description, due_date, link, completed, priority, hidden]; 
    const ret = await db.run(sqlstr, values)
}

export async function insertAnnouncementData(id, course_id, text, announcement_date, link, priority, hidden) {
    if (!db) {
        console.error("Database not initialized!")
        return
    }
    const sqlstr = `INSERT OR IGNORE INTO announcements VALUES (?, ?, ?, ?, ?, ?, ?);`
    const values = [id, course_id, text, announcement_date, link, priority, hidden]
    const ret = await db.run(sqlstr, values)
}

export async function markCourseHidden(course_id, hidden) {
    const update_str = `
        UPDATE courses
        SET hidden = ?
        WHERE id = ?;`
    
    const values = [!hidden, course_id]
    await db.run(update_str, values)
}

export async function markAssignmentsHidden() {
    // Get all hidden courses
    const hidden_query_str = `
        SELECT id
        FROM courses
        WHERE hidden = ?;`
    const hidden_values = [true]
    const hidden_ids = await db.query(hidden_query_str, hidden_values)
    // Get all visible courses
    const visible_query_str = `
        SELECT id 
        FROM courses
        WHERE hidden = ?;`
    const visible_values = [false]
    const visible_ids = await db.query(visible_query_str, visible_values)
    // Update all assignments of hidden courses
    for (let i = 0; i < hidden_ids.values.length; i++) {
        console.log("SanityA")
        const update_hidden_str = `
            UPDATE assignments
            SET hidden = ?
            WHERE course_id = ?;`
        const update_hidden_values = [true, hidden_ids.values[i].id]
        await db.run(update_hidden_str, update_hidden_values)
    }
    // Update all assignments of visible courses
    for (let j = 0; j < visible_ids.values.length; j++) {
        console.log("Sanity")
        const update_visible_str = `
            UPDATE assignments
            SET hidden = ?
            WHERE course_id = ?;`
        const update_visible_values = [false, visible_ids.values[j].id]
        await db.run(update_visible_str, update_visible_values)
    }
}

export async function markAssignmentComplete(assignment_id, completed){
    const update_str = `
        UPDATE assignments
        SET completed = ?
        WHERE assignment_id = ?;`
        
    const values = [!completed, assignment_id]
    await db.run(update_str, values) 
}

export async function markAssignmentPriority(assignment_id, priority){
    const update_str = `
        UPDATE assignments
        SET priority = ?
        WHERE assignment_id = ?;`
        
    const values = [!priority, assignment_id]
    await db.run(update_str, values)
}

export async function markAnnouncementsHidden() {
    // Get all hidden courses
    const hidden_query_str = `
        SELECT id
        FROM courses
        WHERE hidden = ?;`
    const hidden_values = [true]
    const hidden_ids = await db.query(hidden_query_str, hidden_values)
    // Get all visible courses
    const visible_query_str = `
        SELECT id 
        FROM courses
        WHERE hidden = ?;`
    const visible_values = [false]
    const visible_ids = await db.query(visible_query_str, visible_values)
    // Update all assignments of hidden courses
    for (let i = 0; i < hidden_ids.values.length; i++) {
        let update_hidden_str = `
            UPDATE announcements
            SET hidden = ?
            WHERE course_id = ?;`
        let update_hidden_values = [true, hidden_ids.values[i].id]
        await db.run(update_hidden_str, update_hidden_values)
    }
    // Update all assignments of visible courses
    for (let j = 0; j < visible_ids.values.length; j++) {
        let update_visible_str = `
            UPDATE announcements
            SET hidden = ?
            WHERE course_id = ?;`
        let update_visible_values = [false, visible_ids.values[j].id]
        await db.run(update_visible_str, update_visible_values)
    }
}

export async function markAnnouncementPriority(announcement_id, priority){
    const update_str = `
        UPDATE announcements
        SET priority = ?
        WHERE announcement_id = ?;`
        
    const values = [!priority, announcement_id]
    await db.run(update_str, values)
}

export async function queryCourses() {
    const res = await db.query("SELECT * FROM courses");
    return res
}

export async function queryCourseName(course_id) {
    const query_str = `
        SELECT name
        FROM courses
        WHERE id = ?;
    `
    let values = [course_id]
    let res = await db.query(query_str, values)
    return res.values
}

export async function queryAssignments() {
    const res = await db.query(`
        SELECT *
        FROM assignments
        ORDER BY priority DESC, due_date DESC;
    `);
    return res
}

export async function queryAnnouncements() {
    const res = await db.query(`
        SELECT *
        FROM announcements
        ORDER BY priority DESC, announcement_date DESC;
    `)
    return res
}
// # bluepuma77. https://github.com/bluepuma77/sveltekit-capacitor-sqlite
// # March 10, 2025.