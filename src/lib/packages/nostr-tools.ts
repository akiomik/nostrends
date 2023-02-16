import * as nostrTools from 'nostr-tools';

// work around for `"default" is not exported by "node_modules/nostr-tools/lib/nostr.esm.js"` error
const module = nostrTools.default ? nostrTools.default : nostrTools;
export default module;
