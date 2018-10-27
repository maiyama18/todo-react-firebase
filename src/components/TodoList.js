import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchTodosThunk, toggleTodoThunk } from '../store/data'
import { bindActionCreators } from '../../../../../../Library/Caches/typescript/3.1/node_modules/redux'

class TodoList extends Component {
  componentDidMount() {
    this.props.fetchTodosThunk()
  }

  render() {
    const { fetching, updatingIds, todos } = this.props
    const { toggleTodoThunk } = this.props

    const todoList = (
      <ul>
        {todos.map(todo => (
          <li 
            key={todo.id}
            style={{textDecoration: todo.completed ? 'line-through' : 'none'}}
          >
            <input 
              type="checkbox" 
              checked={todo.completed}
              disabled={updatingIds.indexOf(todo.id) >= 0}
              onChange={() => toggleTodoThunk(todo)}
            />
            {todo.title}
          </li>
        ))}
      </ul>
    )

    return (
      <div>
        {fetching 
          ? <p>Now Loading...</p>
          : todoList
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { fetching, updatingIds, todos } = state.data

  return {
    fetching,
    updatingIds,
    todos,
  }
}
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({
    fetchTodosThunk,
    toggleTodoThunk,
  }, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList) 