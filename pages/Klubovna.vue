<template>
  <v-container grid-list-xs class="main-center-limitwidth">  
    <h1 class="mb-0">Stavba nové klubovny</h1>
    <v-divider class="mb-5"></v-divider>
    <div v-for="(section, sectionIndex) in sections" :key="sectionIndex">
      <div class="subheading">
        {{section.title}}
      </div>
      <div v-for="(paragraph, paragraphIndex) in section.paragraphs" :key="paragraphIndex">
        <p v-html="paragraph"></p>
      </div>
      <client-only>
        <Gallery :imgs="section.images"></Gallery>
      </client-only>
      <v-divider class="mt-2 mb-7" v-if="sectionIndex+1!=sections.length"></v-divider>
    </div>
    
  </v-container>
</template>

<script>
// import Gallery from '~/components/Gallery'

export default {
  name: 'Klubovna',

  data() {
    return {
    sections: [
      {
        title: "Skauti v Třebíči mají kolem 300 dětí a 50 dospělých členů",
        paragraphs: [
          "Skauti v Třebíči působí od roku 1923, kdy byl založen první chlapecký oddíl pod vedením Antonína Hobzy přezdívaného Srdíčko. Podle něj bylo později pojmenováno celé středisko, které bylo oficiálně založeno v roce 1939 (tehdy se ještě nejmenovalo Srdíčko) a v té době mělo osm oddílů.",
          "Dnes už má středisko oddílů dvanáct. Dohromady má celé středisko kolem 350 členů. Nechybí v něm oddíly chlapecké i dívčí, smíšené, oddíl benjamínků (předškolních dětí), nebo oddíl oldskautů (dospělých členů).",
        ],
        images: [
          {src:"https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/43236090_442469869611737_7622921438290247680_o_5184ac6a69.jpg", thumbnail:'https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/medium_43236090_442469869611737_7622921438290247680_o_5184ac6a69.jpg',w: 2048, h: 1365, title:'Závod vlčat a světlušek'},
          {src:"https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/18359456_177757556082971_7221119800253454159_o_95c1818785.jpg", thumbnail:'https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/medium_18359456_177757556082971_7221119800253454159_o_95c1818785.jpg',w: 3140, h: 1335, title:'Setkání členů Srdíčka v roce 2017'},
          {src:"https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/DSC_0112_01_b85c9b40b2.jpg", thumbnail:'https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/medium_DSC_0112_01_b85c9b40b2.jpg',w: 4496, h: 3000, title:'Táborák na táboře skautů a světlušek 2020'},
          {src:"https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/DSC_0578_92635078f3.jpg", thumbnail:'https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/medium_DSC_0578_92635078f3.jpg',w: 4288, h: 2848, title:'Skautský tábor s tématem 47 róninů'},
          {src:"https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/DSC_0582_9907872ef6.jpg", thumbnail:'https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/medium_DSC_0582_9907872ef6.jpg',w: 4288, h: 2848, title:'Tábor skautů a skautek druhých oddílů'},
          {src:"https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/Scan3_d1865c31a7.jpg", thumbnail:'https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/medium_Scan3_d1865c31a7.jpg',w: 1296, h: 1302, title:'Historické oddíly z Třebíče'},
          {src:"https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/Scan19_ae8685a732.jpg", thumbnail:'https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/medium_Scan19_ae8685a732.jpg',w: 1551, h: 1027, title:'Skautský tábor dříve'},
          {src:"https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/u_javora_1958_b675279f1d.jpg", thumbnail:'https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/medium_u_javora_1958_b675279f1d.jpg',w: 6119, h: 3635, title:'Výprava na Velký javor'},       
        ],
        index: null,
      },
      {
        title: "Stará klubovna byla ve špatném stavu a neměla dostatečnou kapacitu",
        paragraphs: [
          "Klubovna na Ruské ulici byla Třebíčských skautů od roku 1990. Původně byla budována jako provizorní objekt pro potřeby zařízení staveniště hvězdárny. Ta se ale nedokončila a skauti dostali budovu těchto skladišť a kanceláří pro svou činnost. Charakterem to byla provizorní stavba, která měla stát na místě pár let. Místo toho sloužila 30 let, během kterých chátrala. S narůstajícími oddíly a rozmachem skautingu začala být tato budova pro naše potřeby nedostatečná. Velmi špatný byl i její stav, kdy dokonce byla označena jako staticky nevyhovující a naše činnost v ní musela skončit. Nosná konstrukce klubovny byla ze dřeva, které vlivem stáří bylo často prohnilé.",
        ],
        images: [
          {src:"https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/Puvodni_klubovna_a29f9b499f.jpg", thumbnail:'https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/medium_Puvodni_klubovna_a29f9b499f.jpg',w: 3240, h: 2160, title:'Původní klubovna'},
          {src:"https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/Klubovna_skautek_po_opusteni_69314e0b7f.jpg", thumbnail:'https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/medium_Klubovna_skautek_po_opusteni_69314e0b7f.jpg',w: 4160, h: 3120, title:'Klubovna skautek po opuštění'},
        ],
        index: null,
      },
      {
        title: "Od dlouholetého snu k jeho provedení",
        paragraphs: [
          "První návrhy a zpracování projektu nové klubovny začalo v roce 2014. Od té doby prošel návrh mnoha změnami, protože i potřeba jednotlivých oddílů se v průběhu těchto let měnila. Nakonec byla schválena konečná varianta, kterou vypracoval Radek Holík – Cvrček a s architektonickým zpracováním mu pomohl Přemysl Zhoř – Harry.",
        ],
        images: [
          {src:"https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/vizualizace_JIHOZAPA_Dni_pohled_ab8713745b.png", thumbnail:'https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/medium_vizualizace_JIHOZAPA_Dni_pohled_ab8713745b.png',w: 2953, h: 2261, title:'Vizualizace jihozápadní pohled'},
          {src:"https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/vizualizace_SEVEROZAPA_Dni_pohled_c6078522c4.png", thumbnail:'https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/medium_vizualizace_SEVEROZAPA_Dni_pohled_c6078522c4.png',w: 2953, h: 2261, title:'Vizualizace severozápadní pohled'},
          {src:"https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/vizualizace_jihovychodni_pohled_989c492a36.png", thumbnail:'https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/medium_vizualizace_jihovychodni_pohled_989c492a36.png',w: 2953, h: 2261, title:'Vizualizace jihovýchodní pohled'},
          {src:"https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/PODZEMNI_PODLAZI_71ff1fd829.jpg", thumbnail:'https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/medium_PODZEMNI_PODLAZI_71ff1fd829.jpg',w: 3508, h: 2480, title:'Podzemní podlaží'},
          {src:"https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/1_NADZEMNI_PODLAZI_860d9fd803.jpg", thumbnail:'https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/medium_1_NADZEMNI_PODLAZI_860d9fd803.jpg',w: 3508, h: 2480, title:'1. nadzemní podlaží'},
          {src:"https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/2_NADZEMNI_PODLAZI_09981b4304.jpg", thumbnail:'https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/medium_2_NADZEMNI_PODLAZI_09981b4304.jpg',w: 3508, h: 2480, title:'2. nadzemní podlaží'},
        ],
        index: null,
      },
      {
        title: "Část za námi a část před námi…",
        paragraphs: [
          "Od začátku roku 2020 intenzivně probíhá výstavba klubovny. Na začátku bylo třeba vyztužit původní základovou desku budovy a rozšířit půdorysný tvar objektu. Následovala celá hrubá stavba – vyzdívání nosných zdí obou pater, stropy z betonových panelů, plochá střecha, vnitřní příčky, kanalizace, rozvod vody a elektroinstalace. Do konce roku budou hotové vnitřní omítky a hrubé podlahy.",
          "V roce 2021 nás čeká ještě spousta práce. Mezi hlavní patří zateplení objektu a povrchová úprava fasády, vnitřní a vnější dveře, rozvod topení, dokončení podlah a elektroinstalací. Na brigádách se podílí mnoho rodičů a členů oddílů a za to jim patří velký dík!"
        ],
        images: [
          {src:"https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/20190709_102214_5ccba933c8.jpg", thumbnail:'https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/medium_20190709_102214_5ccba933c8.jpg',w: 2268, h: 4032, title:'Zbytky sutin po demolici původní klubovny - červenec 2019'},
          {src:"https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/20190911_164259_ae5fc3a529.jpg", thumbnail:'https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/medium_20190911_164259_ae5fc3a529.jpg',w: 4032, h: 3024, title:'Vyčištění stropu nad sklepem, připraveno ke stavbě - září 2019'},
          {src:"https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/20200424_090037_57e4a10564.jpg", thumbnail:'https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/medium_20200424_090037_57e4a10564.jpg',w: 4032, h: 3024, title:'Navezení cihel na staveniště - duben 2020'},
          {src:"https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/20200427_082226_7886fec1db.jpg", thumbnail:'https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/medium_20200427_082226_7886fec1db.jpg',w: 4032, h: 3024, title:'Odpad vzniklý demolicí klubovny - duben 2020'},
          {src:"https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/20200428_112823_5ebd42c8f7.jpg", thumbnail:'https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/medium_20200428_112823_5ebd42c8f7.jpg',w: 4032, h: 3024, title:'Vyzdívání prvního podlaží - duben 2020'},
          {src:"https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/20200428_1128231_feca825bf7.jpg", thumbnail:'https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/medium_20200428_1128231_feca825bf7.jpg',w: 4032, h: 3024, title:'Vyzdívání prvního podlaží  - duben 2020'},
          {src:"https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/20200507_122947_cf9141585f.jpg", thumbnail:'https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/medium_20200507_122947_cf9141585f.jpg',w: 4032, h: 3024, title:'Bednění věnců - květen 2020'},
          {src:"https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/20200507_123016_cd2356de3b.jpg", thumbnail:'https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/medium_20200507_123016_cd2356de3b.jpg',w: 4032, h: 3024, title:'Bednění věnců - květen 2020'},
          {src:"https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/20200507_1230161_37cc168345.jpg", thumbnail:'https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/medium_20200507_1230161_37cc168345.jpg',w: 2592, h: 1216, title:'Příprava výztuže pro věnce nad prvním patrem - květen 2020'},
          {src:"https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/20200513_075204_046ff94c7a.jpg", thumbnail:'https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/medium_20200513_075204_046ff94c7a.jpg',w: 3024, h: 4032, title:'Betonáž věnců prvního patra - květen 2020'},
          {src:"https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/20200518_131022_a08ae5a974.jpg", thumbnail:'https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/medium_20200518_131022_a08ae5a974.jpg',w: 4032, h: 3024, title:'Montáž panelových stropů - květen 2020'},
          {src:"https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/20200518_131958_a46075c6ba.jpg", thumbnail:'https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/medium_20200518_131958_a46075c6ba.jpg',w: 3024, h: 4032, title:'Montáž panelových stropů - květen 2020'},
          {src:"https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/20200518_135519_6017cd60b0.jpg", thumbnail:'https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/medium_20200518_135519_6017cd60b0.jpg',w: 4032, h: 3024, title:'Pohled na interiér po položení stropů - květen 2020'},
          {src:"https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/20200601_131319_b027f83a61.jpg", thumbnail:'https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/medium_20200601_131319_b027f83a61.jpg',w: 4032, h: 3024, title:'Vyzdívání druhého patra - červen 2020'},
          {src:"https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/20200819_143834_1_bebd3e1e41.jpg", thumbnail:'https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/medium_20200819_143834_1_bebd3e1e41.jpg',w: 4608, h: 3456, title:'Vyzděný celý objekt a položené stropy - srpen 2020'},
          {src:"https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/20200819_144057_f48072c6ed.jpg", thumbnail:'https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/medium_20200819_144057_f48072c6ed.jpg',w: 4608, h: 3456, title:'Realizace ploché střechy na celém objektu - srpen 2020'},
          // {src:"https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/130273400_733139894246153_7101959505760727454_n_1_4ca21d5d70.jpg", thumbnail:'https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/medium_130273400_733139894246153_7101959505760727454_n_1_4ca21d5d70.jpg',w: 2048, h: 1536, title:'Osazování oken - říjen 2020'},
          {src:"https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/129938947_413123993059795_4622378331242291024_n_18389bd209.jpg", thumbnail:'https://s3.eu-central-1.amazonaws.com/skauttrebic.cz/medium_129938947_413123993059795_4622378331242291024_n_18389bd209.jpg',w: 1536, h: 2048, title:'Hydroizolace stropů nad sklepem v prvním patře - prosinec 2020'},
          ],
        index: null,
      },
      {
        title: "Kolik to stojí a jak můžete přispět?",
        paragraphs: [
          "Nová klubovna není kvůli své velikosti malým peněžním soustem. Celá výstavba byla rozpočtována asi za 11 miliónů korun. Po vstřícném jednání s městem Třebíč jsme dostali od města dar tří miliónů korun. Dále máme značkou podporu i jiných dárců a partnerů. Finančně nás podpořili i mnozí rodičové při registracích prostřednictvím donátorských kategorií. I třebíčské farnosti se rozhodli podpořit náš projekt skrze kostelní sbírky.",
          "V současné chvíli dle našich odhadů chybí <b>1,5 milionu Kč</b>. Jsme velmi vděční za vaše dary a důvěru. Jestli máte zájem podpořit nás ještě více, můžete tak učinit na střediskový <b><a target='_blank' href='https://ib.fio.cz/ib/transparent?a=2101617105'> transparentní účet</a> - 2101617105/2010</b>.",
          "Chcete-li nám poskytnout finanční dar a máte zájem o sepsání darovací smlouvy, prosíme, kontaktujte nás na e-mailu <b>junak.srdicko@skaut.cz</b> nebo na tel. <b>775 674 017</b>.",
          "Děkujeme!"
        ],
        images: [],
        index: null,
      },

    ]
    }
  },

  computed: {
    currentPosition() {
      return this.percent - 5;
    }
  },

};
</script>

<style>

.subheading  {
  font-family: "skautbold" !important;
  font-size: 1.5rem !important;
  margin-bottom: 0.5rem;
}

.image {
  width: 100px;
  height: 100px;
  background-size: cover;
  cursor: pointer;
  margin: 5px;
  border-radius: 3px;
  border: 1px solid lightgray;
  object-fit: contain;
}

.labels {
  position: relative;
}

.zero {

}

.current  {
  position: absolute;
  
}

img {
  height: 130px;
  max-width: 95%;
}


</style>
