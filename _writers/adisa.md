---
layout: page
title: "Opal Palmer Adisa"
# writer: adisa

---
<hr>
<div class="image">
<img src="{{ site.baseurl }}/assets/Prof-Opal-Adisa.jpeg" alt="A picture of Professor Opal Adisa." width="40%">
<span class="caption">Credit: <a href="https://our.today/domestic-violence-causing-a-strain-on-the-healthcare-system-say-health-officials/">Our Today</a></span>
</div>
<p>Opal Palmer Adisa (born 6 November 1954) is a Jamaican and American poet, novelist, performance artist and educator...</p>
<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam, similique veniam quae incidunt tempore nemo, iure necessitatibus perferendis officiis quod aliquam earum possimus dolorem, neque officia repellat doloremque iusto corrupti ad nostrum maxime recusandae nisi magni. Dolor aspernatur, eveniet dolorem fugit alias nihil voluptas, maxime vero minima excepturi quasi ex!</p>
<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque minus expedita perspiciatis quos. Pariatur delectus impedit labore facilis quidem minima eos recusandae veritatis suscipit amet! Nisi cupiditate, doloribus veniam beatae impedit asperiores fuga ducimus deleniti, facere accusamus optio natus iusto a debitis sunt eum ratione dolore est quasi soluta laudantium?</p>


<hr>
<h2>Works by Category</h2>
<ul class="texts">
{% for item in site.texts %}
  {% if item.path contains '_texts/adisa/' %}
  <li class="text-title">
    <a href="{{ site.baseurl }}{{ item.url }}">
      {{ item.title }}
    </a>
  </li>
  {% endif %}
{% endfor %}
</ul>

<hr>