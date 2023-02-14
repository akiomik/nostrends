import Region from './Region';

const globalRelays = [
  // 'wss://brb.io',
  // 'wss://eden.nostr.land',
  // // 'wss://nos.lol',
  // 'wss://nostr.mom',
  // // 'wss://nostr.orangepill.dev',
  // 'wss://relay.current.fyi',
  'wss://relay.damus.io'
  // // 'wss://relay.snort.social'
];

export const globalRegion = new Region('Global', globalRelays);

export const jpRegion = new Region('JP', [
  // ...globalRelays,
  'wss://relay-jp.nostr.wirednet.jp'
  // 'wss://nostr.h3y6e.com',
  // 'wss://nostr.h3z.jp',
  // 'wss://nostr.fediverse.jp',
  // 'wss://nostr.holybea.com',
  // 'wss://nostr-relay.nokotaro.com'
]);
