# CHP — Front-End Design (Vibecoding)

## 1. Proposta da atividade

A atividade consiste no desenvolvimento de uma **landing page de tema livre utilizando Vibecoding**, com apoio de ferramentas de inteligência artificial para planejar, construir e refinar a interface.

O objetivo não se limita ao resultado visual ou funcional da página. O processo de desenvolvimento também será avaliado: é importante demonstrar como as decisões foram tomadas, como os prompts foram elaborados, como a comunicação com a IA evoluiu e quais ajustes foram realizados quando o resultado inicial não atendeu às expectativas.

Para documentar o processo, a pasta do projeto deve reunir, além dos arquivos da página, os registros que contribuíram para a solução final, incluindo:

- Prompts utilizados e respectivas versões;
- Pesquisas realizadas e fontes consultadas;
- Decisões de design e justificativas;
- Referências visuais e exemplos de interfaces;
- Paleta de cores, tipografia e demais elementos da identidade visual;
- Problemas encontrados, correções solicitadas e resultados obtidos.

### Objetivos de aprendizagem

- Desenvolver repertório visual e senso crítico na avaliação de interfaces;
- Exercitar a tomada de decisão relacionada à identidade visual (IDV);
- Aprimorar a comunicação com ferramentas de IA;
- Elaborar prompts claros, específicos e contextualizados;
- Avaliar criticamente as respostas geradas pela IA;
- Registrar a evolução do projeto, das primeiras instruções à versão final.

---

## 2. Processo de desenvolvimento

### 2.1. Primeiro prompt — ChatGPT Free

**Objetivo:** obter uma lista inicial de produtos para servir como base de conteúdo da landing page.

**Prompt utilizado:**

> Liste 50 vinhos com estimativas de preços reais e suas respectivas safras.

A resposta apresentou 50 rótulos, com safras e preços de referência, distribuídos em diferentes faixas de preço. A lista foi utilizada como conteúdo inicial para a página de vendas.

> **Observação sobre os dados:** os preços são referências coletadas em respostas e catálogos consultados durante a atividade. Podem variar conforme a loja, a disponibilidade e a safra. As informações devem ser verificadas antes de serem apresentadas como ofertas vigentes. As notas de avaliação também precisam ser vinculadas a fontes e safras específicas; não devem ser inventadas nem confundidas com avaliações de consumidores.

### 2.2. Segundo prompt — Gemini Pro

**Objetivo:** refinar a solicitação e adaptá-la ao modelo responsável pela implementação, considerando o contexto do projeto e a interpretação mais adequada das instruções.

A ferramenta utilizada para essa etapa foi o Gemini Pro, com a finalidade de preparar um prompt mais completo para o **Claude Opus 5.5**, configurado com esforço médio.

**Prompt refinado para o Claude Opus 5.5:**

```text
Crie uma landing page de vendas de vinhos utilizando a lista de produtos
apresentada neste documento.

Utilize imagens reais dos produtos, mantendo consistência visual entre
as imagens das garrafas, os tamanhos e a apresentação dos cards.

A página deve apresentar os produtos com nome, safra, preço e, quando
houver fonte confiável, nota de avaliação. Não invente avaliações,
preços atuais ou informações sobre os rótulos.

Implemente a experiência de compra com operações de adicionar e remover
produtos do carrinho, alterar quantidades, atualizar os subtotais e o
valor total, além de uma página de conclusão da compra com resumo do
pedido gerado.

Mantenha HTML e CSS em arquivos separados. Organize o código de forma
clara, consistente e fácil de manter. A interface deve ter identidade
visual própria, boa hierarquia tipográfica, navegação intuitiva e
layout responsivo.

Use a lista de produtos a seguir como catálogo inicial.
```

#### Catálogo de produtos

Os valores abaixo reproduzem os preços de referência registrados durante a pesquisa inicial. Eles não representam, necessariamente, preços vigentes no momento da execução do projeto.

##### Grupo A — Vinhos com preços de referência de avaliações especializadas

