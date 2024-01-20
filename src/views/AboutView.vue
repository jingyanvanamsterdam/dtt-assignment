<template>
  <div class="about-box">
    <h1>About DTT Real Estate</h1>
    <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, accusantium voluptate enim aspernatur rem fuga odio
      quo magni architecto. Quam corrupti ut nesciunt, minus molestias voluptate facere natus possimus debitis libero
      error est pariatur commodi dolor eos deserunt perspiciatis aperiam eligendi reiciendis quasi voluptatem deleniti
      adipisci doloribus laborum. </p>
    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. </p>
    <br>
    <h1>Design and Development</h1>
    <div class="about-signature">
      <img src="../assets/images/img_logo_dtt@3x.png">
      <div class="about-signature-web">
        <h2>By DTT</h2>
        <a href="https://www.d-tt.nl"> www.d-tt.nl</a>
      </div>
    </div>
  </div>
</template>

<style>
.about-box p {
  font-family: 'Open sans', sans-serif;
  font-size: 18px;
  font-weight: 400;
  color: #4A4B4C;
}

.about-signature {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.about-signature h2 {
  margin: 0px;
}

.about-signature img {
  width: 200px;
  height: auto;
  margin-right: 1.5em;
}

@media screen and (max-width: 576px) {
  .about-box p {
    font-size: 12px;
  }

  .about-signature img {
    width: 100px;
  }
}
</style>
