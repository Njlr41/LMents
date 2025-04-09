// src/lib/components/__tests__/Navigation.spec.js
import { render, screen, fireEvent } from '@testing-library/svelte';
import Navigation from '../Navigation.svelte';
import { goto } from '$app/navigation';
import SidebarComponent from '../Sidebar.svelte';
vi.mock('$app/navigation');

describe('Sidebar', () => {

  test('Close button updates sidebarToggle to false', async () => {
    const onCloseMock = vi.fn();

    render(SidebarComponent, {
      props: { 
        sidebarToggle: true, 
        onClose: onCloseMock 
      } 
    });
    const close = screen.getByAltText('Close');
    expect(close).toBeTruthy();
    fireEvent.click(close);

    expect(onCloseMock).toHaveBeenCalledWith(false);
  });
  test('Login Button is Functional', () => {
    const onCloseMock = vi.fn();
    render(SidebarComponent, {
      props: { 
        sidebarToggle: true, 
        onClose: onCloseMock 
      } 
    });

    const Login = screen.getByText('Account Settings');
    expect(Login).toBeTruthy();
    fireEvent.click(Login);
    expect(goto).toHaveBeenCalledWith('/signup');
  });

});