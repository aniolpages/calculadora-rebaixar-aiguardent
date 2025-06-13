class I18n {
    constructor() {
        this.currentLanguage = 'ca';
        this.translations = {};
        this.defaultStrings = {
            title: "Calculadora per rebaixar l'aiguardent",
            subtitle: "Calcula fàcilment quanta aigua i sucre has d'afegir a la teva ratafia per aconseguir la graduació desitjada.",
            current_volume: "Volum d'aiguardent actual",
            volume_note: "Nota: després de la maceració i filtratge el volum i el grau de l'aiguardent haurà disminuït respecte a l'inicial.",
            current_alcohol: "Graduació d'alcohol actual",
            alcohol_note: "Nota: es mesura amb un alcoholímetre, sempre que l'aiguardent no porti o hi hàgim afegit sucre.",
            desired_alcohol: "Graduació d'alcohol desitjada",
            sugar_amount: "Sucre que vols afegir per litre",
            add: "Afegeix",
            water: "d'aigua",
            sugar: "de sucre",
            developed_by: "Desenvolupat per la Confraria de la Ratafia.",
            volume_placeholder: "1000 (ml)",
            alcohol_placeholder: "29 (%)",
            desired_placeholder: "24 (%)",
            sugar_placeholder: "150 (g)",
            result_text: "Per aconseguir un volum de <b>{volume} ml</b> a una graduació de <b>{alcohol} %</b>. <br><br>Recomanem utilitzar aigua de mineralització molt dèbil. Per minimitzar l'enterboliment de la ratafia, afegiu l'aiguardent sobre el xarop."
        };
    }

    async init() {
        this.currentLanguage = this.detectLanguage();
        await this.loadTranslations(this.currentLanguage);
        this.setupLanguageSelector();
        this.translatePage();
    }

    detectLanguage() {
        const saved = localStorage.getItem('selectedLanguage');
        if (saved && ['ca', 'es', 'en', 'fr', 'de', 'it', 'pt', 'jp'].includes(saved)) {
            return saved;
        }
        
        const browserLang = navigator.language.slice(0, 2);
        return ['ca', 'es', 'en', 'fr', 'de', 'it', 'pt', 'jp'].includes(browserLang) ? browserLang : 'ca';
    }

    async loadTranslations(lang) {
        if (lang === 'ca') {
            this.translations = this.defaultStrings;
            return;
        }

        try {
            const response = await fetch(`./translations/${lang}.json`);
            if (response.ok) {
                this.translations = await response.json();
            } else {
                this.translations = this.defaultStrings;
            }
        } catch (error) {
            console.warn(`Failed to load translations for ${lang}:`, error);
            this.translations = this.defaultStrings;
        }
    }

    setupLanguageSelector() {
        const selector = document.getElementById('language-select');
        selector.value = this.currentLanguage;
        
        selector.addEventListener('change', async (e) => {
            const newLang = e.target.value;
            localStorage.setItem('selectedLanguage', newLang);
            this.currentLanguage = newLang;
            await this.loadTranslations(newLang);
            this.translatePage();
            document.documentElement.lang = newLang;
        });
    }

    translatePage() {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (this.translations[key]) {
                element.textContent = this.translations[key];
            }
        });

        document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
            const key = element.getAttribute('data-translate-placeholder');
            if (this.translations[key]) {
                element.placeholder = this.translations[key];
            }
        });

        if (this.translations.title) {
            document.title = this.translations.title + ' - Confraria de la Ratafia';
        }

        novesDades();
    }

    t(key, params = {}) {
        let text = this.translations[key] || key;
        
        Object.keys(params).forEach(param => {
            text = text.replace(`{${param}}`, params[param]);
        });
        
        return text;
    }
}

const i18n = new I18n();
window.i18n = i18n;

document.addEventListener('DOMContentLoaded', () => {
    i18n.init();
});