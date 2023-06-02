const edits = document.querySelectorAll('.edit');

edits.forEach((botao) => {
  botao.addEventListener('click', function (e) {
    e.preventDefault();
    const li = this.parentElement.parentElement;
    const title = li.querySelector('.label');
    const id = li.querySelector('.inputid');

    const infos = {
      title: title.innerText,
      id: id.value,
    };

    console.log(infos);
    li.innerHTML = `
      <form class='edit-form' action="/toughts/edit" method="post">
      <input type="hidden" name="id" value="${infos['id']}">
      <div class="form-control">
        <input type="text" name="title" id="title" placeholder="O que você vai fazer?" value="${infos['title']}">
      </div>

      <div class="actions">
        <button class="btn enviEdit" type="submit">Concluir Edição</button>
      </div>
    </form>
    <form action="/toughts/delete" method="post">
    <input class="inputid" type="hidden" name="id" value="${infos['id']}">
    <button type="submit" class="btn">Excluir</button>
    </form>
      `;

    console.log(infos['id']);
  });
});
