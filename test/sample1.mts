export interface A {
  name?: string;
  point: [x: number, y: number, z?: number];
  meta: {
    description?: string;
    tags: string[];
    data: Record<string, unknown>;
  };
}

export const sampleA = {
  point: [1, 2],
  meta: {
    tags: ['example', 'test'],
    data: {
      key1: 'value1',
      key2: 42,
    },
  },
} satisfies A;
