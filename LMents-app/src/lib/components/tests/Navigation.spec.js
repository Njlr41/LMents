// src/lib/components/__tests__/Navigation.spec.js
import { render, screen, fireEvent } from '@testing-library/svelte';
import Navigation from '../Navigation.svelte';
import { goto } from '$app/navigation';

vi.mock('$app/navigation');

describe('Navigation', () => {
  test('Home Button is Functional', () => {
    render(Navigation);
    const Home = screen.getByAltText('Lments Logo');
    expect(Home).toBeTruthy();
    fireEvent.click(Home);
    expect(goto).toHaveBeenCalledWith('/');
  });
  
  test('Login Button is Functional', () => {
    render(Navigation);
    const Login = screen.getByAltText('Login');
    expect(Login).toBeTruthy();
    fireEvent.click(Login);
    expect(goto).toHaveBeenCalledWith('/signup');
  });

  test('Courses Button is Functional', () => {
    render(Navigation);
    const Courses = screen.getByAltText('Courses');
    expect(Courses).toBeTruthy();
    fireEvent.click(Courses);
    expect(goto).toHaveBeenCalledWith('/courses');
  });

  test('Assignments Button is Functional', () => {
    render(Navigation);
    const Assignments = screen.getByAltText('Assignments');
    expect(Assignments).toBeTruthy();
    fireEvent.click(Assignments);
    expect(goto).toHaveBeenCalledWith('/assignments');
  });

  test('Announcements Button is Functional', () => {
    render(Navigation);
    const Announcements = screen.getByAltText('Announcements');
    expect(Announcements).toBeTruthy();
    fireEvent.click(Announcements);
    expect(goto).toHaveBeenCalledWith('/announcements');
  });
})