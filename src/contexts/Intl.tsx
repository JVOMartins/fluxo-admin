import { createContext, useContext, useState } from 'react'
import { LangStrings } from '@languages/Strings'

export const defaultLocale = 'pt'
export const locales = ['pt', 'en']

export const LanguageContext = createContext([])

export const LanguageProvider: React.FC = ({ children }) => {
  const [locale, setLocale] = useState('pt')

  return (
    <LanguageContext.Provider value={[locale, setLocale]}>
      {children}
    </LanguageContext.Provider>
  )
}

export default function useTranslation() {
  const [locale, setLocale] = useContext(LanguageContext)

  const text = (key: string) => {
    if (!LangStrings[locale][key]) {
      console.warn(`No string '${key}' for locale '${locale}'`)
    }

    return LangStrings[locale][key] || LangStrings[defaultLocale][key] || ''
  }

  const updateLocale = (key: string) => setLocale(key)

  return { text, locale, updateLocale }
}
