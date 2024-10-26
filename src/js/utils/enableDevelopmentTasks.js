export const isDevelopmentMode = () => {
  const env = process.env.NODE_ENV;
  return env === 'development';
};

export const enableDevelopment = () => {
  if (isDevelopmentMode()) {
    new EventSource('/esbuild').addEventListener(
      'change',
      () => location.reload(),
    );
  }
};
