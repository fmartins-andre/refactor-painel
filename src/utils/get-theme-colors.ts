function getStyleProperty(property: string): string {
  return `hsl(var(${property}))`
}

export default function getThemeColors() {
  return {
    dark: getStyleProperty('--black'),
    black: getStyleProperty('--black'),
    white: getStyleProperty('--white'),

    border: getStyleProperty('--border'),
    input: getStyleProperty('--input'),
    ring: getStyleProperty('--ring'),
    light: getStyleProperty('--light'),
    background: getStyleProperty('--background'),
    foreground: getStyleProperty('--foreground'),

    primary: getStyleProperty('--primary'),
    primarySuperSlighter: getStyleProperty('--primary-s-lighter'),
    primaryLighter: getStyleProperty('--primary-lighter'),
    primaryLight: getStyleProperty('--primary-light'),
    primaryDark: getStyleProperty('--primary-dark'),
    primaryDarker: getStyleProperty('--primary-darker'),
    primaryForeground: getStyleProperty('--primary-foreground'),

    secondary: getStyleProperty('--secondary'),
    secondarySuperLighter: getStyleProperty('--secondary-s-lighter'),
    secondaryLighter: getStyleProperty('--secondary-lighter'),
    secondaryLight: getStyleProperty('--secondary-light'),
    secondaryDark: getStyleProperty('--secondary-dark'),
    secondaryDarker: getStyleProperty('--secondary-darker'),
    secondaryForeground: getStyleProperty('--secondary-foreground'),

    destructive: getStyleProperty('--destructive'),
    destructiveForeground: getStyleProperty('--destructive-foreground'),

    muted: getStyleProperty('--muted'),
    mutedForeground: getStyleProperty('--muted-foreground'),

    accent: getStyleProperty('--accent'),
    accentForeground: getStyleProperty('--accent-foreground'),

    warning: getStyleProperty('--warning'),
    warningForeground: getStyleProperty('--black'),

    success: getStyleProperty('--success'),
    successForeground: getStyleProperty('--black'),

    info: getStyleProperty('--info'),
    infoForeground: getStyleProperty('--black'),

    alert: getStyleProperty('--alert'),
    alertForeground: getStyleProperty('--black'),

    error: getStyleProperty('--error'),
    errorForeground: getStyleProperty('--black'),

    brandAccent1: getStyleProperty('--brand-accent-1'),
    brandAccent2: getStyleProperty('--brand-accent-2'),
    brandAccent3: getStyleProperty('--brand-accent-3'),
    brandAccent4: getStyleProperty('--brand-accent-4'),
    brandAccent5: getStyleProperty('--brand-accent-5'),
  }
}
