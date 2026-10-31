Type `@` in the Obsidian editor to open an autocomplete menu with three options: today, tomorrow and yesterday. Choosing one inserts the date as a link, e.g. `[[2026-07-05]]`.

Rainbow Aloha is the international companion of [Aloha](https://github.com/kepano/aloha) by kepano, which covers English. This plugin covers:

| Language | Today | Tomorrow | Yesterday |
| --- | --- | --- | --- |
| Español | Hoy | Mañana | Ayer |
| Italiano | Oggi | Domani | Ieri |
| Français | Aujourd'hui | Demain | Hier |
| Deutsch | Heute | Morgen | Gestern |

## Language

By default the plugin follows the language of Obsidian. If Obsidian is set to English or to a language that is not supported, it falls back to Spanish. You can pick a language manually in the plugin settings.

Search ignores accents and capital letters, so `@manana` finds "Mañana".

## Add a language

A language is a small JSON file with four words. If yours is missing, see [CONTRIBUTING.md](CONTRIBUTING.md) for the steps.

## Development

```
npm install
npm run dev    # watch mode
npm run build  # production build
```

## Credits

Based on [Aloha](https://github.com/kepano/aloha) by kepano, which was inspired by [Natural Language Dates](https://github.com/argenos/nldates-obsidian).