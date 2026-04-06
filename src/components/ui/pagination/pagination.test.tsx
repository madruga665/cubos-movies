import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from './pagination';

describe('Pagination component', () => {
  it('renders pages', () => {
    const onPageChange = jest.fn();
    render(<Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />);
    
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('3'));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });
});
