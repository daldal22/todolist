let todos = [
    {id: 0, content: 'js 복습하기', done: false}, // 펄스 체크안됌
    {id: 1, content: '개인 프로젝트', done: true},  // 트루 체크됌
    {id: 2, content: '알고리즘 문제 풀기', done: false}
  ]
  //    <li class="item-todo check-done">
  //       <input type="checkbox" class="checkbox">
  //         <p class="content">js 복습하기</p>
  //         <div class="btn-todos">
  //           <button class="btn-edit"><i class="fa-solid fa-pen"></i></button>
  //           <button class="btn-delete"><i class="fa-regular fa-trash-can"></i></button>
  //         </div>
  //     </li>
  
const $input = document.querySelector('.write-todolist')
const $button = document.querySelector('.btn-send')
const $btnDelete = document.querySelector('.btn-delete')
//const $btnEdit = document.querySelector('.btn-edit')

$button.addEventListener('click', add)
$input.addEventListener('keyup', add)
$btnDelete.addEventListener('click', erase)
//$btnEdit.addEventListener('click',edit)

  function render() {
    const $todoList = document.querySelector('.list-todos')
    $todoList.innerHTML = ''
    todos.forEach((v,i,a) => {
      const $todo = document.createElement('li')
      $todo.classList.add('item-todo')

      // 날짜
  
      // 체크박스
      const $checkbox = document.createElement('input')
      $checkbox.type = 'checkbox'
      $checkbox.classList.add('checkbox')
      $checkbox.checked = v.done
      
      // 컨텐트
      const $p = document.createElement('p')
      const $content = document.createTextNode(v.content)
      if(v.done) $p.classList.add('line')

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

  function add(e){
    if(e.keyCode && e.keyCode !== 13) return
    if(!$input.value.trim().length) return
    // press enter or click add button

    const id = todos[todos.length-1].id + 1
    const content = $input.value.trim() // trim은 문자열 앞뒤에 있는 빈칸 뺌 ' 1234 ' => '1234'
    const done = false
    todos.push({id, content, done})
    render()
  }

  function erase(e) {
    todos = todos.filter();
    render();
  }
  

  // function edit(){ // 인풋 따로 만들고 디자인 따로해야됌 css도 이벤트도 만들어줘야된다 체크박스 체크 될때 라인있고 체크해제하면 라인 삭제

  // }

  render()