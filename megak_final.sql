-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Czas generowania: 11 Lip 2022, 19:43
-- Wersja serwera: 5.7.34
-- Wersja PHP: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `megak_final`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `projects`
--

CREATE TABLE `projects` (
  `id` varchar(36) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `projectName` varchar(30) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Zrzut danych tabeli `projects`
--

INSERT INTO `projects` (`id`, `projectName`, `createdAt`) VALUES
('40285b0a-9723-4b0e-b29d-f9ce0ce83097', 'Test5', '2022-07-08 17:01:51'),
('555b6272-300c-481f-972d-5458ac4bd3dd', 'Test2', '2022-07-08 16:54:18'),
('67be4aeb-eab4-4d88-9484-4ede3d3b7be9', 'Test3', '2022-07-08 16:54:22'),
('6f24501d-cdc5-43e6-8919-92f5d9f87653', 'Test6', '2022-07-08 17:09:45'),
('cbcf07d9-b204-46be-8ca8-0028a0858c2d', 'Test1', '2022-07-08 16:54:15'),
('d262b20d-de9e-4250-ad58-64bdad76077e', 'Test8', '2022-07-08 17:10:12'),
('d6ed074c-d5d1-416a-b20f-589f30118f37', 'Test4', '2022-07-08 16:54:28'),
('fb66ecfc-9eb7-4cbd-afe6-2b58f41d7281', 'Test 7', '2022-07-08 17:10:06');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `tasks`
--

CREATE TABLE `tasks` (
  `id` varchar(36) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `taskName` varchar(50) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `completed` tinyint(1) NOT NULL,
  `projectId` varchar(36) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Zrzut danych tabeli `tasks`
--

INSERT INTO `tasks` (`id`, `taskName`, `completed`, `projectId`, `createdAt`) VALUES
('2311778a-6729-444e-8446-1774eb7d297f', 'Test11', 0, 'cbcf07d9-b204-46be-8ca8-0028a0858c2d', '2022-07-08 17:11:41'),
('25b3ecfa-c48f-4d2d-bad1-39ce3f024e16', 'Test13', 0, 'cbcf07d9-b204-46be-8ca8-0028a0858c2d', '2022-07-08 17:11:49'),
('eb73fa48-9699-461b-8db8-c5b2665b205e', 'Test12', 0, 'cbcf07d9-b204-46be-8ca8-0028a0858c2d', '2022-07-08 17:11:45');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `projectId` (`projectId`);

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
