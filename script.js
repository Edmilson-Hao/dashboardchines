// Tabela Exata do Algoritmo SRS (Nível: Dias adicionados a partir da data de marcação)
const SRS_INTERVALS = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 7,
  7: 9,
  8: 12,
  9: 16,
  10: 22,
  11: 29,
  12: 38,
  13: 50,
  14: 65,
  15: 86,
  16: 114,
  17: 150
};
const MAX_SRS_LEVEL = 17;

// Acervo Inicial
const defaultPhrases = [
  {"id": 1, "hanzi": "我早上四点起床去上班。", "pinyin": "Wǒ zǎoshang sì diǎn qǐchuáng qù shàngbān.", "traducao": "Eu acordo às quatro da manhã e vou trabalhar."},
  {"id": 2, "hanzi": "我的朋友周末喜欢去电影院。", "pinyin": "Wǒ de péngyou zhōumò xǐhuan qù diànyǐngyuàn.", "traducao": "Meu amigo gosta de ir ao cinema no fim de semana."},
  {"id": 3, "hanzi": "爸爸喜欢下班后在家看电影。", "pinyin": "Bàba xǐhuan xiàbān hòu zài jiā kàn diànyǐng.", "traducao": "Papai gosta de assistir filme em casa depois do trabalho."},
  {"id": 4, "hanzi": "我昨天买了一本很好看的书。", "pinyin": "Wǒ zuótiān mǎile yì běn hěn hǎokàn de shū.", "traducao": "Eu comprei um livro muito bom ontem."},
  {"id": 5, "hanzi": "妈妈会开车，还会说中文。", "pinyin": "Māma huì kāichē, hái huì shuō Zhōngwén.", "traducao": "Mamãe sabe dirigir e também sabe falar chinês."},
  {"id": 6, "hanzi": "他喜欢喝茶，她喜欢喝牛奶。", "pinyin": "Tā xǐhuan hē chá, tā xǐhuan hē niúnǎi.", "traducao": "Ele gosta de beber chá, ela gosta de beber leite."},
  {"id": 7, "hanzi": "她们都喜欢热咖啡。", "pinyin": "Tāmen dōu xǐhuan rè kāfēi.", "traducao": "Elas todas gostam de café quente."},
  {"id": 8, "hanzi": "我今天中午吃了豆腐和面。", "pinyin": "Wǒ jīntiān zhōngwǔ chīle dòufu hé miàn.", "traducao": "Eu comi tofu e macarrão no almoço de hoje."},
  {"id": 9, "hanzi": "老师明天早上去医院看病。", "pinyin": "Lǎoshī míngtiān zǎoshang qù yīyuàn kànbìng.", "traducao": "O professor vai ao hospital consultar o médico amanhã de manhã."},
  {"id": 10, "hanzi": "弟弟喜欢粥和日本汤。", "pinyin": "Dìdi xǐhuan zhōu hé Rìběn tāng.", "traducao": "O irmão mais novo gosta de mingau e sopa japonesa."},
  {"id": 11, "hanzi": "医生跟我说中文。", "pinyin": "Yīshēng gēn wǒ shuō Zhōngwén.", "traducao": "O médico fala chinês comigo."},
  {"id": 12, "hanzi": "我想去超市买两个苹果。", "pinyin": "Wǒ xiǎng qù chāoshì mǎi liǎng ge píngguǒ.", "traducao": "Eu quero ir ao supermercado comprar duas maçãs."},
  {"id": 13, "hanzi": "我的好朋友在商店里买的那个东西多少钱？", "pinyin": "Wǒ de hǎo péngyou zài shāngdiàn lǐ mǎi de nàge dōngxi duōshǎo qián?", "traducao": "Quanto custa aquela coisa que meu bom amigo comprou na loja?"},
  {"id": 14, "hanzi": "你现在在房间里吗？", "pinyin": "Nǐ xiànzài zài fángjiān lǐ ma?", "traducao": "Você está no quarto agora?"},
  {"id": 15, "hanzi": "外边那个男人非常高兴。", "pinyin": "Wàibian nàge nánrén fēicháng gāoxìng.", "traducao": "Aquele homem lá fora está muito feliz."},
  {"id": 16, "hanzi": "明天天气很冷，也会下雪。", "pinyin": "Míngtiān tiānqì hěn lěng, yě huì xià xuě.", "traducao": "Amanhã o tempo vai estar muito frio e também vai nevar."},
  {"id": 17, "hanzi": "昨天天气很热，我和朋友没有去跑步。", "pinyin": "Zuótiān tiānqì hěn rè, wǒ hé péngyou méiyǒu qù pǎobù.", "traducao": "Ontem o tempo estava muito quente, eu e meu amigo não fomos correr."},
  {"id": 18, "hanzi": "晚饭我不喝酒。", "pinyin": "Wǎnfàn wǒ bù hējiǔ.", "traducao": "No jantar eu não bebo álcool."},
  {"id": 19, "hanzi": "你认识那个漂亮的学生。", "pinyin": "Nǐ rènshi nàge piàoliang de xuésheng.", "traducao": "Você conhece aquele estudante bonito."},
  {"id": 20, "hanzi": "我有两只狗，妈妈不喜欢猫。", "pinyin": "Wǒ yǒu liǎng zhī gǒu, māma bù xǐhuan māo.", "traducao": "Eu tenho dois cachorros, mamãe não gosta de gatos."},
  {"id": 21, "hanzi": "弟弟正在大学学习中文。", "pinyin": "Dìdi zhèngzài dàxué xuéxí Zhōngwén.", "traducao": "O irmão mais novo está estudando chinês na universidade."},
  {"id": 22, "hanzi": "晚上我和我爸爸一起去中国工作。", "pinyin": "Wǎnshang wǒ hé wǒ bàba yìqǐ qù Zhōngguó gōngzuò.", "traducao": "À noite, eu e meu pai vamos juntos trabalhar na China."},
  {"id": 23, "hanzi": "我爱我可爱的猫。", "pinyin": "Wǒ ài wǒ kě'ài de māo.", "traducao": "Eu amo meu gato fofo."},
  {"id": 24, "hanzi": "现在他在外边玩。", "pinyin": "Xiànzài tā zài wàibian wán.", "traducao": "Agora ele está brincando lá fora."},
  {"id": 25, "hanzi": "我买了一台新电脑。", "pinyin": "Wǒ mǎile yì tái xīn diànnǎo.", "traducao": "Eu comprei um computador novo."},
  {"id": 26, "hanzi": "星期六上午我睡觉。", "pinyin": "Xīngqīliù shàngwǔ wǒ shuìjiào.", "traducao": "Sábado de manhã eu durmo."},
  {"id": 27, "hanzi": "白天我休息。", "pinyin": "Báitiān wǒ xiūxi.", "traducao": "Durante o dia eu descanso."},
  {"id": 28, "hanzi": "包子很好吃，也便宜。", "pinyin": "Bāozi hěn hǎochī, yě piányi.", "traducao": "O pão recheado é gostoso e também barato."},
  {"id": 29, "hanzi": "你早饭吃什么？", "pinyin": "Nǐ zǎofàn chī shénme?", "traducao": "O que você come no café da manhã?"},
  {"id": 30, "hanzi": "桌子上有杯子。", "pinyin": "Zhuōzi shàng yǒu bēizi.", "traducao": "Em cima da mesa tem um copo."},
  {"id": 31, "hanzi": "午饭不是包子。", "pinyin": "Wǔfàn bú shì bāozi.", "traducao": "O almoço não é pão recheado."},
  {"id": 32, "hanzi": "我醒了，向妈妈看。", "pinyin": "Wǒ xǐng le, xiàng māma kàn.", "traducao": "Eu acordei e olhei para a mamãe."},
  {"id": 33, "hanzi": "请问你们下午能来学校见同学吗？", "pinyin": "Qǐngwèn nǐmen xiàwǔ néng lái xuéxiào jiàn tóngxué ma?", "traducao": "Com licença, vocês podem vir à escola à tarde para encontrar os colegas de classe?"},
  {"id": 34, "hanzi": "请别让爱凋落。", "pinyin": "Qǐng bié ràng ài diāoluò.", "traducao": "Por favor, não deixe o amor murchar."},
  {"id": 35, "hanzi": "今天我去健身房练腿做了杠铃深蹲。", "pinyin": "Jīntiān wǒ qù jiànshēnfáng liàn tuǐ zuòle gànglíng shēndūn.", "traducao": "Hoje eu fui à academia treinar perna e fiz agachamento com barra."},
  {"id": 36, "hanzi": "今天练了杠铃卧推。", "pinyin": "Jīntiān liànle gànglíng wòtuī.", "traducao": "Hoje treinei supino reto com barra."},
  {"id": 37, "hanzi": "你打打电话，问问他去不去饭店。", "pinyin": "Nǐ dǎ dǎ diànhuà, wèn wen tā qù bu qù fàndiàn.", "traducao": "Faz uma chamada e pergunta se ele vai ou não ao restaurante."},
  {"id": 38, "hanzi": "大家觉得这首歌很好听。", "pinyin": "Dàjiā juéde zhè shǒu gē hěn hǎotīng.", "traducao": "Todo o mundo acha esta música muito boa de ouvir."},
  {"id": 39, "hanzi": "我妹妹在公司工作，很忙。", "pinyin": "Wǒ mèimei zài gōngsī gōngzuò, hěn máng.", "traducao": "A minha irmã mais nova trabalha numa empresa e está muito ocupada."},
  {"id": 40, "hanzi": "我每天都去健身房锻炼。", "pinyin": "Wǒ měitiān dōu qù jiànshēnfáng duànliàn.", "traducao": "Eu vou à academia todo dia treinar."},
  {"id": 41, "hanzi": "我喜欢健美和力量举。", "pinyin": "Wǒ xǐhuan jiànměi hé lìliàngjǔ.", "traducao": "Eu gosto de fisiculturismo e powerlifting."},
  {"id": 42, "hanzi": "力量举是一项由深蹲、卧推和硬拉组成的运动。", "pinyin": "Lìliàngjǔ shì yì xiàng yóu shēndūn, wòtuī hé yìnglā zǔchéng de yùndòng.", "traducao": "Powerlifting é um esporte composto por Agachamento, Supino e Levantamento terra."},
  {"id": 43, "hanzi": "我在健身房练力量举。", "pinyin": "Wǒ zài jiànshēnfáng liàn lìliàngjǔ.", "traducao": "Eu pratico powerlifting na academia."}
];

