// xiaoyao-pdf fork desktop-layer shim.
//
// vite-tsconfig-paths v5 picks the *first* candidate from the tsconfig
// paths array and does not fall through when that file is missing. The
// `desktop → cloud → proprietary → core` cascade only works at design
// time; at build time proprietary/App.tsx unconditionally imports
// `@app/components/watchedFolders/WatchedFoldersRegistration`, which
// is a proprietary-only feature, and rollup fails because the
// desktop/ candidate is empty.
//
// Re-exporting from proprietary keeps a desktop→proprietary override
// path intact (if the desktop team ever ships a real desktop variant,
// drop this file). Same trick is needed for any other proprietary-only
// component the proprietary/App.tsx entry pulls in for desktop builds.

export { default } from "@proprietary/components/watchedFolders/WatchedFoldersRegistration";
