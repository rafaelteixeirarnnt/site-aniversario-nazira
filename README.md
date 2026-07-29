# Nazira 90 anos

Site responsivo para acompanhar a programação musical da comemoração de 90 anos da Nazira.

## Como executar

```bash
npm install
npm run dev
```

Para gerar a versão estática:

```bash
npm run build
```

## Publicar no Render

Este projeto já inclui um `render.yaml` na raiz do repositório.

No Render:

1. Clique em **New**.
2. Escolha **Blueprint** para usar o `render.yaml`, ou **Static Site** para configurar manualmente.
3. Conecte o repositório `rafaelteixeirarnnt/site-aniversario-nazira`.
4. Use a branch `main`.

Configuração manual, caso escolha **Static Site**:

- Build Command: `npm ci && npm run build`
- Publish Directory: `dist`

Depois do primeiro deploy, novos commits na branch `main` podem gerar novos deploys automaticamente.

## Onde alterar as informações

- Local, data, horário, endereço e links de mapa: `src/data/event.ts`
- Leitura bíblica: item `leitura-biblica` em `src/data/program.ts`
- Letras das músicas: campo `content` de cada música em `src/data/program.ts`

As letras devem ser inseridas manualmente. O projeto não busca, copia nem inventa letras.

## Conteúdo com quebras de linha

O campo `content` preserva quebras de linha. Exemplo:

```ts
content: `Primeira linha
Segunda linha

Nova estrofe`
```

## Configuração do mapa

Em `src/data/event.ts`, preencha:

- `mapsUrl`: link normal do Google Maps para abrir no aplicativo.
- `mapEmbedUrl`: URL de incorporação do mapa para exibir no site.

Se `mapEmbedUrl` ainda não estiver configurado, o site mostra um espaço reservado e mantém o botão do Google Maps preparado.

## Funcionalidades

- Programação completa em ordem.
- Tela de leitura para cada item.
- Mensagem discreta quando leitura ou letra ainda estiver vazia.
- Botões A−, A e A+ para ajustar o tamanho da letra.
- Preferência de tamanho salva no `localStorage`.
- Navegação anterior/próxima.
- Botões para copiar endereço e compartilhar/copiar link.
- Layout mobile-first com adaptação para tablets e desktop.