// Estado global
let phrasesData = [];
let currentMainTab = 'all'; // 'all', 'today', 'future', 'studied', 'manage'
let filteredPhrases = [];
let currentView = 'cards';
let currentFlashcardIndex = 0;
let currentModalPhrase = null;

// PeerJS P2P
let peer = null;
let peerConn = null;

// DOM
const searchInput = document.getElementById('search-input');
const btnClearSearch = document.getElementById('btn-clear-search');
const sortBySelect = document.getElementById('sort-by');
const mainToolbar = document.getElementById('main-toolbar');

const cardsView = document.getElementById('cards-view');
const tableView = document.getElementById('table-view');
const tableBody = document.getElementById('table-body');
const flashcardsView = document.getElementById('flashcards-view');
const manageTabView = document.getElementById('manage-tab-view');
const noResults = document.getElementById('no-results');

const fileInput = document.getElementById('file-input');
const btnExportJson = document.getElementById('btn-export-json');

const btnToggleTheme = document.getElementById('btn-toggle-theme');
const themeIcon = document.getElementById('theme-icon');

// Modais
const modalDetails = document.getElementById('modal-details');
const modalCloseBtn = document.getElementById('modal-close-btn');

const btnAddPhrase = document.getElementById('btn-add-phrase');
const modalAddPhrase = document.getElementById('modal-add-phrase');
const modalAddCloseBtn = document.getElementById('modal-add-close-btn');
const btnCancelAdd = document.getElementById('btn-cancel-add');
const formAddPhrase = document.getElementById('form-add-phrase');

