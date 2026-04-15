import { render, screen, fireEvent, act } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import ListCard from './ListCard';
import ky from 'ky';
import '@testing-library/jest-dom/vitest';
vi.mock('ky', () => ({
    default: vi.fn(),
}));

const mockCards = [
    {
        id: 1,
        name: 'Brocolli - 1 Kg',
        price: 120,
        image: 'https://example.com/broccoli.jpg',
        category: 'vegetables',
    },
    {
        id: 2,
        name: 'Cauliflower - 1 Kg',
        price: 60,
        image: 'https://example.com/cauliflower.jpg',
        category: 'vegetables',
    },
];

function renderListCard(props = {}) {
    const defaultProps = {
        isOpen: false,
        setOpen: vi.fn(),
    };
    return render(
        <MantineProvider>
            <ListCard {...defaultProps} {...props} />
        </MantineProvider>
    );
}

// Хелпер: прокрутить setTimeout И дождаться промисов
async function loadCards() {
    await act(async () => {
        vi.advanceTimersByTime(1000);
    });
    // Даём React обработать setState после resolve промиса
    await act(async () => {
        await Promise.resolve();
    });
}

describe('ListCard', () => {
    beforeEach(() => {
        vi.useFakeTimers();
        (ky as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            json: vi.fn().mockResolvedValue(mockCards),
        });
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    it('показывает лоадер при загрузке', () => {
        renderListCard();
        expect(screen.getByText(/Ожидайте загрузки/i)).toBeInTheDocument();
    });

    it('отображает карточки после загрузки', async () => {
        renderListCard();
        await loadCards();

        expect(screen.getByText(/Brocolli/i)).toBeInTheDocument();
        expect(screen.getByText(/Cauliflower/i)).toBeInTheDocument();
    });

    it('отображает цены карточек', async () => {
        renderListCard();
        await loadCards();

        expect(screen.getByText(/120/)).toBeInTheDocument();
        expect(screen.getByText(/60/)).toBeInTheDocument();
    });

    it('разделяет название и вес', async () => {
        renderListCard();
        await loadCards();

        expect(screen.getByText('Brocolli')).toBeInTheDocument();
        expect(screen.getAllByText('1 Kg')).toHaveLength(2);
    });

    it('добавляет товар в корзину по клику', async () => {
        const setOpen = vi.fn();
        renderListCard({ setOpen });
        await loadCards();

        const addButtons = screen.getAllByRole('button', {
            name: /Добавить в корзину/i,
        });

        fireEvent.click(addButtons[0]);
        expect(setOpen).toHaveBeenCalledWith(true);
    });

    it('лоадер исчезает после загрузки карточек', async () => {
        renderListCard();
        expect(screen.getByText(/Ожидайте загрузки/i)).toBeInTheDocument();

        await loadCards();

        expect(screen.queryByText(/Ожидайте загрузки/i)).toBeNull();
    });

    it('обрабатывает ошибку загрузки', async () => {
        const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

        (ky as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            json: vi.fn().mockRejectedValue(new Error('Network error')),
        });

        renderListCard();
        await loadCards();

        expect(consoleSpy).toHaveBeenCalledWith('Network error');
        expect(screen.getByText(/Ожидайте загрузки/i)).toBeInTheDocument();

        consoleSpy.mockRestore();
    });
});