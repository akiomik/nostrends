import DataSource from '$lib/entities/DataSource';

const globalRelays = [
  'wss://brb.io',
  'wss://eden.nostr.land',
  'wss://nos.lol',
  'wss://nostr.mom',
  'wss://relay.current.fyi',
  'wss://relay.damus.io',
  'wss://relay.snort.social'
];
const globalRegion = { name: 'Global', relays: globalRelays };

const jpRelays = [
  ...globalRelays,
  'wss://relay-jp.nostr.wirednet.jp',
  'wss://nostr.fediverse.jp',
  'wss://nostr.holybea.com',
  'wss://nostr-relay.nokotaro.com'
];
const jpRegion = { name: 'JP', relays: jpRelays };

export const globalWeekly = new DataSource(globalRegion, 'Weekly');
export const jpWeekly = new DataSource(jpRegion, 'Weekly');
export const globalDaily = new DataSource(globalRegion, 'Daily', true);
export const jpDaily = new DataSource(jpRegion, 'Daily', true);
