/* eslint-disable @typescript-eslint/no-empty-object-type */
/// <reference types="vite/client" />

type ImportMetaEnvAugmented =
  import('@julr/vite-plugin-validate-env').ImportMetaEnvAugmented<
    typeof import('../../env').default
  >

interface ImportMetaEnv extends ImportMetaEnvAugmented {}
