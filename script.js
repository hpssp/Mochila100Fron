/* script.js - lógica do site e quiz de viagens */
const quizData = [
  {
    id: 1,
    q: "Você está planejando uma viagem internacional e recebe um e-mail com uma oferta de passagem aérea muito barata. O remetente parece legítimo, mas o link redireciona para um site desconhecido. O que fazer?",
    options: [
      {id: 'a', text: "Clicar no link e comprar a passagem rapidamente."},
      {id: 'b', text: "Verificar a oferta diretamente no site oficial da companhia aérea."},
      {id: 'c', text: "Responder o e-mail pedindo mais detalhes."},
      {id: 'd', text: "Ignorar, pois deve ser uma promoção automática."}
    ],
    correct: 'b',
    explain: "Ofertas por e-mail com links suspeitos podem ser golpes. Sempre confirme promoções no site oficial da companhia aérea ou em canais confiáveis."
  },
  {
    id: 2,
    q: "Ao reservar um hotel, você encontra um site com preço bem abaixo do mercado, mas ele exige pagamento antecipado por transferência bancária. Qual é a melhor atitude?",
    options: [
      {id: 'a', text: "Pagar imediatamente para garantir o preço."},
      {id: 'b', text: "Pesquisar a reputação do site e preferir plataformas conhecidas com proteção ao consumidor."},
      {id: 'c', text: "Negociar o preço diretamente com o site."},
      {id: 'd', text: "Usar PIX para agilizar o pagamento."}
    ],
    correct: 'b',
    explain: "Sites desconhecidos que exigem transferência direta podem ser fraudulentos. Use plataformas confiáveis como Booking ou Expedia, que oferecem proteção ao consumidor."
  },
  {
    id: 3,
    q: "Você precisa de um visto para seu destino. Um site promete agilizar o processo por uma taxa extra. Como proceder?",
    options: [
      {id: 'a', text: "Pagar a taxa para garantir o visto rapidamente."},
      {id: 'b', text: "Consultar o site oficial da embaixada ou consulado do país."},
      {id: 'c', text: "Enviar seus documentos por e-mail ao site."},
      {id: 'd', text: "Ignorar, pois vistos são automáticos."}
    ],
    correct: 'b',
    explain: "Informações sobre vistos devem ser obtidas em fontes oficiais, como embaixadas ou consulados, para evitar fraudes e taxas desnecessárias."
  },
  {
    id: 4,
    q: "Qual documento é essencial verificar antes de uma viagem internacional?",
    options: [
      {id: 'a', text: "Carteira de motorista."},
      {id: 'b', text: "Passaporte com validade mínima de 6 meses."},
      {id: 'c', text: "Comprovante de residência."},
      {id: 'd', text: "Carteira de identidade local."}
    ],
    correct: 'b',
    explain: "Muitos países exigem que o passaporte tenha validade mínima de 6 meses a partir da data de entrada. Sempre verifique antes de viajar."
  },
  {
    id: 5,
    q: "Você encontra um pacote de viagem com tudo incluso a um preço incrível, mas as avaliações do vendedor são poucas e genéricas. O que fazer?",
    options: [
      {id: 'a', text: "Comprar o pacote para aproveitar o preço."},
      {id: 'b', text: "Verificar a reputação do vendedor em outras plataformas e buscar avaliações detalhadas."},
      {id: 'c', text: "Pedir um desconto maior para confirmar a compra."},
      {id: 'd', text: "Compartilhar a oferta com amigos para validar."}
    ],
    correct: 'b',
    explain: "Avaliações genéricas ou escassas podem indicar um golpe. Pesquise o vendedor em plataformas confiáveis e leia avaliações detalhadas antes de comprar."
  },
  {
    id: 6,
    q: "Qual é a melhor prática para proteger seus pertences durante uma viagem?",
    options: [
      {id: 'a', text: "Deixar objetos de valor no quarto do hotel."},
      {id: 'b', text: "Usar um cofre no hotel e carregar apenas o essencial."},
      {id: 'c', text: "Levar todos os pertences em uma mochila grande."},
      {id: 'd', text: "Confiar em guias locais para guardar seus itens."}
    ],
    correct: 'b',
    explain: "Usar o cofre do hotel para objetos de valor e carregar apenas o necessário reduz o risco de furtos ou perdas durante a viagem."
  },
  {
    id: 7,
    q: "Qual é a melhor forma de organizar seu orçamento de viagem?",
    options: [
      {id: 'a', text: "Gastar tudo em passagens e improvisar no destino."},
      {id: 'b', text: "Planejar gastos com antecedência, incluindo emergência."},
      {id: 'c', text: "Usar apenas dinheiro em espécie para controle."},
      {id: 'd', text: "Contar com cartões de crédito ilimitados."}
    ],
    correct: 'b',
    explain: "Planejar o orçamento com antecedência, incluindo uma reserva para emergências, ajuda a evitar imprevistos financeiros durante a viagem."
  },
  {
    id: 8,
    q: "Você enfrenta um imprevisto no destino, como um voo cancelado. Qual é a melhor ação?",
    options: [
      {id: 'a', text: "Aceitar qualquer alternativa oferecida no balcão."},
      {id: 'b', text: "Contactar a companhia aérea e seu seguro viagem para soluções."},
      {id: 'c', text: "Pagar por uma nova passagem imediatamente."},
      {id: 'd', text: "Esperar no aeroporto até a situação se resolver."}
    ],
    correct: 'b',
    explain: "Contactar a companhia aérea e o seguro viagem garante que você receba suporte adequado e conheça seus direitos em caso de imprevistos."
  }
];

