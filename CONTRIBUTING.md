# Contributing

The easiest way to contribute is to add a language. A language is one small JSON file with four words, and you do not need to write any logic.

Rainbow Aloha does not cover English, because the original [Aloha](https://github.com/kepano/aloha) already does.

## Add a language

1. **Pick the language code.** Use the code Obsidian uses for that language, for example `pt` for Portuguese or `nl` for Dutch. For regional codes such as `pt-BR`, use only the part before the dash (`pt`). The plugin matches on that part.

2. **Create the file.** Copy `src/locales/es.json` to `src/locales/<code>.json` and translate the values. Do not change the keys.

   ```json
   {
   	"name": "Português",
   	"today": "Hoje",
   	"tomorrow": "Amanhã",
   	"yesterday": "Ontem"
   }
   ```

   - `name` is the name of the language written in that language. It is shown in the settings.
   - `today`, `tomorrow` and `yesterday` are the three words shown in the menu.

3. **Register it.** Open `src/locales/index.ts`, add an import at the top and add the language to `LOCALES`:

   ```ts
   import pt from "./pt.json";

   export const LOCALES = { de, es, fr, it, pt } satisfies Record<string, LocaleFile>;
   ```

   If a key is missing or misspelled in your JSON file, the build fails and tells you which one.

4. **Update the README.** Add a row for your language to the table in `README.md`.

5. **Check that it builds.**

   ```
   npm install
   npm run build
   ```

6. Open a pull request.

## Rules for the words

- **One word each, no spaces.** The menu closes as soon as you type a space, so a label like "Pasado mañana" would never match. Use a single word. Apostrophes and hyphens are fine, as in "Aujourd'hui".
- **Capitalize like a menu item.** Start with a capital letter, as in the other languages.
- **Accents and capitals are ignored when searching,** so you do not need to add variants without accents.
- Keep to the three words. The plugin intentionally does only today, tomorrow and yesterday, like the original.

## Development

```
npm install
npm run dev    # watch mode
npm run build  # production build
npm run lint
```