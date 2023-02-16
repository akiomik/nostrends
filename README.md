# Nostrends

What's trending on [nostr](https://nostr.com/)?

- https://nostrends.vercel.app/

## Development

```bash
npm install
npm run dev -- --open
```

## About `events/**/*.json`

A json describing how much a note has been responded to is required in `src/lib/events/`.
The format is as follows.

```js
{
  "foo": 42,
  "bar": 99
}
```
