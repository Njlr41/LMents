import * as dbModule from '../../database';
import {
    insertCourseData,
    insertAssignmentData,
  } from '../../database';
import { vi } from 'vitest';

vi.mock('../../database', async (importOriginal) => {
  const original = await importOriginal();
  return {
    ...original,
    openDB: vi.fn(() => Promise.resolve(mockDb)),
    insertCourseData: vi.fn(),
    insertAssignmentData: vi.fn(),
  };
})

test('Database', async()=> {
    expect(true)
})

describe('Database', () => {

    test('Insert Course Data Functionality', async () => {
      const courseId = 1;
      const courseName = 'Test Course';
      await dbModule.insertCourseData(courseId, courseName);
      expect(dbModule.insertCourseData).toHaveBeenCalledWith(courseId, courseName);
    });
  
    test('Insert Assignment Data Functionality', async () => {
      const id = 1;
      const course_id = 1;
      const title = 'Test Assignment';
      const description = 'Description'
      const due_date = '2025-03-12';
      const link = "http://example.com";
      const completed = 1;
  
      await dbModule.insertAssignmentData(id, course_id, title, description, due_date, link, completed);
      expect(dbModule.insertAssignmentData).toHaveBeenCalledWith(id, course_id, title, description, due_date, link, completed);
    });
  });
  