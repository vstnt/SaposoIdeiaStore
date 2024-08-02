/* Este é um seletor para endpoints e variáveis que precisam ser alteradas no caso
do desenvolvimento ou deploy. Assim, no github, o ideal é que esse arquivo fique estático,
na opção de Produção, e no repositório local, fique na opção de Desenvolvimento. O comando
para que o git o ignore é: git update-index --assume-unchanged src/developmentOrProductionSelector.ts
Junto com esse arquivo, vamos criar um ambiente com as variáveis e endpoints para as duas opções.
Este poderá ser sincronizado entre os repositórios normalmente. */

export const selector: 'production' | 'development' = 'production';

// ou

//export const selector: 'production' | 'development' = 'development';

