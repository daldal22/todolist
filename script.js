const todos = [
    {id: 0, content: '할일', done: false},
    {id: 1, content: '할일', done: true},
    {id: 2, content: '할일', done: false}
  ]
  //    <li class="item-todo check-done">
  //       <input type="checkbox" class="checkbox">
  //         <p class="content">js 복습하기</p>
  //         <div class="btn-todos">
  //           <button class="btn-edit"><i class="fa-solid fa-pen"></i></button>
  //           <button class="btn-delete"><i class="fa-regular fa-trash-can"></i></button>
  //         </div>
  //     </li>
  
  function render() {
    const $todoList = document.querySelector('.list-todos')
    todos.forEach((v,i,a) => {
      const $todo = document.createElement('li')
      $todo.classList.add('item-todo')

      // 컨테이너

  
      // 체크박스
      const $checkbox = document.createElement('input')
      $checkbox.type = 'checkbox'
      $checkbox.classList.add('checkbox')
      // 컨텐트
      const $p = document.createElement('p')
      const $content = document.createTextNode(v.content)
      $p.appendChild($content)
      // 버튼
      const $buttons = document.createElement('div')
      const $btnEdit = document.createElement('button')
      const $btnDelete = document.createElement('button')
      $btnEdit.innerHTML = '<i class="fa-solid fa-pen"></i>'
      $btnDelete.innerHTML = '<i class="fa-regular fa-trash-can"></i>'
      $btnEdit.classList.add('btn-edit')
      $btnDelete.classList.add('btn-delete')
      $buttons.appendChild($btnEdit)
      $buttons.appendChild($btnDelete)
  
      // 투두 생성
      $todo.appendChild($checkbox)
      $todo.appendChild($p)
      $todo.appendChild($buttons)
      $todoList.appendChild($todo)
    })
  }
  
  render()