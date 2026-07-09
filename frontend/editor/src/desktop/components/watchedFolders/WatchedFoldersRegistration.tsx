// xiaoyao-pdf fork desktop-layer shim.
//
// vite-tsconfig-paths v5 picks the *first* candidate from the tsconfig
// paths array and does not fall through when that file is missing on
// disk. The desktop cascade @app/* -> [desktop/, cloud/, proprietary/,
// core/] therefore fails on rollup:
//
//   Rollup failed to resolve import
//   "@app/components/watchedFolders/WatchedFoldersRegistration"
//   from src/proprietary/App.tsx
//
// because src/desktop/components/watchedFolders/ is empty even
// though src/proprietary/components/watchedFolders/ has the real file.
//
// Re-exporting from proprietary keeps a desktop -> proprietary
// override path intact (if the desktop team ever ships a real desktop
// variant, drop this file and edit the relative path below).
//
// We intentionally use a *relative path* instead of an @proprietary/*
// alias import — the @proprietary/* alias resolves to
// ./src/proprietary/* via tsconfig, and on some pnpm hoisted /
// non-flat layouts the alias resolver fails before the filesystem
// fallback. Relative imports bypass the alias system entirely.

import WatchedFoldersRegistration from "../../../proprietary/components/watchedFolders/WatchedFoldersRegistration";

export default WatchedFoldersRegistration;
