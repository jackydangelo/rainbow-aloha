import { App, PluginSettingTab, Setting, getLanguage } from "obsidian";
import { LANGUAGE_NAMES, Lang, isLang, resolveLanguage } from "./locales";
import type RainbowAloha from "./main";

export interface RainbowAlohaSettings {
	language: Lang | "auto";
}

export const DEFAULT_SETTINGS: RainbowAlohaSettings = {
	language: "auto",
};

export class RainbowAlohaSettingTab extends PluginSettingTab {
	plugin: RainbowAloha;

	constructor(app: App, plugin: RainbowAloha) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		const detected = LANGUAGE_NAMES[resolveLanguage("auto", getLanguage())];

		new Setting(containerEl)
			.setName("Language")
			.setDesc("Language of the date suggestions that appear after typing @.")
			.addDropdown((dropdown) => {
				dropdown.addOption("auto", `Follow Obsidian (${detected})`);
				for (const [code, name] of Object.entries(LANGUAGE_NAMES)) {
					dropdown.addOption(code, name);
				}
				dropdown.setValue(this.plugin.settings.language);
				dropdown.onChange(async (value) => {
					this.plugin.settings.language = isLang(value) ? value : "auto";
					await this.plugin.saveSettings();
				});
			});
	}
}