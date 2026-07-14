// Based on a script by Kathie Decora : katydecorah.com/code/lunr-and-jekyll/

//Create the lunr index for the search

var index = elasticlunr(function () {
  this.addField('title')
  this.addField('author')
  this.addField('layout')
  this.addField('content')
  this.setRef('id')
});

//Add to this index the proper metadata from the Jekyll content



index.addDoc({
  title: "Articles",
  author: "Opal Palmer Adisa",
  layout: "page",
  content: "Serna-Martínez, Elisa. “The Affective Politics of Resistance in the Work of Opal Palmer Adisa.” Contemporary Women’s Writing, July 2017. https://doi.org/10.1093/cwwrit/vpx016.\n\n\n\n\n\n———. “The Affective Politics of Resistance in the Work of Opal Palmer Adisa.” Contemporary Women’s Writing, July 2017. https://doi.org/10.1093/cwwrit/vpx016.\n\n\n\n\n\nValovirta, Elina. “Blowing the Love-Breath: Healing Men in Caribbean Women’s Writing,” 2013. https://www.jstor.org/stable/24571952.\n\n\n\n\n\n———. “Blowing the Love-Breath: Healing Men in Caribbean Women’s Writing.” Feminist Review 104, no. 1 (July 2013): 100–118. https://doi.org/10.1057/fr.2013.3.\n\n\n\n\n\nValovirta, E. “Blowing the Love-Breath: Healing Men in Caribbean Women’s Writing.” FEMINIST REVIEW 104 (2013): 100.\n\n\n\n\n\nValovirta, Elina. “Blowing the Love-Breath: Healing Men in Caribbean Women’s Writing.” Feminist Review 104, no. 1 (July 2013): 100–118. https://doi.org/10.1057/fr.2013.3.\n\n\n\n\n\nLima, M. H. “‘Beyond Miranda’s Meanings’: Contemporary Critical Perspectives on Caribbean Women’s Literatures.” FEMINIST STUDIES -NEW YORK THEN COLLEGE PARK- 21 (1995): 115.\n\n\n\n\n\nLima, Maria Helena. “‘Beyond Miranda’s Meanings’: Contemporary Critical Perspectives on Caribbean Women’s Literatures,” 1995.\n\n\n\n\n\n“MaComère - Digital Library of the Caribbean.” Accessed June 28, 2025. https://www.dloc.com/AA00000079/00005/flipbook/117.\n\n\n\n\n\nFeng, Pin-chia. “Rituals of Rememory: Afro-Caribbean Religions in ‘Myal’ and ‘It Begins with Tears.’” MELUS 27: 149. Accessed August 22, 2025. https://www.jstor.org/stable/3250641.\n\n\n\n\n\n“Caribbean Literary Discourses on the Polyvalence of Masculinity \\Textbar WorldCat.org.” Accessed August 22, 2025. https://search.worldcat.org/title/9377189764.\n\n\n\n\n\n",
  id: 0
});
index.addDoc({
  title: "Books",
  author: "Opal Palmer Adisa",
  layout: "page",
  content: "Palmer Adisa, Opal. 100+ Voices for Miss Lou: Poetry, Tributes, Interviews, Essays. 1st ed. Jamaica ;: The University of the West Indies Press, 2021.\n\n\n\n\n\nValovirta, Elina. Sexual Feelings: Reading Anglophone Caribbean Women’s Writing through Affect. 1st ed. Cross/Cultures. Amsterdam, Netherlands: Rodopi, 2014.\n\n\n\n\n\nAdisa, Opal Palmer. Painting Away Regrets. Leeds: Peepal Tree, 2011.\n\n\n\n\n\nAdisa, Opal Palmer, and Donna Weir-Soley. Caribbean Erotic: Poetry, Prose &amp; Essays. Leeds, UK: Peepal Tree Press, 2010.\n\n\n\n\n\nAdisa, Opal Palmer. The Collected Works of Opal Palmer Adisa. [1st electronic ed.]. Black Short Fiction. Alexandria, VA: Alexander Street Press, 2005.\n\n\n\n\n\nReiss, Timothy J. Music, Writing, and Cultural Unity in the Caribbean. Trenton, N.J: Africa World, 2005.\n\n\n\n\n\nAdisa, Opal Palmer. Caribbean Passion. Black Women Writers. Leeds: Peepal Tree, 2004.\n\n\n\n\n\n———. Caribbean Passion. London: Peepal Tree, 2004.\n\n\n\n\n\nHarris Collection of American Poetry and Plays (Brown University) Collections and Anthologies, and E. Ethelbert Miller. Beyond the Frontier: African American Poetry for the 21st Century. Baltimore, MD: Black Classic Press, 2002.\n\n\n\n\n\nAdisa, Opal Palmer. Leaf-of-Life: Poems. Oakland, Ca: Jukebox Press, 2000.\n\n\n\n\n\nCliff, Michelle, David Dabydeen, Opal Palmer Adisa, Alfred Hornung, and Ernstpeter Ruhe. Postcolonialism &amp; Autobiography: Michelle Cliff, David Dabydeen, Opal Palmer Adisa. Text. Amsterdam, the Netherlands ;: Rodopi, 1998.\n\n\n\n\n\nAdisa, Opal Palmer. It Begins with Tears. Caribbean Writers Series. Oxford, [England] ;: Heinemann, 1997.\n\n\n\n\n\n———. Tamarind and Mango Women: Poetry. Toronto, Ont: Sister Vision, Black Women and Women of Colour Press, 1992.\n\n\n\n\n\n———. Traveling Women. Oakland, Calif: Jukebox Press, 1989.\n\n\n\n\n\nJacobs, Josh. Runaway. Student Poetry Poster ; No. 4. Oakland, Calif: California Poets in the Schools, 1985.\n\n\n\n\n\n\n",
  id: 1
});
index.addDoc({
  title: "Articles",
  author: "Dionne Brand",
  layout: "page",
  content: "Alagraa, Bedour. “Splinters and Fragments: Looking into a Map, Finding Wonder.” TOPIA: Canadian Journal of Cultural Studies 46, no. 1 (2023): 101–9. https://muse.jhu.edu/pub/50/article/895498.\n\n\n\n\n\nAnderson, William C. “Things I Knew Before I Knew.” TOPIA: Canadian Journal of Cultural Studies 46, no. 1 (2023): 251–54. https://muse.jhu.edu/pub/50/article/895517.\n\n\n\n\n\nBatraville, Nathalie. “‘Touch.’” TOPIA: Canadian Journal of Cultural Studies 46, no. 1 (2023): 153–63. https://muse.jhu.edu/pub/50/article/895504.\n\n\n\n\n\nBeckford, Sharon Morgan. “‘Finding My Way to Freedom’: Dionne Brand’s A Map to the Door of No Return: Notes to Belonging.” TOPIA: Canadian Journal of Cultural Studies 46, no. 1 (2023): 209–23. https://muse.jhu.edu/pub/50/article/895512.\n\n\n\n\n\nBrowne, Kevin Adonis. “From Moruga: A Reflection on A Map to the Door of No Return.” TOPIA: Canadian Journal of Cultural Studies 46, no. 1 (2023): 224–31. https://muse.jhu.edu/pub/50/article/895513.\n\n\n\n\n\nCrichlow, Warren. “Prodigious Presence: After the Door of No Return.” TOPIA: Canadian Journal of Cultural Studies 46, no. 1 (2023): 79–83. https://muse.jhu.edu/pub/50/article/895496.\n\n\n\n\n\nCummings, Ronald. “On Capture Land.” TOPIA: Canadian Journal of Cultural Studies 46, no. 1 (2023): 115–24. https://muse.jhu.edu/pub/50/article/895500.\n\n\n\n\n\nDean, Amber, and Kara Granzow. “Deadly Entanglements: Resource Extraction, Cowboy Culture and Sexualized Colonial Violence in Alberta.” TOPIA: Canadian Journal of Cultural Studies 46, no. 1 (2023): 302–28. https://muse.jhu.edu/pub/50/article/895521.\n\n\n\n\n\nDick, Hannah. “About Face: Hypocrites and Outliers in Canadian News Coverage of Masking and Anti-Masking During the Coronavirus Pandemic.” TOPIA: Canadian Journal of Cultural Studies 46, no. 1 (2023): 329–52. https://muse.jhu.edu/pub/50/article/895522.\n\n\n\n\n\nFletcher, Marcelle-Anne. “Blue Dreams, Black Sleep.” TOPIA: Canadian Journal of Cultural Studies 46, no. 1 (2023): 31–44. https://muse.jhu.edu/pub/50/article/895492.\n\n\n\n\n\nGray, Biko. “Futile Plans: Map, Wandering, and the Study of Religion.” TOPIA: Canadian Journal of Cultural Studies 46, no. 1 (2023): 66–78. https://muse.jhu.edu/pub/50/article/895495.\n\n\n\n\n\nGreenwood, Emily. “Sitting in Narrative: Second-Person Narration in Dionne Brand’s Map.” TOPIA: Canadian Journal of Cultural Studies 46, no. 1 (2023): 84–100. https://muse.jhu.edu/pub/50/article/895497.\n\n\n\n\n\nHuberman, Isabella. “Looking Back in Kewekapawetan: Return After the Flood. Research, Remembrance and Reclamation of a Hydro Story.” TOPIA: Canadian Journal of Cultural Studies 46, no. 1 (2023): 280–301. https://muse.jhu.edu/pub/50/article/895520.\n\n\n\n\n\nJackson, Zakiyyah Iman. “Black Light: On the Origin and Materiality of the Image.” TOPIA: Canadian Journal of Cultural Studies 46, no. 1 (2023): 134–48. https://muse.jhu.edu/pub/50/article/895502.\n\n\n\n\n\nJohnson, Amber Rose. “No Theories for the Liquidity of This Desire.” TOPIA: Canadian Journal of Cultural Studies 46, no. 1 (2023): 174–82. https://muse.jhu.edu/pub/50/article/895506.\n\n\n\n\n\nKazeem-Kamiński, Belinda. “Page 46, Line 2 from Below.” TOPIA: Canadian Journal of Cultural Studies 46, no. 1 (2023): 187–90. https://muse.jhu.edu/pub/50/article/895508.\n\n\n\n\n\nMedovarski, Andrea. “Ruttier for an Athlete: A Reflection on Dionne Brand’s A Map to the Door of No Return.” TOPIA: Canadian Journal of Cultural Studies 46, no. 1 (2023): 202–8. https://muse.jhu.edu/pub/50/article/895511.\n\n\n\n\n\nMorris, Jameelah Imani. “(A)Drift: A Method and Theory of Black Temporality in Map.” TOPIA: Canadian Journal of Cultural Studies 46, no. 1 (2023): 195–201. https://muse.jhu.edu/pub/50/article/895510.\n\n\n\n\n\nMyers, Joshua. “No-Spaces and Returns.” TOPIA: Canadian Journal of Cultural Studies 46, no. 1 (2023): 110–14. https://muse.jhu.edu/pub/50/article/895499.\n\n\n\n\n\nPalacios, Jon Jon Moore. “Black Myopia.” TOPIA: Canadian Journal of Cultural Studies 46, no. 1 (2023): 149–52. https://muse.jhu.edu/pub/50/article/895503.\n\n\n\n\n\nPalmer, Tyrone S. “Feeling-as-Capture.” TOPIA: Canadian Journal of Cultural Studies 46, no. 1 (2023): 45–55. https://muse.jhu.edu/pub/50/article/895493.\n\n\n\n\n\nReese, Ashanté M. “Sweetness in the Key of Black: Notes on Baking and Belonging.” TOPIA: Canadian Journal of Cultural Studies 46, no. 1 (2023): 183–86. https://muse.jhu.edu/pub/50/article/895507.\n\n\n\n\n\nReid, Tiana. “‘One Is Not in Control in Dreams’: Reading Dionne Brand’s Notes to Belonging.” TOPIA: Canadian Journal of Cultural Studies 46, no. 1 (2023): 14–30. https://muse.jhu.edu/pub/50/article/895491.\n\n\n\n\n\nSharpe, Christina. “Dionne Brand’s A Map to the Door of No Return at 20: A Gathering.” TOPIA: Canadian Journal of Cultural Studies 46, no. 1 (2023): 1–6. https://muse.jhu.edu/pub/50/article/895489.\n\n\n\n\n\nShimoda, Brandon. “The Bottom Drawer, or, The Beginning of Reading.” TOPIA: Canadian Journal of Cultural Studies 46, no. 1 (2023): 191–94. https://muse.jhu.edu/pub/50/article/895509.\n\n\n\n\n\nSimpson, Leanne Betasamosake. “Pinery Road and Concession 11.” TOPIA: Canadian Journal of Cultural Studies 46, no. 1 (2023): 232–37. https://muse.jhu.edu/pub/50/article/895514.\n\n\n\n\n\nTecle, Sam. “Map at 20: A Black Diasporic Grammar Book.” TOPIA: Canadian Journal of Cultural Studies 46, no. 1 (2023): 125–33. https://muse.jhu.edu/pub/50/article/895501.\n\n\n\n\n\nTian, Ian Liujia. “Divine Queer Sorrow, or Beyond Mythical Reparations.” TOPIA: Canadian Journal of Cultural Studies 46, no. 1 (2023): 260–79. https://muse.jhu.edu/pub/50/article/895519.\n\n\n\n\n\nTrotz, D. Alissa. “‘A Whole World Was in Her Face’: Honouring Places beyond Maps.” TOPIA: Canadian Journal of Cultural Studies 46, no. 1 (2023): 56–65. https://muse.jhu.edu/pub/50/article/895494.\n\n\n\n\n\nVergès, Françoise. “A State of Permanent War.” TOPIA: Canadian Journal of Cultural Studies 46, no. 1 (2023): 243–50. https://muse.jhu.edu/pub/50/article/895516.\n\n\n\n\n\nWalcott, Rinaldo. “Longing Across the Black Diaspora: Love, Being and the Door of No Return.” TOPIA: Canadian Journal of Cultural Studies 46, no. 1 (2023): 7–13. https://muse.jhu.edu/pub/50/article/895490.\n\n\n\n\n\nWilson, Mabel O. “Entropic Monuments.” TOPIA: Canadian Journal of Cultural Studies 46, no. 1 (2023): 238–42. https://muse.jhu.edu/pub/50/article/895515.\n\n\n\n\n\n",
  id: 2
});
index.addDoc({
  title: "Books",
  author: "Dionne Brand",
  layout: "page",
  content: "Brand, Dionne. A Map to the Door of No Return: Notes to Belonging. Toronto: Random House Canada, 2001.\n\n\n\n\n\n———. At the Full and Change of the Moon. 1st ed. Toronto: Alfred A. Knopf Canada, 1999.\n\n\n\n\n\n———. In Another Place, Not Here. New York, NY: Grove Press, 1997.\n\n\n\n\n\n———. Land to Light On. Toronto: McClelland &amp; Stewart, 1997.\n\n\n\n\n\n———. Bread out of Stone: Recollections, Sex, Recognitions, Race, Dreaming, Politics. 1st ed. Toronto: Coach House Press, 1994.\n\n\n\n\n\n———. No Language Is Neutral. Toronto: Coach House Press, 1990.\n\n\n\n\n\n\n",
  id: 3
});
index.addDoc({
  title: "Books",
  author: "Georgina Herrera",
  layout: "page",
  content: "Herrera, Georgina. Cuando Una Mujer No Duerme: Poesie Di Cuba Al Femminile. 3. ed. Roma: Datanews, 1997.\n\n\n\n\n\n———. Gustadas sensaciones. Ediciones Unión, Unión de Escritores y Artistas de Cuba, 1996.\n\nhttps://amp.14ymedio.com/cultura/Fallece-poeta-cubana-Georgina-Herrera_0_3222277747.html\n\n\n\n\n\n———. Gustadas Sensaciones. Ciudad de La Habana: Ediciones Unión, Unión de Escritores y Artistas de Cuba, 1996.\n\n\n\n\n\n———. Grande Es El Tiempo. Ciudad de La Habana: Unioń de Escritores y Artistas de Cuba, 1989.\n\n\n\n\n\nHerrera, Georgina, and Juanamaría. Cordones-Cook. Always Rebellious: Selected Poems = Cimarroneando : Poemas Escogidos. Chico, CA: Cubanabooks, n.d.\n\n\n\n\n\n",
  id: 4
});
index.addDoc({
  title: "Books",
  author: "Nancy Morejón",
  layout: "page",
  content: "Morejón, Nancy. Black Woman and Other Poems = Mujer Negra y Otros Poemas /. London : Mango, 2001.\n\n\n\n\n\n———. Elogio y Paisaje. Rueda Dentada. Ciudad de La Habana: Ediciones Unión, Unión de Escritores y Artistas de Cuba, 1996.\n\n\n\n\n\n———. Baladas Para Un Sueño. Colección Ciclos. Ciudad de La Habana: Unión de Escritores y Artistas de Cuba, 1989.\n\n\n\n\n\n",
  id: 5
});
index.addDoc({
  title: "Books",
  author: "M. NourbeSe Philip",
  layout: "page",
  content: "Philip, Marlene Nourbese. Coups and Calypsos: a Play. Toronto: Mercury Press, 2001.\n\n\n\n\n\n———. A Genealogy of Resistance: and Other Essays. 1st ed. Black Women Writers Series. Toronto: Mercury Press, 1997.\n\n\n\n\n\n———. Caribana: African Roots and Continuities : Race, Space and the Poetics of Moving. Toronto: Poui Publications, 1996.\n\n\n\n\n\n———. Showing Grit: Showboating North of the 44th Parallel. 2nd ed. Toronto, Ont., Canada: Poui Publications, 1993.\n\n\n\n\n\n———. Frontiers: Essays and Writings On Racism and Culture. Stratford: Mercury Press, 1992.\n\n\n\n\n\n———. Looking for Livingstone: an Odyssey of Silence. Black Women Writers Series. Stratford, Ont: Mercury Press, 1991.\n\n\n\n\n\n———. She Tries Her Tongue, Her Silence Softly Breaks. Black Women Writers Series. Charlottetown: Ragweed Press, 1989.\n\n\n\n\n\n———. She Tries Her Tongue, Her Silence Softly Breaks. Charlottetown: Ragweed Press, 1989.\n\n\n\n\n\n",
  id: 6
});
index.addDoc({
  title: "Books",
  author: "Soleida Ríos",
  layout: "page",
  content: "Ríos, Soleida. Libro Cero. Cemi. Narrativa. La Habana: Editorial Letras Cubanas, 1998.\n\n\n\n\n\n———. El Libro Roto: Poesía. La Rueda Dentada. Ciudad de La Habana: Ediciones Unión, 1994.\n\n\n\n\n\n",
  id: 7
});
index.addDoc({
  title: "Books",
  author: "Évelyne Trouillot",
  layout: "page",
  content: "Trouillot, Évelyne. Sans Parapluie De Retour: Poèmes. Port-au-Prince, Haïti: s.n., 2001.\n\n\n\n\n\n———. Etat De Droit Et Enfance En Haïti: Restituer l’Enfance. Collection Pour l’État De Droit En Haïti ; v. 7. Port-au-Prince, Haïti: HSI, Haïti Solidarité Internationale, 2001.\n\n\n\n\n\n———. Islande: Suivi De La Mer, Entre Lait Et Sang. Port-au-Prince: Editions de l’Ile, 1998.\n\n\n\n\n\nTrouillot, Evelyne. La chambre interdite (Nouvelles). Editions L’Harmattan, 1996.\n\n\n\n\n\n———. Chambre Interdite : Nouvelles. Paris: L’Harmattan, n.d.\n\n\n\n\n\n",
  id: 8
});
console.log( jQuery.type(index) );

