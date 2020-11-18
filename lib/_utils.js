export function getGlobalObject() {
  try {
    return window;
  } catch (e) {
    return global;
  }
}
