-- dados.sql: INSERTs que funcionaram (roteiro, Etapa 2).
-- Ordem: cliente e produto, depois pedido, por último item_pedido.

INSERT INTO cliente (id, nome, email, cidade) VALUES
(1, 'Ana Souza', 'ana@mail.com', 'Goiânia'),
(2, 'Bruno Lima', 'bruno@mail.com', 'Anápolis'),
(3, 'Carla Mendes', 'carla@mail.com', 'Goiânia'),
(4, 'Daniel Rocha', 'daniel@mail.com', 'Aparecida'),
(5, 'Eduarda Melo', 'edua@mail.com', 'Goiânia');

INSERT INTO produto (id, nome, preco, estoque) VALUES
(1, 'Mouse', 50.00, 10),
(2, 'Teclado', 120.00, 5),
(3, 'Monitor', 800.00, 3),
(4, 'Webcam', 150.00, 0),
(5, 'Headset', 200.00, 7);

INSERT INTO pedido (id, data, cliente_id) VALUES
(1, '2026-11-01', 1),
(2, '2026-11-03', 2),
(3, '2026-11-05', 1),
(4, '2026-11-07', 3),
(5, '2026-11-09', 4),
(6, '2026-11-10', 5),
(7, '2026-11-11', 1),
(8, '2026-11-12', 3);

INSERT INTO item_pedido (pedido_id, produto_id, quantidade, preco_unitario) VALUES
(1, 1, 2, 50.00),
(1, 2, 1, 120.00),
(2, 1, 1, 50.00),
(3, 3, 1, 800.00),
(4, 5, 2, 200.00),
(5, 1, 3, 50.00),
(5, 2, 1, 120.00),
(6, 3, 1, 800.00),
(7, 5, 1, 200.00),
(8, 1, 1, 50.00);