// Builds reference data (maybe not necessary for us, to check)


var store = [{
  "title": "Articles",
  "author": "Opal Palmer Adisa",
  "layout": "page",
  "link": "/texts/adisa/articles/",
}
,{
  "title": "Books",
  "author": "Opal Palmer Adisa",
  "layout": "page",
  "link": "/texts/adisa/books/",
}
,{
  "title": "Articles",
  "author": "Dionne Brand",
  "layout": "page",
  "link": "/texts/brand/articles/",
}
,{
  "title": "Books",
  "author": "Dionne Brand",
  "layout": "page",
  "link": "/texts/brand/books/",
}
,{
  "title": "Books",
  "author": "Georgina Herrera",
  "layout": "page",
  "link": "/texts/herrera/books/",
}
,{
  "title": "Books",
  "author": "Nancy Morejón",
  "layout": "page",
  "link": "/texts/morejon/books/",
}
,{
  "title": "Books",
  "author": "M. NourbeSe Philip",
  "layout": "page",
  "link": "/texts/philip/books/",
}
,{
  "title": "Books",
  "author": "Soleida Ríos",
  "layout": "page",
  "link": "/texts/rios/books/",
}
,{
  "title": "Books",
  "author": "Évelyne Trouillot",
  "layout": "page",
  "link": "/texts/trouillot/books/",
}
]

//Query

var qd = {}; //Gets values from the URL
location.search.substr(1).split("&").forEach(function(item) {
    var s = item.split("="),
        k = s[0],
        v = s[1] && decodeURIComponent(s[1]);
    (k in qd) ? qd[k].push(v) : qd[k] = [v]
});

function doSearch() {
  var resultdiv = $('#results');
  var query = $('input#search').val();

  //The search is then launched on the index built with Lunr
  var result = index.search(query);
  resultdiv.empty();
  if (result.length == 0) {
    resultdiv.append('<p class="">No results found.</p>');
  } else if (result.length == 1) {
    resultdiv.append('<p class="">Found '+result.length+' result</p>');
  } else {
    resultdiv.append('<p class="">Found '+result.length+' results</p>');
  }
  //Loop through, match, and add results
  for (var item in result) {
    var ref = result[item].ref;
    var searchitem = '<div class="result"><p><a href="/unsettling-seas'+store[ref].link+'?q='+query+'">'+store[ref].title+'</a></p></div>';
    resultdiv.append(searchitem);
  }
}

$(document).ready(function() {
  if (qd.q) {
    $('input#search').val(qd.q[0]);
    doSearch();
  }
  $('input#search').on('keyup', doSearch);
});
