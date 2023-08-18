const path = "/static/theme/";
const ext = ".css";
const themeFiles = import.meta.glob("/static/theme/*.css");

export const themes = Object.keys(themeFiles).map((t) =>
  t.replace(path, "").replace(ext, "")
);