const btnSyncP2P = document.getElementById('btn-sync-p2p');
const modalP2P = document.getElementById('modal-p2p');
const modalP2PClose = document.getElementById('modal-p2p-close');

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  loadFromLocalStorage();
  setupEventListeners();
  initTheme();
  updateDashboardAndCounts();
  applyFiltersAndRender();
});

function loadFromLocalStorage() {
  const saved = localStorage.getItem('chinese_srs_phrases');
  if (saved) {
    try {
      phrasesData = JSON.parse(saved);
    } catch(e) {
      phrasesData = defaultPhrases;
    }
  } else {
    phrasesData = defaultPhrases;
  }

  phrasesData.forEach(p => {
    if (!p.srs) {
      p.srs = {
        nivel: 0,
        dataEstudo: null,
        proximaRevisao: null,
        totalEstudos: 0
      };
    }
  });
}

function saveToLocalStorage() {
  localStorage.setItem('chinese_srs_phrases', JSON.stringify(phrasesData));
}

function setupEventListeners() {
  btnToggleTheme.addEventListener('click', toggleTheme);

  // Navegação de Abas
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentMainTab = btn.dataset.tab;
      applyFiltersAndRender();
    });
  });

  // Busca e Ordenação
  searchInput.addEventListener('input', (e) => {
    btnClearSearch.style.display = e.target.value ? 'block' : 'none';
    applyFiltersAndRender();
  });

  btnClearSearch.addEventListener('click', () => {
    searchInput.value = '';
    btnClearSearch.style.display = 'none';
    applyFiltersAndRender();
  });

  sortBySelect.addEventListener('change', applyFiltersAndRender);

  // Troca de Visões
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentView = btn.dataset.view;
      renderCurrentView();
    });
  });

  fileInput.addEventListener('change', handleFileUpload);
  btnExportJson.addEventListener('click', exportJSON);

  // Controles do Flashcard
  document.getElementById('flashcard').addEventListener('click', toggleFlashcardFlip);
  document.getElementById('fc-flip').addEventListener('click', (e) => {
    e.stopPropagation();
    toggleFlashcardFlip();
  });
  document.getElementById('fc-prev').addEventListener('click', (e) => {
    e.stopPropagation();
    prevFlashcard();
  });
  document.getElementById('fc-next').addEventListener('click', (e) => {
    e.stopPropagation();
    nextFlashcard();
  });
  document.getElementById('fc-mark-studied').addEventListener('click', (e) => {
    e.stopPropagation();
    if (filteredPhrases[currentFlashcardIndex]) {
      markAsStudied(filteredPhrases[currentFlashcardIndex].id);
    }
  });
  document.getElementById('fc-audio-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    if (filteredPhrases[currentFlashcardIndex]) {
      speakChinese(filteredPhrases[currentFlashcardIndex].hanzi);
    }
  });

  // Modal Detalhes
  modalCloseBtn.addEventListener('click', closeModalDetails);
  modalDetails.addEventListener('click', (e) => {
    if (e.target === modalDetails) closeModalDetails();
  });

  document.getElementById('m-btn-mark').addEventListener('click', () => {
    if (currentModalPhrase) {
      markAsStudied(currentModalPhrase.id);
      openModalDetails(phrasesData.find(p => p.id === currentModalPhrase.id));
    }
  });

  document.getElementById('m-btn-unmark').addEventListener('click', () => {
    if (currentModalPhrase) {
      unmarkStudied(currentModalPhrase.id);
      closeModalDetails();
    }
  });

  document.getElementById('m-btn-edit').addEventListener('click', () => {
    if (currentModalPhrase) {
      const phraseToEdit = { ...currentModalPhrase };
      closeModalDetails();
      openModalEdit(phraseToEdit);
    }
  });

  document.getElementById('m-btn-delete').addEventListener('click', () => {
    if (currentModalPhrase) {
      const idToDelete = currentModalPhrase.id;
      closeModalDetails();
      deletePhrase(idToDelete);
    }
  });

  document.getElementById('m-audio-btn').addEventListener('click', () => {
    if (currentModalPhrase) speakChinese(currentModalPhrase.hanzi);
  });

  // EVENTOS DOS BOTÕES DE OLHINHO E CLIQUE NO BLUR
  setupBlurToggle('toggle-eye-hanzi', 'm-hanzi');
  setupBlurToggle('toggle-eye-pinyin', 'm-pinyin');
  setupBlurToggle('toggle-eye-traducao', 'm-traducao');

  // Modal Adicionar/Editar
  btnAddPhrase.addEventListener('click', openModalAdd);
  modalAddCloseBtn.addEventListener('click', closeModalAdd);
  btnCancelAdd.addEventListener('click', closeModalAdd);
  modalAddPhrase.addEventListener('click', (e) => {
    if (e.target === modalAddPhrase) closeModalAdd();
  });
  formAddPhrase.addEventListener('submit', handleSavePhrase);

  // Modal P2P
  btnSyncP2P.addEventListener('click', openModalP2P);
  modalP2PClose.addEventListener('click', closeModalP2P);
  document.getElementById('btn-copy-id').addEventListener('click', copyPeerId);
  document.getElementById('btn-connect-peer').addEventListener('click', connectToRemotePeer);
}