function $(sel) { return document.querySelector(sel); }

function createQuiz() {
  const container = $('#quiz-container');
  container.innerHTML = '';
  const state = JSON.parse(localStorage.getItem('travel-quiz') || '{"current":0,"answers":{}}');
  const current = state.current || 0;

  function renderQuestion(i) {
    const q = quizData[i];
    const card = document.createElement('div');
    card.className = 'quiz-card-inner';
    const title = document.createElement('h3');
    title.textContent = `Questão ${i+1} de ${quizData.length}`;
    const question = document.createElement('p');
    question.className = 'question';
    question.textContent = q.q;
    card.appendChild(title); card.appendChild(question);

    const opts = document.createElement('div');
    opts.className = 'options';
    q.options.forEach(opt => {
      const label = document.createElement('label');
      label.className = 'option';
      label.tabIndex = 0;
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'q' + q.id;
      input.value = opt.id;
      input.checked = (state.answers[q.id] === opt.id);
      const span = document.createElement('span');
      span.textContent = opt.text;
      label.appendChild(input); label.appendChild(span);
      label.addEventListener('click', () => {
        state.answers[q.id] = opt.id;
        localStorage.setItem('travel-quiz', JSON.stringify(state));
      });
      opts.appendChild(label);
    });
    card.appendChild(opts);

    const actions = document.createElement('div');
    actions.style.marginTop = '1rem';
    const prev = document.createElement('button'); prev.textContent = 'Anterior'; prev.className = 'btn ghost';
    const next = document.createElement('button'); next.textContent = (i === quizData.length - 1) ? 'Finalizar' : 'Próxima'; next.className = 'btn';
    prev.addEventListener('click', () => { state.current = Math.max(0, i - 1); localStorage.setItem('travel-quiz', JSON.stringify(state)); render(); });
    next.addEventListener('click', () => {
      if (i === quizData.length - 1) { showResults(); return; }
      state.current = Math.min(quizData.length - 1, i + 1);
      localStorage.setItem('travel-quiz', JSON.stringify(state));
      render();
    });
    actions.appendChild(prev); actions.appendChild(next);
    card.appendChild(actions);

    container.appendChild(card);
  }

  function render() {
    container.innerHTML = '';
    const st = JSON.parse(localStorage.getItem('travel-quiz') || '{"current":0,"answers":{}}');
    renderQuestion(st.current || 0);
  }

  function showResults() {
    const st = JSON.parse(localStorage.getItem('travel-quiz') || '{"current":0,"answers":{}}');
    const answers = st.answers || {};
    let score = 0;
    const resultsCard = document.createElement('div');
    resultsCard.className = 'quiz-results';
    const h = document.createElement('h3'); h.textContent = 'Resultados';
    resultsCard.appendChild(h);

    const list = document.createElement('ol');
    quizData.forEach(q => {
      const li = document.createElement('li');
      const your = answers[q.id];
      const ok = your === q.correct;
      if (ok) score++;
      const title = document.createElement('strong');
      title.textContent = q.q;
      li.appendChild(title);
      const p = document.createElement('p');
      p.innerHTML = `<em>Sua resposta:</em> ${your || '<span style="opacity:.6">Não respondida</span>'} — ${ok ? '<span style="color:var(--accent-green)">Correta</span>' : '<span style="color:#ff7b7b">Errada</span>'}`;
      const exp = document.createElement('p');
      exp.innerHTML = `<em>Explicação:</em> ${q.explain}`;
      li.appendChild(p); li.appendChild(exp);
      list.appendChild(li);
    });
    resultsCard.appendChild(list);

    const summary = document.createElement('p');
    summary.innerHTML = `<strong>Você acertou ${score} de ${quizData.length} (${Math.round((score / quizData.length) * 100)}%)</strong>`;
    resultsCard.insertBefore(summary, list);

    const tips = document.createElement('div');
    tips.innerHTML = '<p>Recomendação: reveja as explicações e use as dicas para planejar sua próxima viagem. Salve seu progresso no navegador para continuar depois.</p>';
    resultsCard.appendChild(tips);

    const actions = document.createElement('div');
    actions.style.marginTop = '1rem';
    const retry = document.createElement('button'); retry.textContent = 'Refazer quiz'; retry.className = 'btn ghost';
    retry.addEventListener('click', () => { localStorage.removeItem('travel-quiz'); createQuiz(); });
    const save = document.createElement('button'); save.textContent = 'Salvar resultado (local)'; save.className = 'btn';
    save.addEventListener('click', () => {
      const saved = JSON.parse(localStorage.getItem('travel-quiz-saved') || '[]');
      saved.push({ when: new Date().toISOString(), score, answers: answers });
      localStorage.setItem('travel-quiz-saved', JSON.stringify(saved));
      alert('Resultado salvo localmente no navegador.');
    });
    actions.appendChild(retry); actions.appendChild(save);
    resultsCard.appendChild(actions);

    const container = $('#quiz-container');
    container.innerHTML = '';
    container.appendChild(resultsCard);
  }

  render();
}

document.addEventListener('DOMContentLoaded', () => {
  // menu toggle
  const menuBtn = document.querySelector('.menu-toggle');
  const navList = document.querySelector('.nav-list');
  menuBtn.addEventListener('click', () => {
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!expanded));
    navList.classList.toggle('show');
  });

  // init quiz
  createQuiz();

  // contact form
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const subs = JSON.parse(localStorage.getItem('travel-contacts') || '[]');
    subs.push({ name: data.get('name'), email: data.get('email'), message: data.get('message'), when: new Date().toISOString() });
    localStorage.setItem('travel-contacts', JSON.stringify(subs));
    alert('✅ Mensagem registrada localmente. Em ambiente real, aqui enviaríamos para o servidor.');
    form.reset();
  });

  // clear storage button
  $('#clearStorage').addEventListener('click', () => {
    if (confirm('Limpar progresso e dados salvos no navegador?')) {
      localStorage.removeItem('travel-quiz');
      localStorage.removeItem('travel-quiz-saved');
      localStorage.removeItem('travel-contacts');
      alert('Dados removidos.');
      createQuiz();
    }
  });
});