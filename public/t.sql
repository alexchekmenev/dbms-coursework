CREATE TABLE `Category` (
	`id` int(11) NOT NULL,
	`lft` int(11) NOT NULL UNIQUE,
	`rgt` int(11) NOT NULL UNIQUE,
	`name` varchar(50) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `City` (
	`id` int(11) NOT NULL,
	`name` varchar(50) NOT NULL,
	`shopCount` int(11) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Product` (
	`id` int(11) NOT NULL,
	`vendor_id` int(11) NOT NULL,
	`category_id` int(11) NOT NULL,
	`name` varchar(50) NOT NULL,
	`price` int(11) NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `Product` ADD CONSTRAINT `Product_fk0` FOREIGN KEY (`vendor_id`) REFERENCES `Vendor`(`id`);

ALTER TABLE `Product` ADD CONSTRAINT `Product_fk1` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`);


CREATE TABLE `ProductShop` (
	`product_id` int(11) NOT NULL,
	`shop_id` int(11) NOT NULL,
	`count` int(11) NOT NULL DEFAULT 0,
	PRIMARY KEY (`product_id`,`shop_id`)
);

ALTER TABLE `ProductShop` ADD CONSTRAINT `ProductShop_fk0` FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`);
ALTER TABLE `ProductShop` ADD CONSTRAINT `ProductShop_fk1` FOREIGN KEY (`shop_id`) REFERENCES `Shop`(`id`);


CREATE TABLE `Review` (
	`id` int(11) NOT NULL,
	`product_id` int(11) NOT NULL,
	`text` varchar(1000) NOT NULL,
	`points` int(11) NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `Review` ADD CONSTRAINT `Review_fk0` FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`);


CREATE TABLE `Shop` (
	`id` int(11) NOT NULL,
	`name` varchar(50) NOT NULL UNIQUE,
	`address` varchar(50) NOT NULL,
	`city_id` int(11) NOT NULL,
	`productCount` int(11) NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `Shop` ADD CONSTRAINT `Shop_fk0` FOREIGN KEY (`city_id`) REFERENCES `City`(`id`);


CREATE TABLE `Vendor` (
	`id` int(11) NOT NULL,
	`name` varchar(50) NOT NULL UNIQUE,
	PRIMARY KEY (`id`)
);





