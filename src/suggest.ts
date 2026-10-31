import {
	Editor,
	EditorPosition,
	EditorSuggest,
	EditorSuggestContext,
	EditorSuggestTriggerInfo,
	TFile,
	getLanguage,
} from "obsidian";
import { DateWord, getWords, resolveLanguage } from "./locales";
import type RainbowAloha from "./main";

// Only trigger when @ is at the start of the line or preceded by a space.
// Unlike \w, [^\s@] keeps the menu open on accented letters and apostrophes.
const TRIGGER = /(?:^|\s)@([^\s@]*)$/;

/** Lowercase, strip accents and unify apostrophes so "manana" matches "Mañana". */
function normalize(text: string): string {
	return text
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/’/g, "'")
		.toLowerCase();
}

// Local calendar date, offset by whole days, as YYYY-MM-DD.
function formatDate(offsetDays: number): string {
	const date = new Date();
	date.setDate(date.getDate() + offsetDays);
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${date.getFullYear()}-${month}-${day}`;
}

export class DateSuggest extends EditorSuggest<DateWord> {
	plugin: RainbowAloha;

	constructor(plugin: RainbowAloha) {
		super(plugin.app);
		this.plugin = plugin;
	}

	onTrigger(
		cursor: EditorPosition,
		editor: Editor,
		_file: TFile | null,
	): EditorSuggestTriggerInfo | null {
		const before = editor.getLine(cursor.line).slice(0, cursor.ch);
		const match = TRIGGER.exec(before);
		if (!match) return null;

		const query = match[1] ?? "";
		return {
			// +1 for the @ itself.
			start: { line: cursor.line, ch: cursor.ch - query.length - 1 },
			end: cursor,
			query,
		};
	}

	getSuggestions(context: EditorSuggestContext): DateWord[] {
		const lang = resolveLanguage(this.plugin.settings.language, getLanguage());
		const query = normalize(context.query);
		return getWords(lang).filter((word) => normalize(word.label).startsWith(query));
	}

	renderSuggestion(word: DateWord, el: HTMLElement): void {
		el.setText(word.label);
	}

	selectSuggestion(word: DateWord): void {
		const context = this.context;
		if (!context) return;

		const link = `[[${formatDate(word.offset)}]]`;
		context.editor.replaceRange(link, context.start, context.end);
		context.editor.setCursor({
			line: context.start.line,
			ch: context.start.ch + link.length,
		});
	}
}