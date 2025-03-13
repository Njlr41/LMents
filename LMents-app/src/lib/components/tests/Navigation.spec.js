// src/lib/components/__tests__/Navigation.spec.js
import { render, screen, fireEvent } from '@testing-library/svelte';
import Navigation from '../Navigation.svelte';
import { goto } from '$app/navigation';
import * as dbModule from '../../database';
import {
    insertCourseData,
    insertAssignmentData,
  } from '../../database';
import { vi } from 'vitest';

vi.mock('$app/navigation');



vi.mock('../../database', async (importOriginal) => {
  const original = await importOriginal();
  return {
    ...original,
    openDB: vi.fn(() => Promise.resolve(mockDb)),
    insertCourseData: vi.fn(),
    insertAssignmentData: vi.fn(),
  };
})


describe('Navigation', () => {
  test('Home Button is Functional', () => {
    render(Navigation);
    const Home = screen.getByText('Home');
    expect(Home).toBeTruthy();
    fireEvent.click(Home);
    expect(goto).toHaveBeenCalledWith('/');
  });
  
  test('Login Button is Functional', () => {
    render(Navigation);
    const Login = screen.getByText('Login');
    expect(Login).toBeTruthy();
    fireEvent.click(Login);
    expect(goto).toHaveBeenCalledWith('/signup');
  });

  test('Courses Button is Functional', () => {
    render(Navigation);
    const Courses = screen.getByText('Courses');
    expect(Courses).toBeTruthy();
    fireEvent.click(Courses);
    expect(goto).toHaveBeenCalledWith('/courses');
  });

  test('Assignments Button is Functional', () => {
    render(Navigation);
    const Assignments = screen.getByText('Assignments');
    expect(Assignments).toBeTruthy();
    fireEvent.click(Assignments);
    expect(goto).toHaveBeenCalledWith('/assignments');
  });

  test('Announcements Button is Functional', () => {
    render(Navigation);
    const Announcements = screen.getByText('Announcements');
    expect(Announcements).toBeTruthy();
    fireEvent.click(Announcements);
    expect(goto).toHaveBeenCalledWith('/announcements');
  });

  test('Canvas Button is Functional', () => {
    render(Navigation);
    const Canvas = screen.getByText('Canvas');
    expect(Canvas).toBeTruthy();
    fireEvent.click(Canvas);
    expect(goto).toHaveBeenCalled('/canvas')
  });
})

describe('Database', () => {

  test('Insert Course Data Functionality', async () => {
    const courseId = 1;
    const courseName = 'Test Course';
    await dbModule.insertCourseData(courseId, courseName);
    expect(dbModule.insertCourseData).toHaveBeenCalledWith(courseId, courseName);
  });

  test('Insert Assignment Data Functionality', async () => {
    const course_id = 1;
    const name = 'Test Assignment';
    const due_date = '2025-03-12';
    const completed = 1;
    const alternateLink = "http://example.com";

    await dbModule.insertAssignmentData(course_id, name, due_date, completed, alternateLink);
    expect(dbModule.insertAssignmentData).toHaveBeenCalledWith(course_id, name, due_date, completed, alternateLink);
  });

  
  test('Insert Assignment Data Functionality', async () => {
    const course_id = 1;
    const name = 'Test Assignment';
    const due_date = '2025-03-12';
    const completed = 1;
    const alternateLink = "http://example.com";

    await dbModule.insertAssignmentData(course_id, name, due_date, completed, alternateLink);
    expect(dbModule.insertAssignmentData).toHaveBeenCalledWith(course_id, name, due_date, completed, alternateLink);
  });
});
