document.addEventListener('DOMContentLoaded', () => {
    const linkCountElement = document.getElementById('link-count');
    const countBtn = document.getElementById('count-btn');
    const toggleBtn = document.getElementById('toggle-btn');
    const statusElement = document.getElementById('status');

    let linkCount = 0;
    let isToggled = false;

    // Função para atualizar o status na interface
    function updateStatus(message) {
        statusElement.textContent = message;
    }

    // Função para contar os links na página ativa
    function countLinks() {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const activeTab = tabs[0];
            if (!activeTab) {
                updateStatus('Nenhuma aba ativa encontrada.');
                return;
            }

            chrome.scripting.executeScript(
                {
                    target: { tabId: activeTab.id },
                    function: () => {
                        return document.querySelectorAll('a').length;
                    }
                },
                (results) => {
                    if (chrome.runtime.lastError) {
                        updateStatus(`Erro: ${chrome.runtime.lastError.message}`);
                        return;
                    }
                    if (results && results[0]) {
                        linkCount = results[0].result;
                        linkCountElement.textContent = linkCount;
                        updateStatus(`Links contados: ${linkCount}`);
                    } else {
                        updateStatus('Não foi possível contar os links.');
                    }
                }
            );
        });
    }

    // Função para destacar ou remover o destaque dos links
    function toggleLinks() {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const activeTab = tabs[0];
            if (!activeTab) {
                updateStatus('Nenhuma aba ativa encontrada.');
                return;
            }

            isToggled = !isToggled;
            
            chrome.scripting.executeScript(
                {
                    target: { tabId: activeTab.id },
                    function: (toggleState) => {
                        const links = document.querySelectorAll('a');
                        links.forEach(link => {
                            if (toggleState) {
                                link.style.border = '2px solid red';
                            } else {
                                link.style.border = '';
                            }
                        });
                        return toggleState;
                    },
                    args: [isToggled]
                },
                (results) => {
                    if (chrome.runtime.lastError) {
                        updateStatus(`Erro: ${chrome.runtime.lastError.message}`);
                        return;
                    }
                    const state = results[0].result ? 'destacados' : 'sem destaque';
                    updateStatus(`Links estão ${state}.`);
                }
            );
        });
    }

    // Event listeners para os botões
    countBtn.addEventListener('click', countLinks);
    toggleBtn.addEventListener('click', toggleLinks);

    // Adiciona uma função de teste para salvar a contagem
    document.getElementById('save-btn').addEventListener('click', () => {
        if (linkCount > 0) {
            chrome.storage.local.set({ savedLinkCount: linkCount }, () => {
                updateStatus(`Contagem de ${linkCount} salva com sucesso.`);
            });
        } else {
            updateStatus('Contagem de links não está disponível para salvar.');
        }
    });
});
