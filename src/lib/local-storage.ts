export interface LocalStorage {
  get<T>(key: string): T | null;
  has(key: string): boolean;
  remove(key: string): void;
  set(key: string, value: unknown): void;
}

export const localStorage = {
  get<T>(key: string): T | null {
    if (this.has(key)) {
      return JSON.parse(window.localStorage.getItem(key)!);
    }
    return null;
  },
  has(key: string) {
    return window.localStorage.getItem(key) !== null;
  },
  remove(key: string) {
    window.localStorage.removeItem(key);
  },
  set(key: string, value: unknown) {
    window.localStorage.setItem(key, JSON.stringify(value));
  },
};
