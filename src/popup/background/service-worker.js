// Service worker (background)
chrome.runtime.onInstalled.addListener((details) => {
console.log('Bootcamp Helper instalado:', details);
chrome.storage.local.set({ installedAt: new Date().toISOString() });
});


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
if (message && message.type === 'PING'){
sendResponse({ ok: true, time: new Date().toISOString() });
}
// Retornar true se você quiser responder assíncrono. Aqui é síncrono.
});


// Example: alarm
chrome.alarms.onAlarm.addListener((alarm) => {
console.log('Alarm fired', alarm);
});