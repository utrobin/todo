-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Хост: localhost
-- Время создания: Ноя 07 2016 г., 00:51
-- Версия сервера: 5.5.53-0ubuntu0.14.04.1
-- Версия PHP: 5.5.9-1ubuntu4.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `todo`
--

-- --------------------------------------------------------

--
-- Структура таблицы `auth_group`
--

CREATE TABLE IF NOT EXISTS `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `auth_group_permissions`
--

CREATE TABLE IF NOT EXISTS `auth_group_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissi_permission_id_84c5c92e_fk_auth_permission_id` (`permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `auth_permission`
--

CREATE TABLE IF NOT EXISTS `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_01ab375a_uniq` (`content_type_id`,`codename`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=25 ;

--
-- Дамп данных таблицы `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add log entry', 1, 'add_logentry'),
(2, 'Can change log entry', 1, 'change_logentry'),
(3, 'Can delete log entry', 1, 'delete_logentry'),
(4, 'Can add permission', 2, 'add_permission'),
(5, 'Can change permission', 2, 'change_permission'),
(6, 'Can delete permission', 2, 'delete_permission'),
(7, 'Can add group', 3, 'add_group'),
(8, 'Can change group', 3, 'change_group'),
(9, 'Can delete group', 3, 'delete_group'),
(10, 'Can add user', 4, 'add_user'),
(11, 'Can change user', 4, 'change_user'),
(12, 'Can delete user', 4, 'delete_user'),
(13, 'Can add content type', 5, 'add_contenttype'),
(14, 'Can change content type', 5, 'change_contenttype'),
(15, 'Can delete content type', 5, 'delete_contenttype'),
(16, 'Can add session', 6, 'add_session'),
(17, 'Can change session', 6, 'change_session'),
(18, 'Can delete session', 6, 'delete_session'),
(19, 'Can add todo', 7, 'add_todo'),
(20, 'Can change todo', 7, 'change_todo'),
(21, 'Can delete todo', 7, 'delete_todo'),
(22, 'Can add tags', 8, 'add_tags'),
(23, 'Can change tags', 8, 'change_tags'),
(24, 'Can delete tags', 8, 'delete_tags');

-- --------------------------------------------------------

--
-- Структура таблицы `auth_user`
--

CREATE TABLE IF NOT EXISTS `auth_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `auth_user_groups`
--

CREATE TABLE IF NOT EXISTS `auth_user_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `auth_user_user_permissions`
--

CREATE TABLE IF NOT EXISTS `auth_user_user_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_perm_permission_id_1fbb5f2c_fk_auth_permission_id` (`permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `django_admin_log`
--

CREATE TABLE IF NOT EXISTS `django_admin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin__content_type_id_c4bce8eb_fk_django_content_type_id` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `django_content_type`
--

CREATE TABLE IF NOT EXISTS `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

--
-- Дамп данных таблицы `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(1, 'admin', 'logentry'),
(3, 'auth', 'group'),
(2, 'auth', 'permission'),
(4, 'auth', 'user'),
(5, 'contenttypes', 'contenttype'),
(6, 'sessions', 'session'),
(8, 'todolist', 'tags'),
(7, 'todolist', 'todo');

-- --------------------------------------------------------

--
-- Структура таблицы `django_migrations`
--

CREATE TABLE IF NOT EXISTS `django_migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=15 ;

--
-- Дамп данных таблицы `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'contenttypes', '0001_initial', '2016-11-06 11:44:23'),
(2, 'auth', '0001_initial', '2016-11-06 11:44:24'),
(3, 'admin', '0001_initial', '2016-11-06 11:44:24'),
(4, 'admin', '0002_logentry_remove_auto_add', '2016-11-06 11:44:24'),
(5, 'contenttypes', '0002_remove_content_type_name', '2016-11-06 11:44:24'),
(6, 'auth', '0002_alter_permission_name_max_length', '2016-11-06 11:44:24'),
(7, 'auth', '0003_alter_user_email_max_length', '2016-11-06 11:44:25'),
(8, 'auth', '0004_alter_user_username_opts', '2016-11-06 11:44:25'),
(9, 'auth', '0005_alter_user_last_login_null', '2016-11-06 11:44:25'),
(10, 'auth', '0006_require_contenttypes_0002', '2016-11-06 11:44:25'),
(11, 'auth', '0007_alter_validators_add_error_messages', '2016-11-06 11:44:25'),
(12, 'auth', '0008_alter_user_username_max_length', '2016-11-06 11:44:25'),
(13, 'sessions', '0001_initial', '2016-11-06 11:44:25'),
(14, 'todolist', '0001_initial', '2016-11-06 11:44:39');

-- --------------------------------------------------------

--
-- Структура таблицы `django_session`
--

CREATE TABLE IF NOT EXISTS `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_de54fa62` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `todolist_tags`
--