| Nº | Vinho | Safra | Preço de referência |
|---:|---|:---:|---:|
| 1 | Miolo Reserva Malbec | 2022 | R$ 67,00 |
| 2 | Casa Valduga Terroir Cabernet Sauvignon | 2022 | R$ 99,00 |
| 3 | Casa Valduga Terroir Exclusivo Tannat | 2020 | R$ 149,00 |
| 4 | Salton Talento Corte Único | 2020 | R$ 125,00 |
| 5 | Segredos da Adega Gran Reserva Cabernet Sauvignon | 2017 | R$ 189,00 |
| 6 | Segredos da Adega Corte Gran Reserva Tinto | 2017 | R$ 210,00 |
| 7 | Casa Marques Pereira Reserva Malbec | 2022 | R$ 110,00 |
| 8 | Casa Marques Pereira Reserva Tannat | 2022 | R$ 115,00 |
| 9 | Guaspari Vista da Serra Syrah | 2021 | R$ 298,00 |
| 10 | Guaspari Vista da Mata Cabernet Franc/Cabernet Sauvignon | 2021 | R$ 268,00 |
| 11 | Vale da Pedra Tinto | 2021 | R$ 178,00 |
| 12 | Cerro de Pedra Gran Reserva Merlot | 2022 | R$ 230,00 |
| 13 | Cultura Tannat | 2022 | R$ 165,00 |
| 14 | Seu Claudino Syrah | 2021 | R$ 228,00 |
| 15 | Seu Claudino Superiore Syrah | 2021 | R$ 345,00 |
| 16 | Davo Gran Reserva Syrah | 2021 | R$ 380,00 |
| 17 | Maximo Boschi Biografia Merlot | 2015 | R$ 395,00 |
| 18 | Maximo Boschi Biografia Cabernet Sauvignon | 2015 | R$ 431,00 |
| 19 | Viapiana VIA1986 Blend | 2019 | R$ 385,00 |
| 20 | Salton Vinhedo da Lebre Cabernet Sauvignon | 2022 | R$ 299,00 |

##### Grupo B — Vinhos com preços publicados em catálogo de varejo

| Nº | Vinho | Safra | Preço de referência |
|---:|---|:---:|---:|
| 21 | Miolo Seleção Cabernet Sauvignon & Merlot | 2025 | R$ 39,90 |
| 22 | Miolo Seleção Chardonnay & Viognier | 2026 | R$ 39,90 |
| 23 | Miolo Reserva Sauvignon Blanc | 2026 | R$ 59,90 |
| 24 | Miolo Reserva Malbec | 2025 | R$ 59,90 |
| 25 | Miolo Single Vineyard Pinot Noir | 2025 | R$ 69,90 |
| 26 | Miolo Reserva Merlot | 2024 | R$ 59,90 |
| 27 | Aurora Reserva Cabernet Sauvignon | 2024 | R$ 49,90 |
| 28 | Aurora Varietal Rebo | 2025 | R$ 33,90 |
| 29 | Aurora Varietal Malvasia Aromática | 2026 | R$ 33,90 |
| 30 | Salton Intenso Malbec | 2025 | R$ 32,90 |
| 31 | Salton Paradoxo Corte Vermelho | 2023 | R$ 59,90 |
| 32 | Salton Paradoxo Corte Azul | 2022 | R$ 59,90 |
| 33 | Casa Perini Solidário Branco | 2025 | R$ 48,90 |
| 34 | Casa Valduga Arte Tinto Fruité Blend | 2025 | R$ 49,90 |
| 35 | Casa Valduga Arte Branco Blend 3 | 2026 | R$ 49,90 |
| 36 | Casa Valduga Origem Rosé | 2023 | R$ 52,90 |
| 37 | Casa Perini Vintage Espumante Nature | 2023 | R$ 79,90 |
| 38 | Casa Perini Vintage Espumante Brut Barricado | 2023 | R$ 79,90 |
| 39 | Casa Perini Fração Única Pinot Noir | 2023 | R$ 76,90 |
| 40 | Amitié Pinot Noir | 2026 | R$ 87,99 |
| 41 | Boscato Cave Pinot Noir | 2025 | R$ 79,90 |
| 42 | Miolo Wild Trebbiano | 2025 | R$ 65,90 |
| 43 | Casa Silva Reserva Sauvignon Blanc | 2025 | R$ 79,90 |
| 44 | Norton Reserva Malbec | 2024 | R$ 99,90 |
| 45 | Pata Negra Reserva Cepas Viejas | 2019 | R$ 89,90 |
| 46 | Carlos Montes Tannat | 2023 | R$ 119,90 |
| 47 | Volantin Carménère | 2024 | R$ 49,90 |
| 48 | Mapuche Carménère | 2024 | R$ 45,90 |
| 49 | Adega de Pegões Touriga Nacional | 2022 | R$ 169,90 |
| 50 | Machupe Gran Blend | 2019 | R$ 99,90 |

### 2.3. Requisitos funcionais e técnicos

A landing page deve contemplar uma experiência de compra coerente, incluindo:

- **Catálogo:** exibição dos produtos com nome, safra, preço e imagem correspondente;
- **Carrinho:** inclusão e remoção de produtos;
- **Quantidades:** possibilidade de aumentar ou diminuir unidades;
- **Cálculos:** atualização automática dos subtotais e do valor total;
- **Resumo do pedido:** apresentação dos produtos e valores selecionados;
- **Conclusão da compra:** tela de confirmação com identificação ou número do pedido gerado;
- **Consistência dos dados:** manutenção dos valores e das quantidades entre catálogo, carrinho e resumo;
- **Responsividade:** adaptação para dispositivos móveis e desktops;
- **Organização do código:** separação entre HTML e CSS, com estrutura clara de arquivos.

