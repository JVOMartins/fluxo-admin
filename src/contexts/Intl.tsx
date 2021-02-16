import { createContext, useContext, useState } from 'react'
import { LangStrings, locales, defaultLocale } from '@languages/Strings'

interface LanguageContextData {
  defaultLocale: string
  text(key: string): object
  currentLocale: string
  updateLocale(key: string): void
  avaliableLocales: Array<string>
}

export const LanguageContext = createContext<LanguageContextData>(
  {} as LanguageContextData
)

export const LanguageProvider: React.FC = ({ children }) => {
  const [currentLocale, setCurrentLocale] = useState('pt')

  const updateLocale = (key: string) => setCurrentLocale(key)

  const text = (key: string): object => {
    if (!LangStrings[currentLocale][key]) {
      console.warn(`No string '${key}' for locale '${currentLocale}'`)
    }

    return (
      LangStrings[currentLocale][key] || LangStrings[defaultLocale][key] || ''
    )
  }

  const avaliableLocales = locales

  return (
    <LanguageContext.Provider
      value={{
        defaultLocale,
        updateLocale,
        text,
        currentLocale,
        avaliableLocales
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

const useTranslation = () => useContext(LanguageContext)

export default useTranslation
