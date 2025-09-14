// Conteúdo injetado somente na URL definida em manifest (developer.chrome.com)
// Exemplo simples: adiciona um pequeno badge com número de links na página
(function(){
try{
const count = document.querySelectorAll('a').length;
const badge = document.createElement('div');
badge.textContent = `Links: ${count}`;
badge.style.position = 'fixed';
badge.style.right = '12px';
badge.style.bottom = '12px';
badge.style.background = '#ec0089';
badge.style.color = '#fff';
badge.style.padding = '6px 8px';
badge.style.borderRadius = '8px';
badge.style.zIndex = 999999;
document.body.appendChild(badge);
}catch(e){
console.warn('content script error', e);
}
})();