// Configura o alternador de visibilidade (Olhinho / Clique no Texto)
function setupBlurToggle(eyeBtnId, textElemId) {
  const eyeBtn = document.getElementById(eyeBtnId);
  const textElem = document.getElementById(textElemId);

  if (eyeBtn && textElem) {
    const toggle = (e) => {
      e.stopPropagation();
      textElem.classList.toggle('revealed');
    };

    eyeBtn.addEventListener('click', toggle);
    textElem.addEventListener('click', toggle);
  }
}

// Alternar blur em elementos gerados dinamicamente nos cards
function toggleElementBlur(elemId) {
  const elem = document.getElementById(elemId);
  if (elem) elem.classList.toggle('revealed');
}

// Algoritmo SRS
function markAsStudied(phraseId) {
  const item = phrasesData.find(p => p.id === phraseId);
  if (!item) return;

  const todayStr = new Date().toISOString().split('T')[0];

  let newLevel = (item.srs.nivel || 0) + 1;
  if (newLevel > MAX_SRS_LEVEL) newLevel = MAX_SRS_LEVEL;

  const daysToAdd = SRS_INTERVALS[newLevel] || 1;

  const nextRevDate = new Date();
  nextRevDate.setDate(nextRevDate.getDate() + daysToAdd);
  const nextRevStr = nextRevDate.toISOString().split('T')[0];

  item.srs = {
    nivel: newLevel,
    dataEstudo: todayStr,
    proximaRevisao: nextRevStr,
    totalEstudos: (item.srs.totalEstudos || 0) + 1
  };

  saveToLocalStorage();
  updateDashboardAndCounts();
  applyFiltersAndRender();

  if (peerConn && peerConn.open) {
    peerConn.send({ type: 'SYNC_DATA', data: phrasesData });
  }
}

