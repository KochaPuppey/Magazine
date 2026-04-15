
import {render,screen, fireEvent,} from "@testing-library/react";
import { expect, it,describe, } from "vitest";
import App from "../../App";
import { MantineProvider } from '@mantine/core';
import "@testing-library/jest-dom"
beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: (query: string) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: () => {},
            removeListener: () => {},
            addEventListener: () => {},
            removeEventListener: () => {},
            dispatchEvent: () => false,
        }),
    });
});

describe('App', () => {
    it('Проверка пустой корзины', () => {
        render(
            <MantineProvider>
        <App />
        </MantineProvider>);
        const cart = screen.getByText(/корзина/i)
        expect(cart).toBeInTheDocument();
        expect(screen.queryByText(/пустая корзина/i)).toBeNull();
        fireEvent.click(cart);
        expect(screen.getByText(/пустая корзина/i)).toBeInTheDocument();
    });
})