# to-av

? to async-validator rules.

Currently only support `zod` schemas.

Support features:

| Features | Parse To | Support |
|:-:|:-:|:-:|
| `z.string` | `type: 'string'` | ✅ |
| `z.number` | `type: 'number'` | ✅ | 
| `z.array` | `type: 'array'` | ✅ |
| `z.boolean` | `type: 'boolean'` | ✅ |
| `z.date` | `type: 'date'` | ✅ |
| `z.optional` | `required: false` | ✅ |
| `z.object` | `type: 'object'` with `deep rules` | ✅ |
| `z.min` | `min: number` | ✅ |
| `z.max` | `max: number` | ✅ |

More examples, see [test cases](./src/__test__/)

## Usage

### 1. Basic

```ts
import { parse } from 'to-av'

const rules = parse(z.object({
  name: zod.string(),
  age: zod.number().optional(),
}))
```

parsed to

```ts
const rules = {
  name: [{
    required: true,
    type: 'string',
  }],
  age: [{
    required: false,
    type: 'number',
  }],
}
```

### 2. Deep rules

```ts
const rule = parse(z.object({
  bar: z.number(),
  foo: z.object({
    bar: z.string(),
  }),
}))
```

parsed to

```ts
const rule = {
  bar: [{
    required: true,
    type: 'number',
  }],
  foo: [{
    fields: {
      bar: {
        required: true,
        type: 'string',
      },
    },
    required: true,
    type: 'object',
  }],
}
```

### 3. Custom message

```ts
const rule = z.object({
  name: z.string({
    required_error: 'name 必填',
  }),
  age: z.number({
    required_error: 'age 必填',
  }),
})
```

parsed to

```ts
const rules = {
  age: [{
    message: 'age 必填',
    required: true,
    type: 'number',
  }],
  name: [{
    message: 'name 必填',
    required: true,
    type: 'string',
  }],
}
```

### 4. range

```ts
const rule = z.object({
  name: z.string().min(2).max(10),
  age: z.number().min(18).max(100),
})
```

parsed to

```ts
const rule = {
  age: {
    max: 100,
    min: 18,
    required: true,
    type: 'number',
  },
  name: {
    max: 10,
    min: 2,
    required: true,
    type: 'string',
  },
}
```

## Installation

```bash
pnpm i to-av
```

## License

MIT