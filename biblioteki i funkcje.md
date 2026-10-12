**WYTŁUMACZENIE BIBLIOTEKI I FUNKCJI JAKIE MAM W PROJEKCIE**



***Biblioteki***



**Angular Material:** gotowe elementy wyglądu.

**Angular Router:** przechodzenie między stronami, lazy loading i przekierowania (np. na podsumowanie po płatności).

**Angular Forms:** formularz płatności z walidacją (reactive forms).

**Swiper:** karuzela „Zobacz też” na stronie produktu.

**SCSS:** stylowanie, kolory trzymane w zmiennych.



***Pliki***



**cart.service.ts:** trzyma koszyk. Dodaje, zwiększa i zmniejsza ilość, usuwa produkty i liczy sumę.

**product.service.ts:** lista produktów i szukanie produktu po numerze.

**order.service.ts:** udaje wysłanie zamówienia i czasem (10%) rzuca błąd.

**guards.ts:** blokuje wejście do kasy z pustym koszykiem i na podsumowanie bez zamówienia.

**app.routes.ts:** lista stron i adresów.

**app.html:** górny pasek z linkami i koszykiem, który rozwija się po najechaniu myszką.

**cart/:** jeden koszyk używany w trzech miejscach.

**product-list/ i product-item/:** lista produktów i pojedyncza karta produktu.

**pages/product-page/:** strona produktu ze zoomem, oceną i karuzelą.

**pages/checkout/:** formularz płatności z walidacją i polami BLIK albo karta.

**pages/summary/:** podsumowanie zamówienia po zakupie.

**styles.scss:** kolory i przyciski w całej aplikacji.



***Funkcje***



**cart.service.ts**

add(product): dodaje produkt do koszyka. Jeśli już tam jest, zwiększa tylko ilość (stąd „2x Klawiatura”).

increase(id): ilość +1.

decrease(id): ilość −1. Przy 0 sztuk produkt znika z koszyka.

remove(id): usuwa produkt z koszyka.

clear(): czyści cały koszyk.

count: liczba sztuk w koszyku.

total: suma do zapłaty.



**product.service.ts**

getById(id): znajduje produkt po numerze (do strony produktu).



**order.service.ts**

placeOrder(): udaje wysłanie zamówienia. Czeka sekundę, z 10% szansą rzuca błąd, a przy sukcesie zapisuje zamówienie.



**guards.ts**

cartNotEmptyGuard: nie wpuszcza do kasy z pustym koszykiem.

hasOrderGuard: nie wpuszcza na podsumowanie, jeśli nic nie zamówiono.



**product-page.ts**

product: produkt, który aktualnie oglądasz.

others: pozostałe produkty do karuzeli.

move(): sprawdza, gdzie jest kursor nad zdjęciem, żeby powiększyć dokładnie to miejsce (zoom).



**checkout.ts**

construktor: po zmianie formy płatności włącza sprawdzanie tylko właściwego pola (kod BLIK albo numer karty).

send(): sprawdza formularz i wysyła zamówienie. Przy sukcesie przechodzi na podsumowanie, a przy błędzie pokazuje toast.



**cart.ts**

editable: ustawienie, czy koszyk ma przyciski. Na stronie płatności jest wyłączone, więc pokazuje się sam podgląd.

