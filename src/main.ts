import { Plugin } from "obsidian";
import { DEFAULT_SETTINGS, RainbowAlohaSettings, RainbowAlohaSettingTab } from "./settings";
import { DateSuggest } from "./suggest";

export default class RainbowAloha extends Plugin {
	settings!: RainbowAlohaSettings;

	async onload(): Promise<void> {
		await this.loadSettings();
		this.registerEditorSuggest(new DateSuggest(this));
		this.addSettingTab(new RainbowAlohaSettingTab(this.app, this));
	}

	async loadSettings(): Promise<void> {
		const data = (await this.loadData()) as Partial<RainbowAlohaSettings> | null;
		this.settings = Object.assign({}, DEFAULT_SETTINGS, data);
	}

	async saveSettings(): Promise<void> {
		await this.saveData(this.settings);
	}
}