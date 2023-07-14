let todos = [
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

const $input = document.querySelector('.write-todolist')
const $button = document.querySelector('.btn-send')

$button.addEventListener('click', add)
$input.addEventListener('keyup', add)

function render() {
  const $todoList = document.querySelector('.list-todos')
  $todoList.innerHTML = ''
  todos.forEach((v,i,a) => {
    const $todo = document.createElement('li')
    $todo.classList.add('item-todo-'+v.id)

    // 체크박스
    const $checkboxIcon = document.createElement('label')
    const $checkbox = document.createElement('input')
    $checkbox.type = 'checkbox'
    $checkboxIcon.htmlFor = 'checkboxIcon'
    $checkboxIcon.innerHTML = '<i class="fa-solid fa-check"></i>'
    $checkbox.classList.add('checkbox')
    $checkbox.checked = v.done

    $checkboxIcon.appendChild($checkbox)

    // 컨텐트
    const $p = document.createElement('p')
    const $content = document.createTextNode(v.content)
    if(v.done) $p.classList.add('line')
    $p.appendChild($content)

    // input
    const $input = document.createElement('input')
    $input.classList.add('input-edit-'+v.id)
    $input.value = v.content

    // 버튼
    const $buttons = document.createElement('div')
    const $btnEdit = document.createElement('button')
    const $btnDelete = document.createElement('button')
    $btnEdit.innerHTML = '<i class="fa-solid fa-pen"></i>'
    $btnDelete.innerHTML = '<i class="fa-regular fa-trash-can"></i>'
    $btnEdit.classList.add('btn-edit', v.id)
    $btnDelete.classList.add('btn-delete', v.id)
    $btnDelete.addEventListener('click', erase) // true 넣으면 캡쳐링 단계에서 동작 / 아무것도 안 넣으면 버블링
    $btnEdit.addEventListener('click', edit)

    $buttons.appendChild($btnEdit)
    $buttons.appendChild($btnDelete)

    // 투두 생성
    $todo.appendChild($checkbox)
    $todo.appendChild($input)
    $todo.appendChild($p)
    $todo.appendChild($buttons)
    $todoList.appendChild($todo)
  })
}

function add(e) {
  if(e.keyCode && e.keyCode !== 13) return
  if(!$input.value.trim().length) return
  // press enter or click add button
  const id = todos[todos.length-1].id + 1
  const content = $input.value.trim() // trim은 문자열 앞뒤에 있는 빈칸 뺌 ' 1234 ' => '1234'
  const done = false
  todos.push({id, content, done})
  render()
}

function erase(e) { // i를 타겟으로 실행함 그리고 상위 요소들도 실행함
  const eraseId = +e.currentTarget.classList[1]
  todos = todos.filter(v => v.id !== eraseId)
  render()
}


function edit(e){
  const editId = +e.currentTarget.classList[1]
  const $li = document.querySelector('.item-todo-'+editId)
  $li.classList.toggle('edit')

  if($li.classList[1]) return

  const $input = document.querySelector('.input-edit-'+editId)
  if(!$input.value.trim()) {
    e.currentTarget.disabled = true;
    return
  }


  todos = todos.map(v => {
    return v.id === editId ? {...v, content: $input.value.trim()} : v
  })
  render()
}

  // 에딧 버튼 활성화 안 하게... 벨류값 없으면 경고표시? 빨간 테두리라던가 경고문이라던가 2순위
  // 체크박스 구현 에딧이랑 같이 3순위
  // 할일 부분 이쁘게 css 만들기 1순위

render()