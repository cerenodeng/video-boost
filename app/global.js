export let sidebarState =
  globalThis.sidebarState ?? typeof window != 'undefined'
    ? window.localStorage.getItem('sidebarState')
    : 'open';
