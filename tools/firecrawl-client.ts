// tools/firecrawl-client.ts
const API_KEYS = [
    "process.env.FIRECRAWL_KEY_1",
    "process.env.FIRECRAWL_KEY_2",
    "process.env.FIRECRAWL_KEY_3",
    "process.env.FIRECRAWL_KEY_4",
    "process.env.FIRECRAWL_KEY_5"
  ];
  
  let currentKeyIndex = 0;
  
  export async function getFirecrawlClient() {
    // A kliens inicializálása az éppen aktív kulccsal
    return new FirecrawlApp({ apiKey: API_KEYS[currentKeyIndex] });
  }
  
  export function rotateKey() {
    currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
    console.log(`Kulcs váltva a következőre: index ${currentKeyIndex}`);
  }