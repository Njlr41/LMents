// src/lib/components/__tests__/Navigation.spec.js
import { render, screen } from '@testing-library/svelte';
import Navigation from '../Navigation.svelte'; // import the .svelte component

describe('Navigation', () => {
  test('Home Button Renders', () => {
    render(Navigation);
    const Home = screen.getByText('Home');
    expect(Home).toBeTruthy();
  });
})
