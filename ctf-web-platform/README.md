# Cyber CTF Platform

Sistema inicial de CTF para GitHub Pages.

## Funcionalidades

- Home com status da plataforma
- Cadastro/login local via LocalStorage
- Lista de desafios
- Envio e validação de flags
- Ranking automático
- Painel admin para cadastrar/remover desafios

## Publicação no GitHub Pages

1. Copie todos os arquivos para o repositório `cleitonalves76.github.io`
2. Faça commit e push
3. Acesse `Settings > Pages`
4. Selecione `Deploy from branch`
5. Branch `main`, pasta `/root`

## Observação importante

Esta versão é didática e usa LocalStorage. Para produção, substitua por Supabase/Firebase e nunca salve flags em texto puro no front-end.
