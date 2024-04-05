import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('<App>', function() {
  it("should render without fail.", function() {
    render(
      <App />
    )
  })
})
