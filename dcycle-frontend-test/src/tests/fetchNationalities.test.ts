import { describe, expect, it, vi } from 'vitest';
import { fetchNationalities } from '../services/fetchNationalities';

describe('fetchNationalities', () => {
  it('fetches nationalities data successfully', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({ country: [{ country_id: 'US', probability: 0.7 }] }),
    } as Response);

    const data = await fetchNationalities({ name: 'Mario' });
    expect(data).toEqual({ country: [{ country_id: 'US', probability: 0.7 }] });
  });

  it('handles fetch errors', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValue(undefined);

    await expect(fetchNationalities({ name: 'Mario' })).resolves.toBe(
      undefined
    );
  });
});
