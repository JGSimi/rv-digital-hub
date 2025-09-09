-- Inserir categorias iniciais
INSERT IGNORE INTO categorias (id, nome, descricao, beneficios, ativo, created_at, updated_at) VALUES
(1, 'Premium', 'Categoria premium com todos os benefícios', 'Atendimento prioritário, desconto de 15%, suporte 24/7', true, NOW(), NOW()),
(2, 'Standard', 'Categoria padrão para clientes regulares', 'Atendimento regular, desconto de 5%', true, NOW(), NOW()),
(3, 'Basic', 'Categoria básica para novos clientes', 'Atendimento padrão', true, NOW(), NOW());

-- Inserir serviços iniciais
INSERT IGNORE INTO servicos (id, nome, descricao, valor, categoria_id, ativo, created_at, updated_at) VALUES
(1, 'Desenvolvimento Web', 'Criação de sites e sistemas web personalizados', 2500.00, 1, true, NOW(), NOW()),
(2, 'Marketing Digital', 'Gestão de redes sociais e campanhas online', 800.00, 2, true, NOW(), NOW()),
(3, 'Consultoria TI', 'Consultoria técnica e estratégica em tecnologia', 150.00, 1, true, NOW(), NOW()),
(4, 'Manutenção de Site', 'Manutenção mensal de websites', 200.00, 3, true, NOW(), NOW());