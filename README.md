# to-av

? to async-validator rules.

Currently only support `zod` schemas.

Support features:

| Features | Parse To | Support |
|:-:|:-:|:-:|
| `z.string` | `type: 'string'` | ✅ |
| `z.number` | `type: 'number'` | ✅ | 
| `z.array` | `type: 'array'` | ✅ |
| `z.optional` | `required: false` | ✅ |
| `z.min` | `min: number` | ❌ |

## Usage

```ts
import { parse } from 'to-av'

const rules = parse({
  name: zod.string(),
  age: zod.number().optional(),
})
/**
 * {
 *   name: { required: true },
 *   age: { required: false, type: 'number' },
 * }
 */
```

## Installation

```bash
pnpm i to-av
```

## License

MIT