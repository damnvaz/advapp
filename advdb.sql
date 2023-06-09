-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 24, 2023 at 02:54 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.3.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `advdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `chat`
--

CREATE TABLE `chat` (
  `id` bigint(20) NOT NULL,
  `senderId` varchar(255) NOT NULL,
  `receiverId` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `createdAt` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `clientId` bigint(20) NOT NULL,
  `lawyerId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `contract`
--

CREATE TABLE `contract` (
  `id` bigint(20) NOT NULL,
  `clientId` varchar(255) NOT NULL,
  `lawyerId` varchar(255) NOT NULL,
  `paymentMethod` varchar(30) NOT NULL,
  `status` int(11) NOT NULL,
  `details` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `contract_template`
--

CREATE TABLE `contract_template` (
  `id` bigint(20) NOT NULL,
  `lawyerId` varchar(255) NOT NULL,
  `details` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contract_template`
--

INSERT INTO `contract_template` (`id`, `lawyerId`, `details`) VALUES
(1, '1', '(NOME DO CLIENTE), brasileiro, (ESTADO CIVIL), (PROFISSAO), portador da CNH nº (NUMERO DA CNH), expedida pelo (ORGAO/UF), e do CPF nº NUMERO DO CPF, residente e domiciliado na (NOME DA RUA), nº (NUMERO DO ENDERECO), (COMPLEMENTO DO ENDERECO), (BAIRRO), CIDADE/UF, CEP.: (NUMERO DO CEP), contrata como sua advogada NOME DA ADVOGADA, brasileira, advogada, inscrita na OAB/UF sob o no (NUMERO OAB) e no CPF (NUMERO CPF), com escritório na (NOME DA RUA DO ESCRITORIO), nº (NUMERO DO ENDERECO), (COMPLEMENTO DO ENDERECO), (BAIRRO), (CIDADE/UF), CEP.: (NUMERO DO CEP).\r\n\r\nAcordam as partes que são dados amplos poderes, na forma do\r\nartigo 105 do Código de Processo Civil, para atuar e defende-los no processo de nº (NUMERO DO PROCESSO) em trâmite no (COMPETENCIA), podendo, para tanto, agirem em conjunto ou isoladamente, substabelecerem, confessarem, reconhecerem a procedência do pedido, transigirem, desistirem, renunciarem ao direito sobre que se funda a ação, receberem, fornecerem quitação ou, até mesmo, firmarem compromisso.\r\n\r\nAcordam, ainda, que será devido o valor inicial de R$ (VALOR ACORDADO)\r\n(VALOR ACORDADO POR EXTENSO), valor este que será pago em (QUANTIDADE DE PARCELAS) a começar em (DATA DO PAGAMENTO), sendo as demais em dia igual dos meses subsequentes.\r\n\r\nCaso ocorra a improcedência da ação, os contratantes deverão arcar com o valor de (PERCENTUAL A ARCAR) (PERCENTUAL A ARCAR POR EXTENSO) do valor da causa, valor este que deverá ser pago integralmente após o trânsito em julgado da ação.\r\n\r\nOs Contratantes poderão rescindir este contrato de prestação de serviços com as Contratadas a qualquer momento, bastando um aviso prévio de (DIAS DO AVISO) (DIAS DO AVISO POR EXTENSO) dias. Caso a Contratante rescinda o presente contrato, será responsável pelo pagamento integral dos honorários e despesas ora pactuados. As Contratadas, da mesma forma, poderão terminar a relação de prestação de serviços com os Clientes Contratantes, por qualquer motivo, mediante notificação com (DIAS DE NOTIFICACAO) (DIAS POR EXTENSO DA NOTIFICACAO) dias de antecedência.\r\n\r\nFicam, também, os contratantes esclarecidos de que lhe serão repassadas todas as despesas relativas a fotocópias, e outras mais que sejam necessárias ao regular andamento do processo.\r\n\r\nOs contratantes ficam previamente esclarecidos de que se trata de um contrato de obrigação meio, não se responsabilizando as contratadas por eventual procedência\r\ndos pedidos.\r\n\r\n(CIDADE), (DIA) de (MES) de (ANO). ');

-- --------------------------------------------------------

--
-- Table structure for table `faq`
--

CREATE TABLE `faq` (
  `id` bigint(20) NOT NULL,
  `doubt` varchar(150) NOT NULL,
  `details` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `faq`
--

INSERT INTO `faq` (`id`, `doubt`, `details`) VALUES
(1, 'Como criar uma conta?', 'Para criar sua conta, basta ir em login na barra superior, em seguida, clicar em \'Novo aqui? cadastrar\''),
(2, 'Quanto tempo dura meu acesso?', 'Seu acesso à plataforma tem vigor de 1 mês. Após esse período, é necessário renovar sua mensalidade.');

-- --------------------------------------------------------

--
-- Table structure for table `forum`
--

CREATE TABLE `forum` (
  `id` bigint(20) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `createdAt` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `log`
--

CREATE TABLE `log` (
  `id` bigint(20) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `createdAt` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` bigint(20) NOT NULL,
  `receiverId` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `url` varchar(150) NOT NULL,
  `wasRead` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `plans`
--

CREATE TABLE `plans` (
  `id` bigint(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `oldPrice` varchar(30) NOT NULL,
  `price` varchar(30) NOT NULL,
  `details` varchar(255) NOT NULL,
  `bg` varchar(255) NOT NULL,
  `color` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `plans`
--

INSERT INTO `plans` (`id`, `title`, `oldPrice`, `price`, `details`, `bg`, `color`) VALUES
(1, 'Plano Silver', 'R$ 69,90', 'R$ 59,90', '\"Agendamento de consultas\",\"Chat com o cliente\",\"Relatorios\"', '#E1DEDE', '#797979'),
(2, 'Plano Black', 'R$ 89,90', 'R$ 79,90', '\"Agendamento de consultas\",\"Chat com o cliente\",\"Relatorios\",\"Contratos\",\"Forum\"', '#525151', '#f9f9f9');

-- --------------------------------------------------------

--
-- Table structure for table `platform`
--

CREATE TABLE `platform` (
  `id` bigint(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `stoneApiKey` varchar(255) NOT NULL,
  `recipientId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `platform`
--

INSERT INTO `platform` (`id`, `email`, `phone`, `stoneApiKey`, `recipientId`) VALUES
(1, 'suporte@iusok.com', '(21)991943672', 'stone_api_key', 'recipient_id');

-- --------------------------------------------------------

--
-- Table structure for table `privacy_policy`
--

CREATE TABLE `privacy_policy` (
  `id` bigint(20) NOT NULL,
  `policy` longtext NOT NULL,
  `version` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `privacy_policy`
--

INSERT INTO `privacy_policy` (`id`, `policy`, `version`) VALUES
(1, '<titulo>SEGURANÇA EM DADOS PESSOAIS</titulo>\n<paragrafo>Compartilhe suas informações conosco e nos ajude a melhorar o sistema de compras do site. Para que seu pedido possa ser efetuado em segurança, preencha os dados cadastrais com atenção. Asseguramos a privacidade e a segurança de nossos clientes durante todo o processo de navegação e compra no site. Seus dados cadastrais não serão utilizados em nenhuma hipótese para fins de ofertas a não ser que você autorize expressamente no momento do cadastramento. Os seus dados pessoais são fundamentais para que seu pedido seja bem-sucedido e sua compra seja segura.</paragrafo>\n\n<titulo>COOKIES E INFORMAÇÕES DE NAVEGAÇÃO</titulo>\n<paragrafo>Seus dados de navegação são coletados para que possamos aprimorar sua experiência de compra, garantindo um serviço personalizado para sua necessidade. Os cookies são pequenos arquivos de dados transferidos de um site da web para o disco do seu computador, sem armazenar dados pessoais (como logins e senhas, por exemplo). Assim como outros websites, nós utilizamos cookies e informações de navegação de nossos usuários (sessão do browser) que são agrupados e utilizados de maneira genérica, com o objetivo de aperfeiçoar os serviços que o site oferece, e assim garantindo as melhores ofertas e promoções sem oferecer conteúdo irrelevante. É importante ressaltar que durante todo este processo as informações pessoais são mantidas em sigilo absoluto. Importante! Para que seus dados permaneçam intactos, desaconselhamos expressamente a divulgação de senhas a terceiros, mesmo a amigos e parentes.</paragrafo>', '2023-03-12');

-- --------------------------------------------------------

--
-- Table structure for table `process`
--

CREATE TABLE `process` (
  `id` bigint(20) NOT NULL,
  `processNumber` varchar(255) NOT NULL,
  `clientId` varchar(255) NOT NULL,
  `lawyerId` varchar(255) NOT NULL,
  `defandant` varchar(255) NOT NULL,
  `files` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `process_template`
--

CREATE TABLE `process_template` (
  `id` bigint(20) NOT NULL,
  `lawyerId` varchar(255) NOT NULL,
  `details` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `receipts`
--

CREATE TABLE `receipts` (
  `id` bigint(20) NOT NULL,
  `clientId` varchar(255) NOT NULL,
  `lawyerId` varchar(255) NOT NULL,
  `contractId` varchar(255) NOT NULL,
  `details` longtext NOT NULL,
  `createdAt` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `id` bigint(20) NOT NULL,
  `cliendId` varchar(255) NOT NULL,
  `lawyerId` varchar(255) NOT NULL,
  `amount` varchar(255) NOT NULL,
  `place` varchar(15) NOT NULL,
  `otherService` varchar(255) NOT NULL,
  `status` int(11) NOT NULL,
  `day` varchar(30) NOT NULL,
  `time` varchar(30) NOT NULL,
  `paymentMethod` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `schedule_service`
--

CREATE TABLE `schedule_service` (
  `id` bigint(20) NOT NULL,
  `service` varchar(255) NOT NULL,
  `userId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `schedule_time`
--

CREATE TABLE `schedule_time` (
  `id` bigint(20) NOT NULL,
  `dayOfTheWeek` varchar(15) NOT NULL,
  `time` varchar(8) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `comment` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `suggestions`
--

CREATE TABLE `suggestions` (
  `Id` bigint(20) NOT NULL,
  `suggestion` varchar(255) NOT NULL,
  `createdAt` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `terms_of_use`
--

CREATE TABLE `terms_of_use` (
  `id` bigint(20) NOT NULL,
  `terms` longtext NOT NULL,
  `version` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `terms_of_use`
--

INSERT INTO `terms_of_use` (`id`, `terms`, `version`) VALUES
(1, '<paragrafo>Nós garantimos total segurança de todos os seus dados fornecidos. Sua privacidade também é garantida durante as compras e a navegação pelo site do iusok.</paragrafo>\n\n<titulo>SEGURANÇA EM DADOS PESSOAIS</titulo>\n<paragrafo>Compartilhe suas informações conosco e nos ajude a melhorar o sistema de compras do site. Para que seu pedido possa ser efetuado em segurança, preencha os dados cadastrais com atenção. Asseguramos a privacidade e a segurança de nossos clientes durante todo o processo de navegação e compra no site. Seus dados cadastrais não serão utilizados em nenhuma hipótese para fins de ofertas a não ser que você autorize expressamente no momento do cadastramento. Os seus dados pessoais são fundamentais para que seu pedido seja bem-sucedido e sua compra seja segura.</paragrafo>\n\n<titulo>COOKIES E INFORMAÇÕES DE NAVEGAÇÃO</titulo>\n<paragrafo>Seus dados de navegação são coletados para que possamos aprimorar sua experiência de compra, garantindo um serviço personalizado para sua necessidade. Os cookies são pequenos arquivos de dados transferidos de um site da web para o disco do seu computador, sem armazenar dados pessoais (como logins e senhas, por exemplo). Assim como outros websites, nós utilizamos cookies e informações de navegação de nossos usuários (sessão do browser) que são agrupados e utilizados de maneira genérica, com o objetivo de aperfeiçoar os serviços que o site oferece, e assim garantindo as melhores ofertas e promoções sem oferecer conteúdo irrelevante. É importante ressaltar que durante todo este processo as informações pessoais são mantidas em sigilo absoluto. Importante! Para que seus dados permaneçam intactos, desaconselhamos expressamente a divulgação de senhas a terceiros, mesmo a amigos e parentes.</paragrafo>\n\n<titulo>E-MAILS PROMOCIONAIS COM OFERTAS E SERVIÇOS</titulo>\n<paragrafo>Ao se cadastrar em nosso site, você poderá escolher receber e-mails com nossas informações e promoções, tendo a opção de desativá-los a hora que quiser. O envio de e-mails será feito apenas com consentimento do usuário e poderá ser cancelado há qualquer momento. No entanto, após requisitar o cancelamento nós teremos um período de até 3 (três) dias para processar sua solicitação. Lembrando que não praticamos o envio de e-mails sem autorização prévia, conhecidos como SPAM. Os e-mails serão enviados pelo Remetente e-mail excluindo toda e qualquer responsabilidade por conteúdo enviado em nome do iusok emitidos por outro endereço de e-mail. Caso você receba, por favor, exclua e denuncie como SPAM imediatamente.</paragrafo>\n\n<titulo>POLITICA DE CANCELAMENTO E REEMBOLSO</titulo>\n<paragrafo>Como funciona o processo da restituição do valor? Depois do SAC confirmar a solicitação do cancelamento enviado ao suporte@iusok.com , será solicitado o estorno de valores junto à administradora de cartão de crédito. O estorno na fatura do cartão seguirá as normas de cada operadora/banco emissor, podendo ser creditado na fatura seguinte ou na subsequente, de acordo com a data de fechamento da fatura. Neste caso o processo de estorno pode levar de 30 a 60 dias. Posso trocar meu ingresso? Não realizamos troca de ingressos. Sugerimos você repassar seu ingresso para outra pessoa. Para isso basta imprimir e solicitar um termo de transferência para o suporte@iusok.come  entregar o ingresso ao novo portador.</paragrafo>', '2023-03-12');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` bigint(20) NOT NULL,
  `receiverId` varchar(255) NOT NULL,
  `payerId` varchar(255) NOT NULL,
  `amount` varchar(255) NOT NULL,
  `paymentMethod` varchar(15) NOT NULL,
  `service` varchar(255) NOT NULL,
  `wasPaid` tinyint(1) NOT NULL,
  `createdAt` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `document` varchar(18) NOT NULL,
  `nationalRegistration` varchar(255) NOT NULL,
  `driversLicense` varchar(255) NOT NULL,
  `phone` varchar(30) NOT NULL,
  `email` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `type` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `birthdate` varchar(12) NOT NULL,
  `address` varchar(255) NOT NULL,
  `createdAt` varchar(16) NOT NULL,
  `recipientId` varchar(255) NOT NULL,
  `martialStatus` varchar(255) NOT NULL,
  `occupation` varchar(255) NOT NULL,
  `workPassport` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `document`, `nationalRegistration`, `driversLicense`, `phone`, `email`, `pass`, `type`, `status`, `birthdate`, `address`, `createdAt`, `recipientId`, `martialStatus`, `occupation`, `workPassport`) VALUES
(1, 'Daniel Vaz Monteiro', '179.273.647-90', '28.816.799-2', '(não tem carteira de motorista)', '(21)99194-3672', 'contact.daniel.vaz@gmail.com', '12345678', 1, 1, '04/11/1997', 'Endereço: Rua Ernesto Silveira, Número: 137, Complemento: (não possui complemento), Bairro: Nossa Senhora de Fátima, CEP: 25.961-350, Cidade: Teresópolis, Estado: RJ.', '15/03/2023', '-', '1', 'Software Engineer', '(não possui carteira de trabalho)'),
(2, 'Lucas Nogueira Secchin', '144.951.367-04', '26.371.925-4', '(não lembra)', '(21)98087-1656', 'lucasecchin@hotmail.com', '12345678', 1, 1, '17/08/1996', '-', '21/03/2023', '-', '1', 'IT Support Leader', '(não lembra)');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`clientId`);

--
-- Indexes for table `contract`
--
ALTER TABLE `contract`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contract_template`
--
ALTER TABLE `contract_template`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `faq`
--
ALTER TABLE `faq`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `forum`
--
ALTER TABLE `forum`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `log`
--
ALTER TABLE `log`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `plans`
--
ALTER TABLE `plans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `platform`
--
ALTER TABLE `platform`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `privacy_policy`
--
ALTER TABLE `privacy_policy`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `process`
--
ALTER TABLE `process`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `process_template`
--
ALTER TABLE `process_template`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `receipts`
--
ALTER TABLE `receipts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `schedule_service`
--
ALTER TABLE `schedule_service`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `schedule_time`
--
ALTER TABLE `schedule_time`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `suggestions`
--
ALTER TABLE `suggestions`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `terms_of_use`
--
ALTER TABLE `terms_of_use`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chat`
--
ALTER TABLE `chat`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contract`
--
ALTER TABLE `contract`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contract_template`
--
ALTER TABLE `contract_template`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `faq`
--
ALTER TABLE `faq`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `forum`
--
ALTER TABLE `forum`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `log`
--
ALTER TABLE `log`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `plans`
--
ALTER TABLE `plans`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `platform`
--
ALTER TABLE `platform`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `privacy_policy`
--
ALTER TABLE `privacy_policy`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `process`
--
ALTER TABLE `process`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `process_template`
--
ALTER TABLE `process_template`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `receipts`
--
ALTER TABLE `receipts`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `schedule_service`
--
ALTER TABLE `schedule_service`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `schedule_time`
--
ALTER TABLE `schedule_time`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `suggestions`
--
ALTER TABLE `suggestions`
  MODIFY `Id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `terms_of_use`
--
ALTER TABLE `terms_of_use`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
