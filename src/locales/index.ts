import de from "./de.json";
import es from "./es.json";
import fr from "./fr.json";
import it from "./it.json";

export interface DateWord {
	label: string;
	/** Days from today: 0 = today, 1 = tomorrow, -1 = yesterday. */
	offset: number;
}

export interface LocaleFile {
	/** Name of the language in that language, shown in the settings. */
	name: string;
	today: string;
	tomorrow: string;
	yesterday: string;
}

/**
 * To add a language: create src/locales/<code>.json, import it above and
 * add it here. The key is the Obsidian language code. See CONTRIBUTING.md.
 */
export const LOCALES = { de, es, fr, it } satisfies Record<string, LocaleFile>;

export type Lang = keyof typeof LOCALES;

export const LANGUAGE_NAMES = Object.fromEntries(
	Object.entries(LOCALES).map(([code, locale]) => [code, locale.name]),
) as Record<Lang, string>;

/** English is covered by the original plugin, so it falls back to Spanish. */
export const FALLBACK_LANG: Lang = "es";

export function isLang(value: string): value is Lang {
	return Object.keys(LOCALES).includes(value);
}

export function getWords(lang: Lang): DateWord[] {
	const locale: LocaleFile = LOCALES[lang];
	return [
		{ label: locale.today, offset: 0 },
		{ label: locale.tomorrow, offset: 1 },
		{ label: locale.yesterday, offset: -1 },
	];
}

export function resolveLanguage(setting: Lang | "auto", obsidianLang: string): Lang {
	if (setting !== "auto") return setting;
	const base = obsidianLang.toLowerCase().split("-")[0] ?? "";
	return isLang(base) ? base : FALLBACK_LANG;
}