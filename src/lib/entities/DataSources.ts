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

const jpRelays = [
  ...globalRelays,
  'wss://relay-jp.nostr.wirednet.jp',
  'wss://nostr.fediverse.jp',
  'wss://nostr.holybea.com',
  'wss://nostr-relay.nokotaro.com'
];

export const globalWeekly = new DataSource('Global', 'Weekly', globalRelays);
export const jpWeekly = new DataSource('JP', 'Weekly', jpRelays);
export const globalDaily = new DataSource('Global', 'Daily', globalRelays, true);
export const jpDaily = new DataSource('JP', 'Daily', jpRelays, true);
