---
layout: page
title: "Dionne Brand"
# writer: brand
---
<hr>
<div class="image">
<img src="{{ site.baseurl }}/assets/Dionne-Brand_featured-image.jpg" alt="A picture of Dionne Brand." width="40%">
<span class="caption">Credit: <a href="http://bombmagazine.org/articles/2024/09/16/dionne-brand-by-saidiya-hartman/">Clea Christakos-Gee. Bomb Magazine</a></span>
</div>
<p>Dionne Brand CM FRSC (born 7 January 1953) is a Canadian poet, novelist, essayist and documentarian. </p>
<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam, similique veniam quae incidunt tempore nemo, iure necessitatibus perferendis officiis quod aliquam earum possimus dolorem, neque officia repellat doloremque iusto corrupti ad nostrum maxime recusandae nisi magni. Dolor aspernatur, eveniet dolorem fugit alias nihil voluptas, maxime vero minima excepturi quasi ex!</p>
<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque minus expedita perspiciatis quos. Pariatur delectus impedit labore facilis quidem minima eos recusandae veritatis suscipit amet! Nisi cupiditate, doloribus veniam beatae impedit asperiores fuga ducimus deleniti, facere accusamus optio natus iusto a debitis sunt eum ratione dolore est quasi soluta laudantium?</p>

<hr>
<h2>Works by Category</h2>
<ul class="texts">
{% for item in site.texts %}
    {% if item.path contains '_texts/brand/' %}
  <li class="text-title">
    <a href="{{ site.baseurl }}{{ item.url }}">
      {{ item.title }}
    </a>
  </li>
  {% endif %}
{% endfor %}
</ul>

<hr>