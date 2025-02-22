import { useContext } from "react";

import { TranslationContext } from "../../services/translation/translation.context";
import { translation_dictionary } from "./translation.dictionary";

export const useTranslate = () => {
    const { language } = useContext(TranslationContext);

    return (key) => {
        const translation = translation_dictionary[language]
            ? translation_dictionary[language].find((t) => t.key === key)?.value
            : translation_dictionary["en"].find((t) => t.key === key)?.value;

        return translation || key;
    };
};


