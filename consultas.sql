-- etapa 3: consultas com select
-- consultas.sql: consultas da loja (roteiro, Etapa 3 e 4).

-- 1. Produtos com preço maior que 100, do mais caro para o mais barato
SELECT * FROM produto WHERE preco > 100 ORDER BY preco DESC;
-- Esperado (4 linhas): id | nome | preco | estoque
--   3 | Monitor | 800 | 3
--   5 | Headset | 200 | 7
--   4 | Webcam | 150 | 0
--   2 | Teclado | 120 | 5

-- 2. Clientes cujo nome começa com C
SELECT * FROM cliente WHERE nome LIKE 'C%';
-- Esperado (1 linha): id | nome | email | cidade
--   3 | Carla Mendes | carla@mail.com | Goiânia

-- 3. Os 3 pedidos mais recentes (id, data e cliente)
SELECT id, data, cliente_id FROM pedido ORDER BY data DESC LIMIT 3;
-- Esperado (3 linhas): id | data | cliente_id
--   8 | 2026-11-12 | 3
--   7 | 2026-11-11 | 1
--   6 | 2026-11-10 | 5

-- 4. Clientes de Goiânia, em ordem alfabética
SELECT * FROM cliente WHERE cidade = 'Goiânia' ORDER BY nome ASC;
-- Esperado (3 linhas): id | nome | email | cidade
--   1 | Ana Souza | ana@mail.com | Goiânia
--   3 | Carla Mendes | carla@mail.com | Goiânia
--   5 | Eduarda Melo | edua@mail.com | Goiânia

-- 5. Produtos sem estoque
SELECT * FROM produto WHERE estoque = 0;
-- Esperado (1 linha): id | nome | preco | estoque
--   4 | Webcam | 150 | 0

-- 6. Pedidos do cliente 1, da data mais antiga para a mais recente
SELECT * FROM pedido WHERE cliente_id = 1 ORDER BY data ASC;
-- Esperado (3 linhas): id | data | cliente_id
--   1 | 2026-11-01 | 1
--   3 | 2026-11-05 | 1
--   7 | 2026-11-11 | 1

-- 7. Itens do pedido 1 (id do produto e quantidade)
SELECT produto_id, quantidade FROM item_pedido WHERE pedido_id = 1;
-- Esperado (2 linhas): produto_id | quantidade
--   1 | 2
--   2 | 1

-- 8. Produtos com estoque menor que 5
SELECT * FROM produto WHERE estoque < 5;
-- Esperado (2 linhas): id | nome | preco | estoque
--   3 | Monitor | 800 | 3
--   4 | Webcam | 150 | 0

-- ETAPA 4: alterar e apagar com segurança (sempre com WHERE, com SELECT antes e depois)

SELECT id, nome, estoque FROM produto WHERE id = 4;
-- o valor (esperado: estoque = 0)

UPDATE produto SET estoque = estoque + 5 WHERE id = 4;
-- 1 linha afetada

SELECT id, nome, estoque FROM produto WHERE id = 4;
-- esperado: estoque = 5

-- DELETE FROM cliente WHERE id = 2;

-- esperado: Mensagem do MySQL: Documentação

#1451 - Cannot delete or update a parent row: a foreign key constraint fails (`teste_aula7`.`pedido`, CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `cliente` (`id`))
-- Por que o banco recusou o DELETE: o cliente 2 (Bruno Lima) tem o pedido 2. A tabela pedido aponta para cliente por uma chave estrangeira com ON DELETE RESTRICT, que impede apagar um cliente que ainda tem pedidos. Isso protege o histórico e evita pedidos "sem dono".

-- ETAPA 5: testes de integridade (cada um deve dar erro; anote o código e explique)

-- INSERT INTO pedido (data, cliente_id) VALUES ('2026-11-15', 6);
-- esperado: Mensagem do MySQL: Documentação
#1452 - Cannot add or update a child row: a foreign key constraint fails (`teste_aula7`.`pedido`, CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `cliente` (`id`))
-- O que significa: o banco recusou o pedido porque o cliente_id 6 não existe na tabela cliente. A chave estrangeira garante que todo pedido aponte para um cliente real.

-- INSERT INTO cliente (nome, email, cidade) VALUES ('Teste', 'ana@mail.com', 'Goiânia');
-- eperado: Mensagem do MySQL: Documentação
#1062 - Entrada 'ana@mail.com' duplicada para a chave 'uq_cliente_email'
-- Por que o campo email não aceita repetição: o e-mail identifica cada cliente. Se pudesse se repetir, a mesma pessoa poderia ter duas contas, ou duas pessoas dividiriam o mesmo e-mail, e os pedidos ficariam confusos.

