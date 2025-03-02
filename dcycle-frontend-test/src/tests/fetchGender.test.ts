import { describe, expect, it, vi } from 'vitest';
import { fetchGender } from '../services/fetchGender';

describe('fetchGender', () => {
  it('fetches gender data successfully', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ gender: 'male', probability: 0.95 }),
    } as Response);

    const data = await fetchGender({ name: 'Mario' });
    expect(data?.gender).toBe('male');
    expect(data?.probability).toBe(0.95);
  });

  it('handles fetch errors', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValue(undefined);

    await expect(fetchGender({ name: 'Mario' })).resolves.toBe(undefined);
  });
});