CREATE TABLE IF NOT EXISTS `todolist_tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(64) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

--
-- Дамп данных таблицы `todolist_tags`
--

INSERT INTO `todolist_tags` (`id`, `title`) VALUES
(1, 'javascript'),
(2, 'Технопарк'),
(3, 'npm'),
(7, 'Генераторы'),
(8, 'С++'),
(9, 'Rust'),
(10, 'Go');

-- --------------------------------------------------------

--
-- Структура таблицы `todolist_todo`
--

CREATE TABLE IF NOT EXISTS `todolist_todo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL,
  `description` longtext NOT NULL,
  `added_at` datetime NOT NULL,
  `completed` tinyint(1) NOT NULL,
  `deleted` tinyint(1) NOT NULL,
  `dedline_date` date DEFAULT NULL,
  `dedline_time` time DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=32 ;

--
-- Дамп данных таблицы `todolist_todo`
--

INSERT INTO `todolist_todo` (`id`, `title`, `description`, `added_at`, `completed`, `deleted`, `dedline_date`, `dedline_time`) VALUES
(1, 'Прототип объекта изменил', 'Прототип proto\n\nЕсли один объект имеет специальную ссылку __proto__ на другой объект, то при чтении свойства из него, если свойство отсутствует в самом объекте, оно ищется в объекте __proto__.\n\nСвойство __proto__ доступно во всех браузерах, кроме IE10-, а в более старых IE оно, конечно же, тоже есть, но напрямую к нему не обратиться, требуются чуть более сложные способы, которые мы рассмотрим позднее.', '2016-11-06 12:19:33', 0, 0, '2017-03-16', '22:19:00'),
(2, 'Забрать ребенка', 'Забрать ребенка из школы.', '2016-11-06 12:33:27', 1, 0, '2017-02-09', '13:15:00'),
(3, 'trt', '', '2016-11-06 13:08:19', 0, 1, NULL, NULL),
(4, 'kj', '', '2016-11-06 13:12:59', 0, 1, NULL, NULL),
(5, 'оол', '', '2016-11-06 13:24:59', 0, 1, NULL, NULL),
(6, 'о', '', '2016-11-06 13:25:09', 0, 1, NULL, NULL),
(7, 'оо', '', '2016-11-06 13:25:22', 0, 1, NULL, NULL),
(8, 'МОя девушка хочет в попку', 'папап', '2016-11-06 17:42:59', 0, 1, '2016-12-09', '21:42:00'),
(9, 'Генераторы', 'Генераторы – новый вид функций в современном JavaScript. Они отличаются от обычных тем, что могут приостанавливать своё выполнение, возвращать промежуточный результат и далее возобновлять его позже, в произвольный момент времени.', '2016-11-06 18:48:56', 0, 0, '2017-03-08', '06:48:00'),
(10, 'gf', '', '2016-11-06 18:50:46', 0, 1, NULL, NULL),
(11, 'gfg', '', '2016-11-06 18:51:02', 0, 1, NULL, NULL),
(12, 'gfgfg', '', '2016-11-06 18:51:09', 0, 1, NULL, NULL),
(13, 'fdfgf', '', '2016-11-06 18:53:06', 0, 1, NULL, NULL),
(14, 'gfgfg', '', '2016-11-06 18:53:12', 0, 1, NULL, NULL),
(15, 'gfgfg', '', '2016-11-06 18:53:42', 0, 1, NULL, NULL),
(16, 'gfgfg', '', '2016-11-06 18:53:54', 0, 1, NULL, NULL),
(17, 'папап', '', '2016-11-06 19:04:00', 0, 1, NULL, NULL),
(18, 'gfgf', '', '2016-11-06 19:05:27', 0, 1, NULL, NULL),
(19, 'fdfgff', '', '2016-11-06 19:11:34', 0, 1, NULL, NULL),
(20, 'gfgfgfg', '', '2016-11-06 19:15:53', 0, 0, '2017-03-27', '03:50:00'),
(21, 'gfgf', 'кукукук', '2016-11-06 19:16:06', 0, 0, '2017-03-25', '04:43:00'),
(22, 'gfg', 'vhjk', '2016-11-06 19:24:53', 0, 1, NULL, '16:24:00'),
(23, 'fdfgfффф', 'gfgfg\n', '2016-11-06 19:41:43', 0, 1, NULL, NULL),
(24, 'gfgfgfg', '', '2016-11-06 20:00:08', 0, 1, NULL, NULL),
(25, 'fffd', '', '2016-11-06 20:02:31', 0, 1, NULL, NULL),
(26, 'C++', 'C++ — компилируемый, статически типизированный язык программирования общего назначения.\n\nПоддерживает такие парадигмы программирования, как процедурное программирование, объектно-ориентированное программирование, обобщённое программирование, обеспечивает модульность, раздельную компиляцию, обработку исключений, абстракцию данных, объявление типов (классов) объектов, виртуальные функции. Стандартная библиотека включает, в том числе, общеупотребительные контейнеры и алгоритмы. C++ сочетает свойства как высокоуровневых, так и низкоуровневых языков.[1][2] В сравнении с его предшественником — языком C, — наибольшее внимание уделено поддержке объектно-ориентированного и обобщённого программирования.[2]', '2016-11-06 20:38:11', 0, 0, '2016-11-30', '19:38:00'),
(27, 'Функциональное наследование', 'Наследование – это создание новых «классов» на основе существующих.\n\nВ JavaScript его можно реализовать несколькими путями, один из которых – с использованием наложения конструкторов, мы рассмотрим в этой главе.', '2016-11-06 20:39:23', 0, 0, '2016-11-24', NULL),
(28, 'Rust', 'Rust (англ. rust — ржавчина, произносится [rʌst]? — раст) — мультипарадигмальный компилируемый язык программирования общего назначения, спонсируемый Mozilla Research[5], поддерживающий функциональное программирование, модель акторов и процедурное программирование. Объектно-ориентированное программирование как таковое языком не поддерживается, но язык позволяет реализовать большинство понятий ООП при помощи других абстракций[6], например, типажей.', '2016-11-06 20:40:30', 0, 0, '2016-11-26', NULL),
(29, 'Go', 'Компилируемый многопоточный язык программирования, разработанный компанией Google. Первоначальная разработка Go началась в сентябре 2007 года, а его непосредственным проектированием занимались Роберт Гризмер, Роб Пайк и Кен Томпсон, занимавшиеся до этого проектом разработки операционной системы Inferno. Официально язык был представлен в ноябре 2009 года. На данный момент его поддержка осуществляется для операционных систем FreeBSD, OpenBSD, Linux, Mac OS X, Windows, начиная с версии 1.3 в язык Go включена экспериментальная поддержка DragonFly BSD, Plan 9 и Solaris, начиная с версии 1.4 - поддержка платформы Android.', '2016-11-06 20:41:22', 0, 0, NULL, NULL),
(30, 'Явное указание this: "call", "apply"', 'Итак, мы знаем, что this – это текущий объект при вызове «через точку» и новый объект при конструировании через new.\n\nВ этой главе наша цель получить окончательное и полное понимание this в JavaScript. Для этого не хватает всего одного элемента: способа явно указать this при помощи методов call и apply.', '2016-11-06 20:44:08', 0, 0, '2016-11-26', NULL),
(31, 'Управление памятью в JavaScript', 'Управление памятью в JavaScript обычно происходит незаметно. Мы создаём примитивы, объекты, функции… Всё это занимает память.\n\nЧто происходит с объектом, когда он становится «не нужен»? Возможно ли «переполнение» памяти? Для ответа на эти вопросы – залезем «под капот» интерпретатора.', '2016-11-06 20:45:24', 0, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `todolist_todo_tags`
--

CREATE TABLE IF NOT EXISTS `todolist_todo_tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `todo_id` int(11) NOT NULL,
  `tags_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `todolist_todo_tags_todo_id_7b77198c_uniq` (`todo_id`,`tags_id`),
  KEY `todolist_todo_tags_tags_id_9ee95f1a_fk_todolist_tags_id` (`tags_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=39 ;

--
-- Дамп данных таблицы `todolist_todo_tags`
--

INSERT INTO `todolist_todo_tags` (`id`, `todo_id`, `tags_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(7, 4, 2),
(13, 9, 1),
(14, 9, 7),
(31, 26, 2),
(32, 26, 8),
(33, 27, 1),
(35, 28, 2),
(34, 28, 9),
(36, 29, 10),
(37, 30, 1),
(38, 31, 1);

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  ADD CONSTRAINT `auth_group_permissi_permission_id_84c5c92e_fk_auth_permission_id` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`);

--
-- Ограничения внешнего ключа таблицы `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permissi_content_type_id_2f476e4b_fk_django_content_type_id` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Ограничения внешнего ключа таблицы `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  ADD CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Ограничения внешнего ключа таблицы `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  ADD CONSTRAINT `auth_user_user_perm_permission_id_1fbb5f2c_fk_auth_permission_id` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`);

--
-- Ограничения внешнего ключа таблицы `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  ADD CONSTRAINT `django_admin__content_type_id_c4bce8eb_fk_django_content_type_id` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Ограничения внешнего ключа таблицы `todolist_todo_tags`
--
ALTER TABLE `todolist_todo_tags`
  ADD CONSTRAINT `todolist_todo_tags_tags_id_9ee95f1a_fk_todolist_tags_id` FOREIGN KEY (`tags_id`) REFERENCES `todolist_tags` (`id`),
  ADD CONSTRAINT `todolist_todo_tags_todo_id_f4476f98_fk_todolist_todo_id` FOREIGN KEY (`todo_id`) REFERENCES `todolist_todo` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
