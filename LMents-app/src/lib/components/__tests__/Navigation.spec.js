// src/lib/components/__tests__/Navigation.spec.js
import { render, screen } from '@testing-library/svelte';
import Navigation from '../Navigation.svelte'; // import the .svelte component

describe('Navigation', () => {
  test('Home Button Renders', () => {
    render(Navigation);
    const Home = screen.getByText('Home');
    expect(Home).toBeTruthy();
  });

  test('Login Button Renders', () => {
    render(Navigation);
    const Login = screen.getByText('Login');
    expect(Login).toBeTruthy();
  })

  test('Courses Button Renders', () => {
    render(Navigation);
    const Courses = screen.getByText('Courses');
    expect(Courses).toBeTruthy();
  })

  test('Assignments Button Renders', () => {
    render(Navigation);
    const Assignments = screen.getByText('Assignments');
    expect(Assignments).toBeTruthy();
  })

  test('Announcements Button Renders', () => {
    render(Navigation);
    const Announcements = screen.getByText('Announcements');
    expect(Announcements).toBeTruthy();
  })
})