// Desfazer Estudo
function unmarkStudied(phraseId) {
  const item = phrasesData.find(p => p.id === phraseId);
  if (!item) return;

  item.srs = {
    nivel: 0,
    dataEstudo: null,
    proximaRevisao: null,
    totalEstudos: 0
  };

  saveToLocalStorage();
  updateDashboardAndCounts();
  applyFiltersAndRender();

  if (peerConn && peerConn.open) {
    peerConn.send({ type: 'SYNC_DATA', data: phrasesData });
  }
}

// Excluir Frase
function deletePhrase(phraseId) {
  if (confirm(`Tem certeza que deseja excluir permanentemente a frase #${phraseId}?`)) {
    phrasesData = phrasesData.filter(p => p.id !== phraseId);
    saveToLocalStorage();
    updateDashboardAndCounts();
    applyFiltersAndRender();

    if (peerConn && peerConn.open) {
      peerConn.send({ type: 'SYNC_DATA', data: phrasesData });
    }
  }
}

function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeIcon.className = 'fa-solid fa-sun';
  } else {
    themeIcon.className = 'fa-solid fa-moon';
  }
}

function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  themeIcon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Contadores e Resumos
function updateDashboardAndCounts() {
  const todayStr = new Date().toISOString().split('T')[0];

  const total = phrasesData.length;

  const newPhrases = phrasesData.filter(p => !p.srs.dataEstudo);
  const todayList = phrasesData.filter(p => p.srs.dataEstudo !== null && p.srs.proximaRevisao <= todayStr);
  const futureList = phrasesData.filter(p => p.srs.dataEstudo !== null && p.srs.proximaRevisao > todayStr);
  const studiedList = phrasesData.filter(p => p.srs.dataEstudo !== null);

  document.getElementById('count-all').textContent = newPhrases.length;
  document.getElementById('count-today').textContent = todayList.length;
  document.getElementById('count-future').textContent = futureList.length;
  document.getElementById('count-studied').textContent = studiedList.length;

  document.getElementById('m-stat-total').textContent = total;
  document.getElementById('m-stat-new').textContent = newPhrases.length;
  document.getElementById('m-stat-due').textContent = todayList.length;
  document.getElementById('m-stat-future').textContent = futureList.length;
  document.getElementById('m-stat-studied').textContent = studiedList.length;
}

// Filtros e Renderização por Aba
function applyFiltersAndRender() {
  const query = searchInput.value.toLowerCase().trim();
  const sortVal = sortBySelect.value;
  const todayStr = new Date().toISOString().split('T')[0];

  if (currentMainTab === 'manage') {
    mainToolbar.classList.add('hidden');
    cardsView.classList.add('hidden');
    tableView.classList.add('hidden');
    flashcardsView.classList.add('hidden');
    noResults.classList.add('hidden');
    manageTabView.classList.remove('hidden');
    return;
  }

  manageTabView.classList.add('hidden');
  mainToolbar.classList.remove('hidden');

  let tabPhrases = [];
  if (currentMainTab === 'all') {
    tabPhrases = phrasesData.filter(p => !p.srs.dataEstudo);
  } else if (currentMainTab === 'today') {
    tabPhrases = phrasesData.filter(p => p.srs.dataEstudo !== null && p.srs.proximaRevisao <= todayStr);
  } else if (currentMainTab === 'future') {
    tabPhrases = phrasesData.filter(p => p.srs.dataEstudo !== null && p.srs.proximaRevisao > todayStr);
  } else if (currentMainTab === 'studied') {
    tabPhrases = phrasesData.filter(p => p.srs.dataEstudo !== null);
  }

  filteredPhrases = tabPhrases.filter(item => {
    return (
      item.id.toString().includes(query) ||
      item.hanzi.toLowerCase().includes(query) ||
      item.pinyin.toLowerCase().includes(query) ||
      item.traducao.toLowerCase().includes(query)
    );
  });

  filteredPhrases.sort((a, b) => {
    switch (sortVal) {
      case 'id-asc': return a.id - b.id;
      case 'id-desc': return b.id - a.id;
      case 'level-desc': return (b.srs?.nivel || 0) - (a.srs?.nivel || 0);
      case 'next-rev-asc': return (a.srs?.proximaRevisao || '9999').localeCompare(b.srs?.proximaRevisao || '9999');
      default: return a.id - b.id;
    }
  });

  currentFlashcardIndex = 0;
  renderCurrentView();
}