Para este protótipo, a geração de um pedido pode ocorrer no próprio front-end. Isso não equivale a uma transação comercial real: pagamentos, estoque, persistência segura e processamento de pedidos exigiriam serviços adicionais no back-end.

---

## 3. Primeiro resultado e avaliação crítica

Na primeira execução, o modelo entregou a página completa. Apesar de a estrutura geral ter atendido à proposta, houve um aspecto visual que não me agradou: as imagens dos vinhos eram representações ilustradas, acompanhadas dos nomes e das safras, em vez de fotografias reais das garrafas.

Esse resultado evidenciou uma diferença entre cumprir a estrutura solicitada e atender integralmente à intenção visual do projeto. A página estava montada, mas a apresentação dos produtos não transmitia o nível de realismo esperado para uma loja virtual de vinhos.

A partir dessa avaliação, identifiquei a necessidade de tornar a instrução sobre as imagens mais explícita, especificando tanto a origem das referências quanto a padronização de sua apresentação.

### 3.1. Terceiro prompt — refinamento das imagens

**Objetivo:** substituir as ilustrações por fotografias reais dos produtos e padronizar sua exibição no catálogo.

**Prompt utilizado:**

```text
Gostaria que fossem utilizadas imagens reais dos produtos.

Pesquise imagens de cada vinho no Google Imagens e utilize fotografias
que correspondam ao rótulo e, sempre que possível, à safra informada.

Padronize o tamanho e a área de exibição das imagens para que todas
as garrafas tenham uma apresentação consistente nos cards, preservando
suas proporções e evitando cortes ou distorções.

Se não encontrar uma imagem confiável para determinado produto,
não utilize uma garrafa de outro rótulo como se fosse a correta.
Sinalize a ausência ou utilize um espaço reservado apropriado.
```

### 3.2. Resultado após o refinamento

O segundo pedido produziu um resultado visual melhor do que o inicial. A especificação mais direta sobre o uso de fotografias reais e a padronização das imagens ajudou a aproximar a interface da proposta de uma loja virtual.

O principal aprendizado foi perceber que a qualidade do resultado depende não apenas da ferramenta escolhida, mas também da precisão das instruções e da capacidade de avaliar criticamente o que foi gerado.

O processo foi concluído em apenas quatro prompts, demonstrando como a interação iterativa com a IA pode acelerar o desenvolvimento sem eliminar a necessidade de análise, revisão e tomada de decisão por parte de quem desenvolve.

> **Nota metodológica:** a pesquisa de imagens deve priorizar fontes identificáveis e imagens compatíveis com o produto. O uso de imagens encontradas em mecanismos de busca não garante, por si só, a correspondência exata do rótulo, da safra ou a autorização de uso.

---

## 4. Aprendizados e considerações finais

A atividade demonstrou que o Vibecoding vai além de solicitar que uma IA gere uma página. É necessário definir objetivos, fornecer dados organizados, explicitar requisitos funcionais e visuais e avaliar o resultado com critérios claros.

Entre os principais aprendizados, destaco:

1. **Especificidade dos prompts:** instruções detalhadas reduzem ambiguidades e aproximam a entrega da intenção original.
2. **Avaliação crítica:** o primeiro resultado pode estar funcionalmente completo e, ainda assim, precisar de ajustes importantes de identidade visual e apresentação.
3. **Refinamento iterativo:** solicitações complementares permitem corrigir pontos específicos sem necessariamente reconstruir todo o projeto.
4. **Consistência visual:** imagens, tipografia, cores, espaçamentos e organização dos cards precisam seguir um padrão coerente.
5. **Confiabilidade dos dados:** preços, safras, notas e imagens devem ser conferidos antes de serem apresentados como informações comerciais.
6. **Documentação do processo:** registrar prompts, decisões e correções torna o desenvolvimento mais transparente e facilita a avaliação do caminho percorrido.

Concluo que a principal contribuição da atividade foi exercitar a combinação entre comunicação com IA, pensamento crítico e decisões de design. A ferramenta acelerou a implementação, mas a qualidade da solução continuou dependendo da clareza dos requisitos e da análise humana dos resultados.

---

## 5. Sugestão de organização da pasta do projeto

```text
chp-vibecoding/
├── README.md
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── app.js
├── assets/
│   ├── images/
│   └── references/
└── docs/
    ├── prompts.md
    ├── research-and-sources.md
    ├── design-decisions.md
    ├── visual-references.md
    └── iteration-notes.md
```

A estrutura acima é uma sugestão de organização. Ela separa a implementação da página dos registros de pesquisa, dos prompts e das decisões de design, facilitando a documentação e a apresentação do projeto.
