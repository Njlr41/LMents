// src/lib/components/__tests__/Navigation.spec.js
import { render, screen, fireEvent } from '@testing-library/svelte';
import Navigation from '../Navigation.svelte';
import { goto } from '$app/navigation';
import SidebarComponent from '../Sidebar.svelte';

vi.mock('$app/navigation');

describe('Navigation', () => {
  test('Home Button is Functional', () => {
    render(Navigation);
    const Home = screen.getByAltText('LMents Logo');
    expect(Home).toBeTruthy();
    fireEvent.click(Home);
    expect(goto).toHaveBeenCalledWith('/');
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
  test('Menu Button updates sidebarToggle to true', () => {
    const onCloseMock = vi.fn();
  
    render(Navigation, {
      props: {
        sidebarToggle: false,
        onClose: onCloseMock,
      }
    });
  
    const menuButton = screen.getByAltText('Menu');
    expect(menuButton).toBeTruthy();
  
    fireEvent.click(menuButton);
  
    expect(onCloseMock).toHaveBeenCalledWith(true);
  });
})
