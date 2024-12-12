import React from "react";
import './Footer.css';
import vk from '../assets/Vk.svg';
import youTube from '../assets/Youtube.svg';

const Footer = () => {
    return (
        <footer class="footer">
            <div class="footer__content">

                <div class="footer__section">
                    <h3 class="footer__title">О компании</h3>
                    <p class="footer__text">
                    DNS – один из лидеров рынка по продаже цифровой и бытовой техники в России
                    </p>
                    <p class="footer__text">
                    Наша цель изменить жизнь людей, сделав простым доступ к огромному количеству качественных и недорогих товаров, предоставляя лучший сервис.
                    </p>
                </div>


                <div class="footer__section">
                    <h3 class="footer__title">Полезные ссылки</h3>
                    <ul class="footer__list">
                        <li><a href="https://www.dns-shop.ru/help/delivery/" class="footer__link">Доставка</a></li>
                        <li><a href="https://www.dns-shop.ru/help/useful-information/8145d90b-1c3a-44c4-84b9-bb3f54aa783a/" class="footer__link">Как оформить заказ</a></li>
                        <li><a href="https://www.dns-shop.ru/help/useful-information/f112d810-a586-4c60-b651-8d328fe0e0e7/" class="footer__link">Способы оплаты</a></li>
                        <li><a href="https://www.dns-shop.ru/service-center/exchange-and-returns/" class="footer__link">Обмен,возврат,гарантия</a></li>
                        <li><a href="https://www.dns-shop.ru/order/check-order-status/" class="footer__link">Статус заказа</a></li>
                        <li><a href="https://www.dns-shop.ru/service-center/" class="footer__link">Сервисные центры</a></li>
                    </ul>
                </div>


                <div class="footer__section">
                    <h3 class="footer__title">Контакты</h3>
                    <p class="footer__text">
                    <a href="https://www.dns-shop.ru/shops/vladivostok/" class="footer__link">Адреса магазинов г.Владивосток</a>
                    </p>
                    <p class="footer__text">
                        Телефон: <a href="tel:+71234567890" class="footer__link">+7 (123) 456-78-90</a>
                    </p>
                    <p class="footer__text">
                        Email: <a href="mailto:info@dns-shop.ru" class="footer__link">info@dns-shop.ru</a>
                    </p>
                </div>


                <div class="footer__section">
                    <h3 class="footer__title">Мы в соцсетях</h3>
                    <div class="footer__social">
                        <a href="https://vk.com/dnsstore" class="footer__social-link">
                            <img src={vk} alt="VK" class="footer__social-icon" />
                        </a>
                        <a href="https://www.youtube.com/c/DNSTV" class="footer__social-link">
                            <img src={youTube} alt="YouTube" class="footer__social-icon" />
                        </a>
                    </div>
                </div>
            </div>


            <div class="footer__bottom">
                <p class="footer__text">© 2024 DNS. Все права защищены.</p>
            </div>
        </footer>
    );
};

export default Footer;