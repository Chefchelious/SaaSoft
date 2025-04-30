import { Notify } from './notify'

const tagRegex = /^([a-zA-Zа-яА-ЯёЁ]+)(\s*;\s*[a-zA-Zа-яА-ЯёЁ]+)*$/i

export const validateTagInput = (val: string): string | true => {
  const trimmed = val.trim()

  if (!trimmed) return true

  if (trimmed.length > 50) {
    Notify.error('Максимум 50 символов')
    return ''
  }

  if (!tagRegex.test(val)) {
    Notify.error('Введите метки через ;, содержащие только буквы, без пробелов и спецсимволов')
    return ''
  }

  return true
}