function renderCurrentView() {
  cardsView.classList.add('hidden');
  tableView.classList.add('hidden');
  flashcardsView.classList.add('hidden');
  noResults.classList.add('hidden');

  if (filteredPhrases.length === 0) {
    noResults.classList.remove('hidden');
    return;
  }

  if (currentView === 'cards') {
    renderCardsView();
    cardsView.classList.remove('hidden');
  } else if (currentView === 'table') {
    renderTableView();
    tableView.classList.remove('hidden');
  } else if (currentView === 'flashcards') {
    renderFlashcard();
    flashcardsView.classList.remove('hidden');
  }
}

// View: Cards Grid (com Blur por Padrão)
function renderCardsView() {
  cardsView.innerHTML = '';
  filteredPhrases.forEach(item => {
    const card = document.createElement('div');
    card.className = 'phrase-card';
    card.onclick = () => openModalDetails(item);

    const isStudied = item.srs.dataEstudo !== null;
    const isStudiedToday = item.srs.dataEstudo === new Date().toISOString().split('T')[0];

    card.innerHTML = `
      <div class="card-header">
        <span class="card-id">#${item.id}</span>
        <div>
          <button class="btn-icon" title="Ouvir" onclick="event.stopPropagation(); speakChinese('${escapeQuotes(item.hanzi)}')">
            <i class="fa-solid fa-volume-high"></i>
          </button>
          <button class="btn-icon" title="Editar Frase" onclick="event.stopPropagation(); openModalEditById(${item.id})">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="btn-icon danger" title="Excluir Frase" onclick="event.stopPropagation(); deletePhrase(${item.id})">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>

      <div class="card-blur-row">
        <div class="card-hanzi blur-text" id="card-hz-${item.id}" onclick="event.stopPropagation(); toggleElementBlur('card-hz-${item.id}')">${item.hanzi}</div>
        <button class="btn-eye" onclick="event.stopPropagation(); toggleElementBlur('card-hz-${item.id}')" title="Mostrar/Ocultar Hanzi">👁️</button>
      </div>

      <div class="card-blur-row">
        <div class="card-pinyin blur-text" id="card-py-${item.id}" onclick="event.stopPropagation(); toggleElementBlur('card-py-${item.id}')">${item.pinyin}</div>
        <button class="btn-eye" onclick="event.stopPropagation(); toggleElementBlur('card-py-${item.id}')" title="Mostrar/Ocultar Pinyin">👁️</button>
      </div>

      <div class="card-blur-row">
        <div class="card-traducao blur-text" id="card-tr-${item.id}" onclick="event.stopPropagation(); toggleElementBlur('card-tr-${item.id}')">${item.traducao}</div>
        <button class="btn-eye" onclick="event.stopPropagation(); toggleElementBlur('card-tr-${item.id}')" title="Mostrar/Ocultar Tradução">👁️</button>
      </div>

      <div class="card-footer">
        <span class="tag-lvl ${item.srs.nivel > 0 ? 'active' : ''}">Nível: ${item.srs.nivel}/17</span>
        <div class="card-actions-row">
          ${isStudied ? `
            <button class="btn btn-secondary" style="padding: 0.2rem 0.4rem; font-size:0.75rem;" title="Remover de estudadas / Desfazer" onclick="event.stopPropagation(); unmarkStudied(${item.id})">
              <i class="fa-solid fa-rotate-left"></i>
            </button>
          ` : ''}
          <button class="btn ${isStudiedToday ? 'btn-secondary' : 'btn-success'}" style="padding: 0.2rem 0.5rem; font-size:0.75rem;" onclick="event.stopPropagation(); markAsStudied(${item.id})">
            <i class="fa-solid fa-check"></i> ${isStudiedToday ? 'Estudado Hoje' : 'Marcar Estudado'}
          </button>
        </div>
      </div>
    `;
    cardsView.appendChild(card);
  });
}

