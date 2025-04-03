import { renderHook } from '@testing-library/react';
import useMap from './map';

vi.mock('leaflet', async () => {
  const actual = await vi.importActual<typeof import('leaflet')>('leaflet');
  const mockMap = vi.fn(() => ({
    setView: vi.fn(),
    remove: vi.fn(),
  }));

  return {
    ...actual,
    Map: mockMap,
    tileLayer: vi.fn(() => ({ addTo: vi.fn() })),
  };
});

describe('Hook: useMap', () => {
  const city = { latitude: 48.8566, longitude: 2.3522, zoom: 12 };
  const mapRef = { current: document.createElement('div') };

  it('should creating map when ref is not "null"', () => {
    const { result } = renderHook(() => useMap({ mapRef, city }));

    expect(result.current).not.toBeNull();
  });
});
