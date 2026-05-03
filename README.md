# Portfolio
Toto portfolio vzniklo jako projekt v rámci předmětu [ITW - Tvorba webových stránek](https://www.fit.vut.cz/study/course/ITW/.cs) na FIT VUT. Zdrojový kód se nachází na [GitHubu](https://github.com/DavidZizlavsky/Portfolio) a web je k dispozici veřejně na GitHub pages [zde](https://davidzizlavsky.github.io/Portfolio).

## Grafický návrh
### Barvy
Rozhodl jsem se použít především následující barvy. Líbí se mi tmavé stránky a chtěl jsem to zkombinovat se zelenou případně modrou barvou.

```
--bg-dark: #111620;
--bg-darker: #0d1017;
--bg-darkest: #080a0f;
--bg-nav: rgba(12, 13, 14, 0.8);
--surface: #161c2a;
--border: rgba(255, 255, 255, 0.07);
--accent: #00e5c0;
--accent2: #0090ff;
--text: #e8eaf0;
--muted: #6b7290;
```

### Fonty
Vybral jsem si tři hlavní fonty, které bych chtěl použít, myslím si totiž, že každý má trochu jiné využití, ale zároveň se k sobě hodí.

1. Syne
2. Cabinet Grotesk
3. DM Mono

### Obrázky a fotografie
Došel jsem k názoru, že fotografie se mi do mé představy vůbec nehodí. Jediné obrázky, které můžu přidat a budou vhodné, jsou dle mého názoru ukázky mých projektů. Všechny jsem uložil do složky "img".

### Sekce
Projekt zpracuji jako jednostránkovou prezentaci. Chtěl bych obsah rozdělit na následující sekce:

1. O mně
2. Software (dvě podsekce: Hry a Aplikace)
3. Hudba
4. Zkušenosti
5. Kontakt

Přidat více sekcí mi už připadá jako přepal.

### Text
Rozhodl jsem se obsah napsat v angličtině kvůli tomu, že bude mít větší dosah. Asi by ovšem dávalo smysl udělat druhou verzi s českým textem (nebo případně poté vyřešit překlad přes backend)

### Vzhled
Chci udělat vzhled velmi jednoduchý a čistý. Animace (přechody) chci mít poměrně rychlé, protože si myslím, že to vystihuje nejen mě, ale také dnešní dobu. Dále by měl být vzhled určitě responzivní a vypadat slušně na všech různých zařízeních.

## Externí závislosti
Jediné externí závislosti jsou Font Awesome (CDN) a Google Fonts (oficiální API). Jiné knihovny nebyly použity při vypracování tohoto projektu.

## Využití AI
LLM jsem použil především pro pomoc s výběrem fontu, konkrétních barevných odstínů, zpětnou vazbu (nejen k přístupnosti) a tvorbu či úpravy částí textového obsahu. Dále mi umělá inteligence pomohla s IntersectionObservery v JavaScriptu. Ostatní části kódu jsem ale psal sám.

## Poznámka k odevzdání projektu v ITW
Odevzdávám soubory bez obsahu složky audio. Tudíž audio přehrávač nebude fungovat v odevzdané verzi. Hudební stopy jsou k dispozici na GitHub repozitáři a nebo ve verzi hostované pomocí GitHub pages.