// View: Tabela
function renderTableView() {
  tableBody.innerHTML = '';
  filteredPhrases.forEach(item => {
    const tr = document.createElement('tr');
    tr.onclick = () => openModalDetails(item);

    const isStudied = item.srs.dataEstudo !== null;

    tr.innerHTML = `
      <td><b>#${item.id}</b></td>
      <td class="td-hanzi blur-text" id="tbl-hz-${item.id}" onclick="event.stopPropagation(); toggleElementBlur('tbl-hz-${item.id}')">${item.hanzi}</td>
      <td class="td-pinyin blur-text" id="tbl-py-${item.id}" onclick="event.stopPropagation(); toggleElementBlur('tbl-py-${item.id}')">${item.pinyin}</td>
      <td class="blur-text" id="tbl-tr-${item.id}" onclick="event.stopPropagation(); toggleElementBlur('tbl-tr-${item.id}')">${item.traducao}</td>
      <td><span class="tag-lvl ${item.srs.nivel > 0 ? 'active' : ''}">${item.srs.nivel} / 17</span></td>
      <td>${item.srs.proximaRevisao || 'Pendente'}</td>
      <td>
        <button class="btn-icon" title="Ouvir" onclick="event.stopPropagation(); speakChinese('${escapeQuotes(item.hanzi)}')">
          <i class="fa-solid fa-volume-high"></i>
        </button>
        <button class="btn-icon" title="Marcar Estudado" onclick="event.stopPropagation(); markAsStudied(${item.id})">
          <i class="fa-solid fa-check" style="color: var(--success-color);"></i>
        </button>
        <button class="btn-icon" title="Editar" onclick="event.stopPropagation(); openModalEditById(${item.id})">
          <i class="fa-solid fa-pen"></i>
        </button>
        <button class="btn-icon danger" title="Excluir" onclick="event.stopPropagation(); deletePhrase(${item.id})">
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
    `;
    tableBody.appendChild(tr);
  });
}

// View: Flashcards
function renderFlashcard() {
  const cardElem = document.getElementById('flashcard');
  cardElem.classList.remove('flipped');

  if (filteredPhrases.length === 0) return;

  const item = filteredPhrases[currentFlashcardIndex];
  document.getElementById('fc-counter').textContent = `${currentFlashcardIndex + 1} / ${filteredPhrases.length}`;
  document.getElementById('fc-hanzi').textContent = item.hanzi;
  document.getElementById('fc-pinyin').textContent = item.pinyin;
  document.getElementById('fc-traducao').textContent = item.traducao;

  document.getElementById('fc-srs-lvl').textContent = `${item.srs.nivel} / 17`;
  document.getElementById('fc-srs-next').textContent = item.srs.proximaRevisao || 'Pendente';
}

function toggleFlashcardFlip() {
  document.getElementById('flashcard').classList.toggle('flipped');
}

function prevFlashcard() {
  if (currentFlashcardIndex > 0) {
    currentFlashcardIndex--;
    renderFlashcard();
  }
}

function nextFlashcard() {
  if (currentFlashcardIndex < filteredPhrases.length - 1) {
    currentFlashcardIndex++;
    renderFlashcard();
  }
}

// Modal Detalhes
function openModalDetails(item) {
  currentModalPhrase = item;
  document.getElementById('m-id').textContent = `#${item.id}`;
  
  const hanziElem = document.getElementById('m-hanzi');
  const pinyinElem = document.getElementById('m-pinyin');
  const traducaoElem = document.getElementById('m-traducao');

  hanziElem.textContent = item.hanzi;
  pinyinElem.textContent = item.pinyin;
  traducaoElem.textContent = item.traducao;

  hanziElem.classList.remove('revealed');
  pinyinElem.classList.remove('revealed');
  traducaoElem.classList.remove('revealed');

  document.getElementById('m-srs-lvl').textContent = `${item.srs.nivel} / 17`;
  document.getElementById('m-srs-last').textContent = item.srs.dataEstudo || 'Nunca estudado';
  document.getElementById('m-srs-next').textContent = item.srs.proximaRevisao || 'Pendente';
  document.getElementById('m-srs-count').textContent = item.srs.totalEstudos || 0;

  const btnUnmark = document.getElementById('m-btn-unmark');
  if (item.srs.dataEstudo !== null) {
    btnUnmark.classList.remove('hidden');
  } else {
    btnUnmark.classList.add('hidden');
  }

  modalDetails.classList.add('active');
}

function closeModalDetails() {
  modalDetails.classList.remove('active');
  currentModalPhrase = null;
}

// Modal Adicionar / Editar
function openModalAdd() {
  formAddPhrase.reset();
  document.getElementById('edit-phrase-id').value = '';
  document.getElementById('modal-add-title').innerHTML = '<i class="fa-solid fa-plus-circle"></i> Nova Frase';
  modalAddPhrase.classList.add('active');
}

function openModalEditById(id) {
  const item = phrasesData.find(p => p.id === id);
  if (item) openModalEdit(item);
}

