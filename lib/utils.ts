export const omitKeys = <T extends object>(
  input: T | T[],
  keysToRemove: Array<keyof T>
): T | T[] => {
  const removeKeysFromObject = (obj: T): T => {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      if (!keysToRemove.includes(key as keyof T)) {
        ;(acc as any)[key] = value
      }
      return acc
    }, {} as T)
  }

  return Array.isArray(input) ? input.map(removeKeysFromObject) : removeKeysFromObject(input)
}

export const removeValue = <T extends object, V>(
  input: T | T[],
  targetKey: keyof T,
  valueToRemove: V
): T | T[] => {
  const removeValueFromObject = (obj: T): T => {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      if (key === targetKey && Array.isArray(value)) {
        value = value.filter((item: V) => item !== valueToRemove)
      }
      ;(acc as any)[key] = value
      return acc
    }, {} as T)
  }

  return Array.isArray(input)
    ? input.map((item) => removeValueFromObject(item))
    : removeValueFromObject(input)
}
