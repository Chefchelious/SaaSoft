import { Notify } from './notify'

export const validatePassword = (password: string | null): string | true => {
  const MIN_LENGTH = 8
  const MAX_LENGTH = 100

  const trimmed = password?.trim() ?? ''

  const isValid =
    trimmed.length >= MIN_LENGTH &&
    trimmed.length <= MAX_LENGTH &&
    /^\S+$/.test(trimmed)

  if (!isValid) {
    Notify.error(`Пароль должен быть от ${MIN_LENGTH} до ${MAX_LENGTH} символов без пробелов`)
    return ''
  }

  return true
}