function openModalEdit(item) {
  document.getElementById('edit-phrase-id').value = item.id;
  document.getElementById('add-hanzi').value = item.hanzi;
  document.getElementById('add-pinyin').value = item.pinyin;
  document.getElementById('add-traducao').value = item.traducao;

  document.getElementById('modal-add-title').innerHTML = `<i class="fa-solid fa-pen"></i> Editar Frase #${item.id}`;
  modalAddPhrase.classList.add('active');
}

function closeModalAdd() {
  modalAddPhrase.classList.remove('active');
}

function handleSavePhrase(event) {
  event.preventDefault();

  const editId = document.getElementById('edit-phrase-id').value;
  const hanzi = document.getElementById('add-hanzi').value.trim();
  const pinyin = document.getElementById('add-pinyin').value.trim();
  const traducao = document.getElementById('add-traducao').value.trim();

  if (!hanzi || !pinyin || !traducao) return;

  if (editId) {
    const item = phrasesData.find(p => p.id === parseInt(editId));
    if (item) {
      item.hanzi = hanzi;
      item.pinyin = pinyin;
      item.traducao = traducao;
    }
  } else {
    const newId = phrasesData.length > 0 ? Math.max(...phrasesData.map(p => p.id)) + 1 : 1;
    const newPhrase = {
      id: newId,
      hanzi: hanzi,
      pinyin: pinyin,
      traducao: traducao,
      srs: {
        nivel: 0,
        dataEstudo: null,
        proximaRevisao: null,
        totalEstudos: 0
      }
    };
    phrasesData.push(newPhrase);
  }

  saveToLocalStorage();
  closeModalAdd();
  updateDashboardAndCounts();
  applyFiltersAndRender();

  if (peerConn && peerConn.open) {
    peerConn.send({ type: 'SYNC_DATA', data: phrasesData });
  }
}

// Voz Mandarim
function speakChinese(text) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'zh-CN';
  utterance.rate = 0.85;
  window.speechSynthesis.speak(utterance);
}

// JSON Import / Export
function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      if (Array.isArray(data)) {
        phrasesData = data;
        saveToLocalStorage();
        updateDashboardAndCounts();
        applyFiltersAndRender();
        alert(`Sucesso! ${data.length} frases recarregadas.`);
      }
    } catch (err) {
      alert('Arquivo JSON inválido.');
    }
  };
  reader.readAsText(file);
}

function exportJSON() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(phrasesData, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", "Frases_Chinês_SRS.json");
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

// Gerador Código Curto P2P
function generateShortCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// P2P Sync
function openModalP2P() {
  modalP2P.classList.add('active');

  if (!peer) {
    document.getElementById('my-peer-id').textContent = 'Gerando código...';
    
    const shortId = 'CHIN-' + generateShortCode();
    peer = new Peer(shortId);

    peer.on('open', (id) => {
      document.getElementById('my-peer-id').textContent = id;
      
      const qrElem = document.getElementById('qrcode-container');
      qrElem.innerHTML = '';
      new QRCode(qrElem, { text: id, width: 128, height: 128 });
    });

    peer.on('error', (err) => {
      if (err.type === 'unavailable-id') {
        peer.destroy();
        peer = null;
        openModalP2P();
      }
    });

    peer.on('connection', (conn) => {
      peerConn = conn;
      setupPeerConnectionListeners();
    });
  }
}

function closeModalP2P() {
  modalP2P.classList.remove('active');
}

function copyPeerId() {
  const idText = document.getElementById('my-peer-id').textContent;
  if (idText && !idText.includes('Gerando')) {
    navigator.clipboard.writeText(idText);
    alert('Código copiado!');
  }
}

function connectToRemotePeer() {
  const remoteId = document.getElementById('remote-peer-id').value.trim();
  if (!remoteId || !peer) return;

  document.getElementById('p2p-status').textContent = 'Conectando...';
  peerConn = peer.connect(remoteId);
  setupPeerConnectionListeners();
}

function setupPeerConnectionListeners() {
  peerConn.on('open', () => {
    document.getElementById('p2p-status').textContent = 'Conectado! Sincronizando...';
    peerConn.send({ type: 'SYNC_DATA', data: phrasesData });
  });

  peerConn.on('data', (payload) => {
    if (payload.type === 'SYNC_DATA' && Array.isArray(payload.data)) {
      phrasesData = payload.data;
      saveToLocalStorage();
      updateDashboardAndCounts();
      applyFiltersAndRender();
      document.getElementById('p2p-status').textContent = 'Sincronizado com sucesso!';
    }
  });

  peerConn.on('close', () => {
    document.getElementById('p2p-status').textContent = 'Conexão encerrada.';
  });
}

function escapeQuotes(str) {
  return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}