import { describe, expect, it, vi } from 'vitest';
import { fetchAge } from '../services/fetchAge';

describe('fetchAge', () => {
  it('fetches age data successfully', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ age: 25 }),
    } as Response);

    const data = await fetchAge({ name: 'Mario' });
    expect(data?.age).toBe(25);
  });

  it('handles fetch errors', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValue(undefined);

    await expect(fetchAge({ name: 'Mario' })).resolves.toBe(undefined);
  });
});
