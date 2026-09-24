import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

const read = async (locale) => JSON.parse(await readFile(new URL(`../messages/${locale}.json`, import.meta.url), 'utf8'));
const [fr, en] = await Promise.all([read('fr'), read('en')]);
assert.deepEqual(Object.keys(en).sort(), Object.keys(fr).sort(), 'Les clés FR/EN doivent correspondre.');
for (const [locale, dictionary] of Object.entries({fr, en})) {
  for (const [key, value] of Object.entries(dictionary)) {
    assert.ok(typeof value === 'string' && value.trim(), `${locale}.${key} est vide.`);
  }
}
console.log(`FR/EN : ${Object.keys(fr).length} clés présentes et non vides dans chaque langue.`);
