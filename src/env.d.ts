/// <reference types="@rsbuild/core/types" />
declare namespace NodeJS {
  interface ProcessEnv {
    PUBLIC_GIT_TOKEN: string;
  }
}

interface ImportMetaEnv {
  readonly PUBLIC_GIT_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
