import { render, screen, fireEvent } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { vi, describe, it, expect } from 'vitest';
import Header from './Header';
import "@testing-library/jest-dom"

function renderHeader(props = {}) {
    const defaultProps = {
        isOpen: false,
        setOpen: vi.fn(),
    };
    const merged = { ...defaultProps, ...props };
    return {
        ...render(
            <MantineProvider>
                <Header {...merged} />
            </MantineProvider>
        ),
        setOpen: merged.setOpen,
    };
}

describe('Header', () => {
    it('отображает кнопку "Магазин овощей"', () => {
        renderHeader();
        expect(screen.getByText(/Магазин овощей/i)).toBeInTheDocument();
    });

    it('отображает кнопку "Корзина"', () => {
        renderHeader();
        expect(screen.getByText(/Корзина/i)).toBeInTheDocument();
    });

    it('вызывает setOpen(true) при клике на "Корзина" когда isOpen=false', () => {
        const { setOpen } = renderHeader({ isOpen: false });

        fireEvent.click(screen.getByText(/Корзина/i));
        expect(setOpen).toHaveBeenCalledWith(true);
    });

    it('вызывает setOpen(false) при клике на "Корзина" когда isOpen=true', () => {
        const { setOpen } = renderHeader({ isOpen: true });

        fireEvent.click(screen.getByText(/Корзина/i));
        expect(setOpen).toHaveBeenCalledWith(false);
    });

    it('не вызывает setOpen при клике на "Магазин овощей"', () => {
        const { setOpen } = renderHeader();

        fireEvent.click(screen.getByText(/Магазин овощей/i));
        expect(setOpen).not.toHaveBeenCalled();
    });

    it('содержит ровно две кнопки', () => {
        renderHeader();
        const buttons = screen.getAllByRole('button');
        expect(buttons).toHaveLength(2);
    });
});