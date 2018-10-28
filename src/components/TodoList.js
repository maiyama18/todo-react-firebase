import React, { Component } from 'react'
import { connect } from 'react-redux'
import { registerTodosListenerThunk, toggleTodoThunk } from '../store/data'
import { bindActionCreators } from 'redux'

class TodoList extends Component {
  componentDidMount() {
    this.props.registerTodosListenerThunk()
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
    registerTodosListenerThunk,
    toggleTodoThunk,
  }, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList) 